import {
    FaFutbol,
    FaBasketballBall,
    FaVolleyballBall,
    FaTableTennis,
    FaGamepad,
    FaQuestionCircle
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
    Default: FaQuestionCircle
};

export const MOCK_EVENTS: SpardhaEvent[] = [
    // DAY 1: MARCH 27, 2026
    {
        id: '1',
        title: "Men's Singles - Round of 16",
        sport: 'Badminton',
        date: '2026-03-27',
        startTime: '09:00',
        endTime: '10:30',
        venue: 'Badminton Court 2',
        teams: ['A. Sharma', 'R. Gupta'],
        description: 'Highly anticipated clash in the badminton men\'s singles category.',
        status: 'finished'
    },
    {
        id: '2',
        title: 'JKLU vs BITS - Qualifiers',
        sport: 'Cricket',
        date: '2026-03-27',
        startTime: '10:00',
        endTime: '13:00',
        venue: 'Main Cricket Ground',
        teams: ['JKLU Titans', 'BITS Falcons'],
        description: 'Opening qualifier match for the cricket tournament.',
        status: 'finished'
    },
    {
        id: '3',
        title: 'MNIT vs Manipal University',
        sport: 'Football',
        date: '2026-03-27',
        startTime: '11:00',
        endTime: '12:30',
        venue: 'Football Arena A',
        teams: ['MNIT Strikers', 'MU Warriors'],
        description: 'High-intensity football match between neighboring rivals.',
        status: 'live'
    },
    {
        id: '4',
        title: 'BGMI Invitational',
        sport: 'Esports',
        date: '2026-03-27',
        startTime: '10:00',
        endTime: '14:00',
        venue: 'Arena Hall 1',
        teams: ['Team Soul', 'Global Esports', 'GodLike', 'Entity'],
        description: 'Pro players battle it out in the BGMI invitational tournament.',
        status: 'live'
    },
    {
        id: '5',
        title: 'Mixed Doubles Finals',
        sport: 'Table Tennis',
        date: '2026-03-27',
        startTime: '12:00',
        endTime: '13:30',
        venue: 'Indoor Sports Complex',
        teams: ['Duo Dynamic', 'Power Pair'],
        description: 'Championship match for Table Tennis mixed doubles.',
        status: 'upcoming'
    },
    {
        id: '6',
        title: "Women's Basketball Semi-Finals",
        sport: 'Basketball',
        date: '2026-03-27',
        startTime: '14:30',
        endTime: '16:00',
        venue: 'OAT Court',
        teams: ['LPU Lions', 'VIT Vipers'],
        description: 'Semi-final 1 for the women\'s basketball championship.',
        status: 'upcoming'
    },
    {
        id: '7',
        title: 'Volleyball Men\'s League Match',
        sport: 'Volleyball',
        date: '2026-03-27',
        startTime: '15:00',
        endTime: '16:30',
        venue: 'Volleyball Court 1',
        teams: ['DU Dunkers', 'JNU Jumpers'],
        description: 'League stage match for the volleyball trophy.',
        status: 'upcoming'
    },
    {
        id: '8',
        title: 'FIFA 26 Championship Stage 1',
        sport: 'Esports',
        date: '2026-03-27',
        startTime: '16:00',
        endTime: '19:00',
        venue: 'Gaming Zone B',
        teams: ['Zaid', 'Aryan', 'Sam', 'Ishaan'],
        description: 'The road to the FIFA finals starts here.',
        status: 'upcoming'
    },

    // DAY 2: MARCH 28, 2026
    {
        id: '9',
        title: "Basketball Dunk Contest",
        sport: 'Basketball',
        date: '2026-03-28',
        startTime: '09:00',
        endTime: '11:00',
        venue: 'Main Indoor Arena',
        teams: ['Top 10 High Flyers'],
        description: 'Witness the most explosive dunks of Spardha.',
        status: 'upcoming'
    },
    {
        id: '10',
        title: 'Football Quarter-Final 1',
        sport: 'Football',
        date: '2026-03-28',
        startTime: '10:00',
        endTime: '11:45',
        venue: 'Football Arena A',
        teams: ['Winners A', 'Runners B'],
        description: 'Knockout stage begins for the football titans.',
        status: 'upcoming'
    },
    {
        id: '11',
        title: 'JKLU vs MUJ - Women\'s Finals',
        sport: 'Volleyball',
        date: '2026-03-28',
        startTime: '11:00',
        endTime: '12:30',
        venue: 'Volleyball Court 1',
        teams: ['JKLU Zenith', 'MUJ Mavericks'],
        description: 'The final showdown for the women\'s volleyball trophy.',
        status: 'upcoming'
    },
    {
        id: '12',
        title: 'Valorant Championship Finals',
        sport: 'Esports',
        date: '2026-03-28',
        startTime: '13:00',
        endTime: '17:00',
        venue: 'Arena Hall 1',
        teams: ['Velocity Gaming', 'Revenant Esports'],
        description: 'The final battle in the Valorant arena.',
        status: 'upcoming'
    },
    {
        id: '13',
        title: 'Badminton Doubles Semi-Finals',
        sport: 'Badminton',
        date: '2026-03-28',
        startTime: '14:00',
        endTime: '16:00',
        venue: 'Badminton Court 1',
        teams: ['Duo X', 'Duo Y', 'Duo Z', 'Duo W'],
        description: 'Semi-final matches for badminton doubles categories.',
        status: 'upcoming'
    },
    {
        id: '14',
        title: 'Cricket Semi-Finals 1',
        sport: 'Cricket',
        date: '2026-03-28',
        startTime: '10:00',
        endTime: '13:30',
        venue: 'Main Cricket Ground',
        teams: ['TBD', 'TBD'],
        description: 'Semi-final clash in the 20-over format.',
        status: 'upcoming'
    },
    {
        id: '15',
        title: 'Table Tennis Men\'s Singles Finals',
        sport: 'Table Tennis',
        date: '2026-03-28',
        startTime: '16:00',
        endTime: '17:30',
        venue: 'Indoor Sports Complex',
        teams: ['TBD', 'TBD'],
        description: 'Final match to crown the TT champion.',
        status: 'upcoming'
    },

    // DAY 3: MARCH 29, 2026
    {
        id: '16',
        title: "Badminton Grand Finals",
        sport: 'Badminton',
        date: '2026-03-29',
        startTime: '09:00',
        endTime: '12:00',
        venue: 'Main Indoor Arena',
        teams: ['Finalists'],
        description: 'Grand finale for all badminton categories.',
        status: 'upcoming'
    },
    {
        id: '17',
        title: 'Cricket Championship Final',
        sport: 'Cricket',
        date: '2026-03-29',
        startTime: '10:00',
        endTime: '14:00',
        venue: 'Main Cricket Ground',
        teams: ['TBD', 'TBD'],
        description: 'The mega final for the Spardha Cricket Trophy.',
        status: 'upcoming'
    },
    {
        id: '18',
        title: 'Football Grand Final',
        sport: 'Football',
        date: '2026-03-29',
        startTime: '15:00',
        endTime: '17:30',
        venue: 'Football Arena A',
        teams: ['TBD', 'TBD'],
        description: 'Closing match of the football tournament.',
        status: 'upcoming'
    },
    {
        id: '19',
        title: 'Volleyball Men\'s Finals',
        sport: 'Volleyball',
        date: '2026-03-29',
        startTime: '13:00',
        endTime: '14:30',
        venue: 'Volleyball Court 1',
        teams: ['TBD', 'TBD'],
        description: 'Championship match for the volleyball cup.',
        status: 'upcoming'
    },
    {
        id: '20',
        title: 'Basketball All-Star Game',
        sport: 'Basketball',
        date: '2026-03-29',
        startTime: '16:00',
        endTime: '18:00',
        venue: 'OAT Court',
        teams: ['North Stars', 'South Suns'],
        description: 'Exhibition match featuring the best players of the fest.',
        status: 'upcoming'
    },
    {
        id: '21',
        title: 'Counter-Strike 2 Finals',
        sport: 'Esports',
        date: '2026-03-29',
        startTime: '14:00',
        endTime: '18:00',
        venue: 'Arena Hall 1',
        teams: ['Team Alpha', 'Omega Squad'],
        description: 'Closing event of the Esports segment.',
        status: 'upcoming'
    },
    {
        id: '22',
        title: 'Spardha Closing Ceremony',
        sport: 'All',
        date: '2026-03-29',
        startTime: '19:00',
        endTime: '21:00',
        venue: 'Main Stadium',
        teams: ['All Participants'],
        description: 'Final prize distribution and celebration.',
        status: 'upcoming'
    }
];
