
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Team from '@/lib/models/teams.model';
import Batsman from '@/lib/models/batsman.model';

const CACHE_DURATION = 3600; // 1 hour in seconds

interface StatsResult {
  player: string;
  strike_rate: number;
  no_match_on_ground: number;
  average: number;
  current_strike_rate: number;
  current_average: number;
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
  total_balls: number;
  matches: Set<string>;
  last7: Array<{ sr: number; date: Date; batsman_runs: number }>;
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
  const venueMatches = await Batsman.find({ 
    venue, 
    batsman_name: { $in: playerNames } 
  }).exec();
  
  // Initialize stats object
  const stats: StatsMap = {};
  
  // Process venue-specific matches
  for (const match of venueMatches) {
    const { batsman_name, batsman_runs, total_balls } = match;
    if (!stats[batsman_name]) {
      stats[batsman_name] = { 
        total_runs: 0, 
        total_balls: 0, 
        matches: new Set(), 
        last7: [] 
      };
    }

    stats[batsman_name].total_runs += batsman_runs;
    stats[batsman_name].total_balls += total_balls;
    stats[batsman_name].matches.add(match.match_id);
  }
  
  // Get recent matches for these players (for current form calculation)
  const recentMatches = await Batsman.find({ 
    batsman_name: { $in: playerNames } 
  }).sort({ date: -1 }).exec();
  
  // Process recent matches for current form
  const playerRecentMatches: { [key: string]: { sr: number; batsman_runs: number; date: Date }[] } = {};
  
  for (const match of recentMatches) {
    const { batsman_name, batsman_runs, total_balls, date } = match;
    
    if (!playerRecentMatches[batsman_name]) {
      playerRecentMatches[batsman_name] = [];
    }
    
    // Only add to the recent matches if we haven't collected 7 yet
    if (playerRecentMatches[batsman_name].length < 7) {
      playerRecentMatches[batsman_name].push({
        sr: total_balls > 0 ? (batsman_runs / total_balls) * 100 : 0,
        batsman_runs,
        date
      });
    }
  }
  
  // Create the result
  const result = Object.entries(stats).map(([player, data]) => {
    const last7 = playerRecentMatches[player] || [];
    
    return {
      player,
      strike_rate: data.total_balls > 0 ? (data.total_runs / data.total_balls) * 100 : 0,
      average: data.matches.size > 0 ? data.total_runs / data.matches.size : 0,
      no_match_on_ground: data.matches.size,
      current_strike_rate: last7.length > 0 
        ? last7.reduce((sum, g) => sum + g.sr, 0) / last7.length 
        : 0,
      current_average: last7.length > 0 
        ? last7.reduce((sum, g) => sum + g.batsman_runs, 0) / last7.length 
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
