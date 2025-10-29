import { GoogleGenAI, Type } from "@google/genai";
import { Event, OrganizerReport, Summary, User, Recommendation } from '../types';

// Fix: Per coding guidelines, do not provide a fallback API key.
// The API key must be provided via process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const summarySchema = {
    type: Type.OBJECT,
    properties: {
        summary_short: {
            type: Type.STRING,
            description: "A single, concise sentence summary of the event, no longer than 60 words."
        },
        highlights: {
            type: Type.ARRAY,
            description: "An array of 1 to 3 bullet points highlighting key aspects like total participants, winners, or notable projects.",
            items: { type: Type.STRING }
        },
        confidence: {
            type: Type.NUMBER,
            description: "A score from 0.0 to 1.0 indicating your confidence in the accuracy and completeness of the generated summary based on the provided data."
        }
    },
    required: ["summary_short", "highlights", "confidence"]
};

const organizerReportSchema = {
    type: Type.OBJECT,
    properties: {
        ...summarySchema.properties,
        attendance_rate: {
            type: Type.STRING,
            description: "The attendance rate calculated from the number of attended vs registered participants, expressed as a percentage string (e.g., '83%'). If not possible to calculate, state 'Not available'."
        },
        winner_summary: {
            type: Type.STRING,
            description: "A brief summary listing the winners or top performers. E.g., '1st: Ben Carter, 2nd: Chloe Davis'. If no winners, state 'No winners specified'."
        },
        notable_submissions: {
            type: Type.STRING,
            description: "A brief summary of 1-2 notable project submissions, based on the provided project links. If no links are provided, state 'No project submissions'."
        }
    },
    required: ["summary_short", "highlights", "confidence", "attendance_rate", "winner_summary", "notable_submissions"]
};

const recommendationSchema = {
    type: Type.OBJECT,
    properties: {
        recommendations: {
            type: Type.ARRAY,
            description: "An array of recommended event objects, ranked by relevance.",
            items: {
                type: Type.OBJECT,
                properties: {
                    event_id: {
                        type: Type.STRING,
                        description: "The unique identifier of the recommended event."
                    },
                    score: {
                        type: Type.NUMBER,
                        description: "A relevance score from 0.0 to 1.0."
                    },
                    why: {
                        type: Type.STRING,
                        description: "A single, concise sentence explaining why this event is recommended to the user based on their profile."
                    }
                },
                required: ["event_id", "score", "why"]
            }
        }
    },
    required: ["recommendations"]
};


export const generateEventSummary = async (event: Event, isOrganizer: boolean = false): Promise<Summary | OrganizerReport> => {
    const isOrganizerReport = isOrganizer && event.participants;
    
    const registeredCount = event.participants?.length ?? 0;
    const attendedCount = event.participants?.filter(p => p.status !== 'registered').length ?? 0;
    const winners = event.participants?.filter(p => ['winner', 'runner-up', 'third-place'].includes(p.status)) ?? [];

    const prompt = isOrganizerReport
    ? `
        You are an expert assistant that generates concise event reports for ORGANIZERS.
        Analyze the provided event data, participant list, and project links to create a report.
        Calculate the attendance rate (attended / registered).
        Summarize the winners.
        Briefly mention 1-2 notable project submissions if links are available.
        Provide a short summary and key highlights from the organizer's perspective.

        Event Data:
        - Title: ${event.title}
        - Description: ${event.description}
        - Total Registered: ${registeredCount}
        - Total Attended: ${attendedCount}
        - Declared Awards: ${event.awards ? event.awards.join(', ') : 'Not available'}
        - Winners List: ${winners.length > 0 ? winners.map(p => `${p.name} (${p.status})`).join(', ') : 'Not available'}
        - Project Submission Links: ${event.project_links && event.project_links.length > 0 ? event.project_links.join(', ') : 'Not available'}
        
        Return the output in JSON format that strictly adheres to the provided schema.
    `
    : `
        You are an expert assistant that generates concise event summaries for PARTICIPANTS.
        Summarize this event into one short sentence (<=60 words) and give 3 bullet highlights (participants, winners, notable project).
        If any fact is missing, write "Not available" for that specific piece of information.
        Do not invent winners, counts, or other facts. Base your summary strictly on the input provided.

        Event Data:
        - Title: ${event.title}
        - Description: ${event.description}
        - Participants count: ${event.participants_count ?? 'Not available'}
        - Awards: ${event.awards ? event.awards.join(', ') : 'Not available'}
        - Project links: ${event.project_links ? event.project_links.join(', ') : 'Not available'}
        - Source: ${event.source[0]?.name ?? 'Manual Entry'}

        Return the output in JSON format that strictly adheres to the provided schema.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: isOrganizerReport ? organizerReportSchema : summarySchema,
            },
        });

        const jsonText = response.text.trim();
        const summaryData = JSON.parse(jsonText);

        return summaryData;

    } catch (error) {
        console.error("Error generating summary with Gemini:", error);
        throw new Error("Failed to communicate with the AI model.");
    }
};

export const generateRecommendations = async (user: User, events: Event[]): Promise<Recommendation[]> => {
    // To avoid overly long prompts, we'll simplify the event data sent to the model
    const candidateEvents = events.map(({ event_id, title, description, tags }) => ({
        event_id,
        title,
        description: description.substring(0, 200) + '...', // Truncate description
        tags,
    }));

    const prompt = `
        You are an intelligent event recommendation engine.
        Your task is to analyze a user's profile and a list of candidate events to provide personalized recommendations.
        Rank the events based on relevance to the user's interests and skills.
        For each recommendation, provide a concise, single-sentence explanation (the "why") that directly connects a user's interest/skill to the event's content.

        User Profile:
        - Interests: ${user.interests.join(', ')}
        - Skills: ${user.skills.join(', ')}

        Candidate Events (JSON):
        ${JSON.stringify(candidateEvents, null, 2)}

        Task:
        Return a ranked list of the top 5 most relevant events for this user.
        The output must be a JSON object that strictly adheres to the provided schema. The root key must be "recommendations".
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: recommendationSchema,
            },
        });

        const jsonText = response.text.trim();
        const recommendationData = JSON.parse(jsonText);

        return recommendationData.recommendations || [];

    } catch (error) {
        console.error("Error generating recommendations with Gemini:", error);
        throw new Error("Failed to generate recommendations from the AI model.");
    }
};
