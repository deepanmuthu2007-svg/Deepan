import { Event, Notification, User } from "../types";

// Fix: Added missing properties to mock event data to conform to the Event type, resolving a TypeScript error. 
// Also, exported a `useMockData` hook to provide mock data to the application, resolving an import error in App.tsx.
// The file has been completed with additional mock data for a more robust application state.

const now = new Date();
const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

const mockUser: User = {
    userId: 'user-123',
    name: 'Asha Rao',
    email: 'asha.rao@example.edu',
    interests: ['robotics', 'ai', 'coding', 'quantum computing'],
    skills: ['React', 'TypeScript', 'Node.js', 'Python'],
};

const mockEvents: Event[] = [
    {
        event_id: 'event-1',
        organizerId: 'user-123',
        title: 'Global AI Hackathon 2024',
        description: 'Join developers, designers, and innovators from around the world for a 48-hour virtual hackathon focused on creating AI-powered solutions for social good. Compete for cash prizes and mentorship opportunities.',
        tags: ['coding', 'ai', 'hackathon', 'technical'],
        start_time: addDays(now, 10).toISOString(),
        end_time: addDays(now, 12).toISOString(),
        registration_deadline: addDays(now, 8).toISOString(),
        timezone: 'America/New_York',
        location: {
            country: 'USA',
            state: 'New York',
            district: 'New York City'
        },
        participants_count: 1500,
        registration_url: '#',
        venue: 'Virtual',
        awards: ['$10,000 Grand Prize', '$5,000 for Best Social Impact', 'Mentorship from AI experts'],
        project_links: ['https://devpost.com/software/example-project-1', 'https://devpost.com/software/example-project-2'],
        participants: [
            { userId: 'user-456', name: 'Ben Carter', status: 'winner' },
            { userId: 'user-789', name: 'Chloe Davis', status: 'runner-up' },
            { userId: 'user-101', name: 'David Evans', status: 'third-place' },
            { userId: 'user-112', name: 'Fiona Green', status: 'attended' },
        ],
        source: [{ name: 'Devpost', url: 'https://devpost.com/' }]
    },
    {
        event_id: 'event-2',
        organizerId: 'org-abc',
        title: 'NovaFest Tech Conference',
        description: 'A three-day conference featuring talks from industry leaders on the future of technology, from blockchain to quantum computing. Network with peers and discover the next big thing.',
        tags: ['conference', 'technical', 'quantum computing', 'ai'],
        start_time: addDays(now, 25).toISOString(),
        end_time: addDays(now, 27).toISOString(),
        registration_deadline: addDays(now, 20).toISOString(),
        timezone: 'Europe/London',
        location: {
            country: 'UK',
            state: 'England',
            district: 'London'
        },
        participants_count: 5000,
        registration_url: '#',
        venue: 'ExCeL London',
        awards: null,
        project_links: null,
        participants: null,
        source: [{ name: 'Novafest', url: 'https://novafest.com/' }]
    },
    {
        event_id: 'event-3',
        organizerId: 'org-def',
        title: 'Creative Coding Workshop',
        description: 'A hands-on workshop for artists and developers interested in creative coding. Learn to build interactive art with p5.js and WebGL. No prior experience required.',
        tags: ['workshop', 'non-technical', 'coding', 'art'],
        start_time: addDays(now, 5).toISOString(),
        end_time: addDays(now, 5).toISOString(),
        registration_deadline: addDays(now, 3).toISOString(),
        timezone: 'Asia/Kolkata',
        location: {
            country: 'India',
            state: 'Karnataka',
            district: 'Bengaluru'
        },
        participants_count: 50,
        registration_url: '#',
        venue: 'Bangalore International Centre',
        awards: null,
        project_links: null,
        participants: [],
        source: [{ name: 'Unstop', url: 'https://unstop.com/' }]
    },
    {
        event_id: 'event-4',
        organizerId: 'user-123',
        title: 'Local Robotics Meetup',
        description: 'A monthly meetup for robotics enthusiasts in the Bay Area. This month, we will have a show-and-tell of personal projects and a guest talk on ROS 2.',
        tags: ['robotics', 'workshop', 'technical'],
        start_time: addDays(now, 15).toISOString(),
        end_time: addDays(now, 15).toISOString(),
        registration_deadline: null,
        timezone: 'America/Los_Angeles',
        location: {
            country: 'USA',
            state: 'California',
            district: 'San Francisco'
        },
        participants_count: 75,
        registration_url: '#',
        venue: 'Hacker Dojo',
        awards: null,
        project_links: null,
        participants: [],
        source: [{ name: 'Manual Entry', url: '#' }]
    },
];

const mockNotifications: Notification[] = [
    {
        id: 'notif-1',
        eventTitle: 'Global AI Hackathon 2024',
        message: 'Congratulations! Your team "AI for Oceans" won the Best Social Impact award.',
        timestamp: addDays(now, -1).toISOString(),
        read: false,
    },
    {
        id: 'notif-2',
        eventTitle: 'Creative Coding Workshop',
        message: 'Thank you for attending the workshop! We\'d love your feedback.',
        timestamp: addDays(now, -3).toISOString(),
        read: true,
    },
];

const mockConnectedAccounts = [
    { source: 'Devpost', connected: true, synced_at: addDays(now, -1).toISOString() },
    { source: 'Novafest', connected: false, synced_at: null },
    { source: 'Unstop', connected: true, synced_at: addDays(now, -5).toISOString() },
];

export const useMockData = () => {
    return {
        user: mockUser,
        events: mockEvents,
        connectedAccounts: mockConnectedAccounts,
        notifications: mockNotifications
    };
};
