// import { NextResponse } from 'next/server';
// import { connectToDatabase } from '@/lib/mongoose';
// import Team from '@/lib/models/teams.model';
// import Bowler from '@/lib/models/bowler.model';


// const CACHE_DURATION = 3600; // 1 hour in seconds

// interface StatsResult {
//   player: string;
//   bowler_ecoeconomy: number;
//   no_match_on_ground: number;
//   average_wickets: number;
//   current_bowler_ecoeconomy: number;
//   current_average_wickets: number;
//   latest_match_no: number;
// }

// let statsCache: {
//   data: StatsResult[] | null;
//   timestamp: number;
// } = {
//   data: null,
//   timestamp: 0,
// };

// interface PlayerStats {
//   total_runs: number;
//   non_extra_balls: number;
//   bowler_wicket:number
//   matches: Set<string>;
//   last7: Array<{ eco: number; date: Date ,bowler_wicket:number}>;
  
  
// }

// interface StatsMap {
//   [key: string]: PlayerStats;
// }

// async function getCachedStats(team1:string,team2:string, venue:string) {
//   const currentTime = Date.now();
//   if (statsCache.data && (currentTime - statsCache.timestamp) / 1000 < CACHE_DURATION) {
//     return statsCache.data;
//   }
//   await connectToDatabase()
//   // console.log(`Searching for team: ${team}, venue: ${venue}`);
  

//   const players = await Team.find({ "team": { $in: [team1, team2] } }).exec();
//   const playerNames = players.map(p => p["player_name"].trim());
  

//   const matches = await Bowler.find({ venue, bowler: { $in: playerNames } }).exec();
//   const all_matches=await Bowler.find({ bowler: { $in: playerNames } }).exec();

//   const stats: StatsMap = {};
//   for (const match of matches) {
//     const { bowler, total_runs,bowler_wicket, non_extra_balls } = match;
//     if (!stats[bowler]) {
//       stats[bowler] = { total_runs: 0,bowler_wicket:0, non_extra_balls: 0, matches: new Set(), last7: [] };
//     }

//     stats[bowler].total_runs += total_runs;
//     stats[bowler].non_extra_balls += non_extra_balls;
//     stats[bowler].bowler_wicket += bowler_wicket;
//     stats[bowler].matches.add(match.match_id);
    
//   }
//   for (const match of all_matches) {
//     const { bowler,total_runs, bowler_wicket, non_extra_balls, date } = match;
//     if (!stats[bowler]) {
//       stats[bowler] = { total_runs: 0,bowler_wicket:0, non_extra_balls: 0, matches: new Set(), last7: []};
//     }
//     stats[bowler].last7.push({eco: (total_runs / non_extra_balls) * 6,bowler_wicket, date, });//these are total runs of a player
    
//   }

//   const result = Object.entries(stats).map(([player, data]) => {
//     const last7 = data.last7.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 7);
    
//     const eco_on_ground = (data.total_runs / data.non_extra_balls) * 6;
//     const average_wick_on_ground = data.bowler_wicket / data.matches.size;
    
//     return {
//       player,
//       bowler_ecoeconomy: eco_on_ground,
//       average_wickets: average_wick_on_ground,
//       no_match_on_ground: data.matches.size,
//       current_bowler_ecoeconomy: last7.reduce((sum, g) => sum + g.eco, 0) / (last7.length) || 0,
//       current_average_wickets: last7.reduce((sum, g) => sum + g.bowler_wicket, 0) / last7.length || 0,
//       latest_match_no: last7.length || 0
//     };
//   });

//   statsCache = { data: result, timestamp: currentTime };
//   return result;
// }

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const team1 = searchParams.get('team1');
//     const team2 = searchParams.get('team2');
//     const venue = searchParams.get('venue');

//     if (!team1||!team2 || !venue) {
//       return NextResponse.json({ error: "Missing team or venue parameter" }, { status: 400 });
//     }

//     const stats = await getCachedStats(team1, team2, venue!);

//     return NextResponse.json({ stats }, {
//       headers: {
//         'Cache-Control': `public, max-age=${CACHE_DURATION}`,
//         'Vary': 'Accept-Encoding'
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching stats:', error);
//     return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Team from '@/lib/models/teams.model';
import Bowler from '@/lib/models/bowler.model';

const CACHE_DURATION = 3600; // 1 hour in seconds

interface StatsResult {
  player: string;
  bowler_ecoeconomy: number;
  no_match_on_ground: number;
  average_wickets: number;
  current_bowler_ecoeconomy: number;
  current_average_wickets: number;
  latest_match_no: number;
}

// Use a cache object that keys by the query parameters
const statsCache: {
  [key: string]: {
    data: StatsResult[];
    timestamp: number;
  }
} = {};

interface PlayerStats {
  total_runs: number;
  non_extra_balls: number;
  bowler_wicket: number;
  matches: Set<string>;
  last7: Array<{ eco: number; date: Date; bowler_wicket: number }>;
}

interface StatsMap {
  [key: string]: PlayerStats;
}

async function getCachedStats(team1: string, team2: string, venue: string) {
  // Create a cache key based on the parameters
  const cacheKey = `${team1}_${team2}_${venue}`;
  const currentTime = Date.now();
  
  // Check if we have valid cache for this specific query
  if (
    statsCache[cacheKey] && 
    (currentTime - statsCache[cacheKey].timestamp) / 1000 < CACHE_DURATION
  ) {
    return statsCache[cacheKey].data;
  }
  
  await connectToDatabase();
  
  // Get players from both teams
  const players = await Team.find({ "team": { $in: [team1, team2] } }).exec();
  const playerNames = players.map(p => p["player_name"].trim());
  
  // Get matches at the specific venue for these players
  const venueMatches = await Bowler.find({ 
    venue, 
    bowler: { $in: playerNames } 
  }).exec();
  
  // Initialize stats object
  const stats: StatsMap = {};
  
  // Process venue-specific matches
  for (const match of venueMatches) {
    const { bowler, total_runs, bowler_wicket, non_extra_balls } = match;
    if (!stats[bowler]) {
      stats[bowler] = { 
        total_runs: 0, 
        bowler_wicket: 0, 
        non_extra_balls: 0, 
        matches: new Set(), 
        last7: [] 
      };
    }

    stats[bowler].total_runs += total_runs;
    stats[bowler].non_extra_balls += non_extra_balls;
    stats[bowler].bowler_wicket += bowler_wicket;
    stats[bowler].matches.add(match.match_id);
  }
  
  // Get recent matches for these players (for current form calculation)
  const recentMatches = await Bowler.find({ 
    bowler: { $in: playerNames } 
  }).sort({ date: -1 }).exec();
  
  // Process recent matches for current form
  const playerRecentMatches: { [key: string]: { eco: number; bowler_wicket: number; date: Date }[] } = {};
  
  for (const match of recentMatches) {
    const { bowler, total_runs, bowler_wicket, non_extra_balls, date } = match;
    
    if (!playerRecentMatches[bowler]) {
      playerRecentMatches[bowler] = [];
    }
    
    // Only add to the recent matches if we haven't collected 7 yet
    if (playerRecentMatches[bowler].length < 7) {
      playerRecentMatches[bowler].push({
        eco: non_extra_balls > 0 ? (total_runs / non_extra_balls) * 6 : 0,
        bowler_wicket,
        date
      });
    }
  }
  
  // Create the result
  const result = Object.entries(stats).map(([player, data]) => {
    const last7 = playerRecentMatches[player] || [];
    
    const eco_on_ground = data.non_extra_balls > 0 ? (data.total_runs / data.non_extra_balls) * 6 : 0;
    const average_wick_on_ground = data.matches.size > 0 ? data.bowler_wicket / data.matches.size : 0;
    
    return {
      player,
      bowler_ecoeconomy: eco_on_ground,
      average_wickets: average_wick_on_ground,
      no_match_on_ground: data.matches.size,
      current_bowler_ecoeconomy: last7.length > 0 
        ? last7.reduce((sum, g) => sum + g.eco, 0) / last7.length 
        : 0,
      current_average_wickets: last7.length > 0 
        ? last7.reduce((sum, g) => sum + g.bowler_wicket, 0) / last7.length 
        : 0,
      latest_match_no: last7.length
    };
  });

  // Store in cache with this specific key
  statsCache[cacheKey] = { data: result, timestamp: currentTime };
  return result;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const team1 = searchParams.get('team1');
    const team2 = searchParams.get('team2');
    const venue = searchParams.get('venue');

    if (!team1 || !team2 || !venue) {
      return NextResponse.json({ error: "Missing team or venue parameter" }, { status: 400 });
    }

    const stats = await getCachedStats(team1, team2, venue);

    return NextResponse.json({ stats }, {
      headers: {
        'Cache-Control': `public, max-age=${CACHE_DURATION}`,
        'Vary': 'Accept-Encoding'
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
