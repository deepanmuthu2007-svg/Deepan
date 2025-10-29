export enum View {
  DISCOVER = 'discover',
  MY_EVENTS = 'my_events',
  ACCOUNT_SYNC = 'account_sync',
  NOTIFICATIONS = 'notifications',
}

export interface Location {
  country: string;
  state: string;
  district: string;
}

export interface Participant {
  userId: string;
  name: string;
  status: 'registered' | 'attended' | 'winner' | 'runner-up' | 'third-place';
}

export interface Source {
  name: string;
  url: string;
}

export interface User {
  userId: string;
  name: string;
  email: string;
  interests: string[];
  skills: string[];
}

export interface Event {
  event_id: string;
  organizerId: string; // 'user' for self-hosted, or some other ID
  title: string;
  description: string;
  tags: string[];
  start_time: string; // ISO string
  end_time: string;   // ISO string
  registration_deadline?: string | null; // ISO string
  timezone: string;
  location: Location;
  participants_count: number | null;
  registration_url: string;
  venue: string;
  awards: string[] | null;
  project_links: string[] | null;
  participants: Participant[] | null;
  source: Source[];
}

export interface Summary {
  summary_short: string;
  highlights: string[];
  confidence: number;
}

export interface OrganizerReport extends Summary {
  attendance_rate: string;
  winner_summary: string;
  notable_submissions: string;
}

export interface Notification {
  id: string;
  eventTitle: string;
  message: string;
  timestamp: string; // ISO string
  read: boolean;
}

export type ReminderSetting = '1h' | '1d' | null;

export interface Recommendation {
  event_id: string;
  score: number;
  why: string;
}