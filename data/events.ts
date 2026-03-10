import {
    FaFutbol,
    FaBasketballBall,
    FaVolleyballBall,
    FaTableTennis,
    FaGamepad,
    FaQuestionCircle,
    FaStar
} from 'react-icons/fa';
import { MdSportsCricket } from 'react-icons/md';
import { GiShuttlecock } from 'react-icons/gi';

export type SportType = 'All' | 'Cricket' | 'Football' | 'Basketball' | 'Volleyball' | 'Badminton' | 'Table Tennis' | 'Esports';

export interface SpardhaEvent {
    id: string;
    title: string;
    sport: SportType;
    date: string; // ISO format
    startTime: string; // HH:mm
    endTime: string; // HH:mm
    venue: string;
    teams: string[];
    description: string;
    status: 'upcoming' | 'live' | 'finished';
}

export const SPORT_COLORS: Record<string, string> = {
    Cricket: '#22c55e', // green-500
    Football: '#3b82f6', // blue-500
    Basketball: '#f97316', // orange-500
    Volleyball: '#a855f7', // purple-500
    Badminton: '#eab308', // yellow-500
    'Table Tennis': '#ef4444', // red-500
    Esports: '#06b6d4', // cyan-500
    All: '#f97316', // Highlight orange for brochure events
    Default: '#64748b' // slate-500
};

export const SPORT_ICONS: Record<string, any> = {
    Cricket: MdSportsCricket,
    Football: FaFutbol,
    Basketball: FaBasketballBall,
    Volleyball: FaVolleyballBall,
    Badminton: GiShuttlecock,
    'Table Tennis': FaTableTennis,
    Esports: FaGamepad,
    All: FaStar,
    Default: FaQuestionCircle
};

export const MOCK_EVENTS: SpardhaEvent[] = [
    // DAY 1: MARCH 27, 2026
    {
        id: 'opening-ceremony',
        title: "Opening Ceremony",
        sport: 'All',
        date: '2026-03-27',
        startTime: '09:30',
        endTime: '10:30',
        venue: 'Main Stadium',
        teams: [],
        description: 'The official inauguration ceremony of Spardha 2026.',
        status: 'finished'
    },
    {
        id: 'matches-start-d1',
        title: "Matches",
        sport: 'All',
        date: '2026-03-27',
        startTime: '10:45',
        endTime: '20:00',
        venue: 'Multiple Venues',
        teams: [],
        description: 'Initial rounds and matches for all sports.',
        status: 'finished'
    },
    {
        id: 'campus-life-d1',
        title: "Campus Life Events",
        sport: 'All',
        date: '2026-03-27',
        startTime: '20:30',
        endTime: '22:30',
        venue: 'OAT',
        teams: [],
        description: 'Evening cultural events and activities.',
        status: 'finished'
    },

    // DAY 2: MARCH 28, 2026
    {
        id: 'matches-begin-d2',
        title: "Matches Begins",
        sport: 'All',
        date: '2026-03-28',
        startTime: '09:30',
        endTime: '20:00',
        venue: 'Multiple Venues',
        teams: [],
        description: 'Continuation of league matches and qualifiers.',
        status: 'upcoming'
    },
    {
        id: 'campus-life-d2',
        title: "Campus Life Events",
        sport: 'All',
        date: '2026-03-28',
        startTime: '20:30',
        endTime: '22:30',
        venue: 'OAT',
        teams: [],
        description: 'Evening cultural events and activities.',
        status: 'upcoming'
    },

    // DAY 3: MARCH 29, 2026
    {
        id: 'final-matches-d3',
        title: "Final Matches",
        sport: 'All',
        date: '2026-03-29',
        startTime: '09:30',
        endTime: '16:00',
        venue: 'Main Arenas',
        teams: [],
        description: 'Championship finals for all major sport categories.',
        status: 'upcoming'
    },
    {
        id: 'closing-ceremony-d3',
        title: "Closing Ceremony",
        sport: 'All',
        date: '2026-03-29',
        startTime: '18:00',
        endTime: '21:00',
        venue: 'Main Stadium',
        teams: [],
        description: 'Prize distribution and closing celebration.',
        status: 'upcoming'
    }
];
