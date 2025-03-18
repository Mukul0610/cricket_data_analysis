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

let statsCache: {
  data: StatsResult[] | null;
  timestamp: number;
} = {
  data: null,
  timestamp: 0,
};

interface PlayerStats {
  total_runs: number;
  total_balls: number;
  matches: Set<string>;
  last7: Array<{ sr: number; date: Date ,batsman_runs:number}>;
  
  
}

interface StatsMap {
  [key: string]: PlayerStats;
}

async function getCachedStats(team1:string,team2:string, venue:string) {
  const currentTime = Date.now();
  if (statsCache.data && (currentTime - statsCache.timestamp) / 1000 < CACHE_DURATION) {
    return statsCache.data;
  }
  await connectToDatabase()
  // console.log(`Searching for team: ${team}, venue: ${venue}`);
  

  const players = await Team.find({ "team": { $in: [team1, team2] } }).exec();
  const playerNames = players.map(p => p["player_name"].trim());
  

  const matches = await Batsman.find({ venue, batsman_name: { $in: playerNames } }).exec();
  const all_matches=await Batsman.find({ batsman_name: { $in: playerNames } }).exec();

  const stats: StatsMap = {};
  for (const match of matches) {
    const { batsman_name, batsman_runs, total_balls } = match;
    if (!stats[batsman_name]) {
      stats[batsman_name] = { total_runs: 0, total_balls: 0, matches: new Set(), last7: [] };
    }

    stats[batsman_name].total_runs += batsman_runs;
    stats[batsman_name].total_balls += total_balls;
    stats[batsman_name].matches.add(match.match_id);
    
  }
  for (const match of all_matches) {
    const { batsman_name, batsman_runs, total_balls, date } = match;
    if (!stats[batsman_name]) {
      stats[batsman_name] = { total_runs: 0, total_balls: 0, matches: new Set(), last7: []};
    }
    stats[batsman_name].last7.push({ sr: (batsman_runs / total_balls) * 100,batsman_runs, date, });//these are total runs of a player
    
  }

  const result = Object.entries(stats).map(([player, data]) => {
    const last7 = data.last7.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 7);
    
    return {
      player,
      strike_rate: (data.total_runs / data.total_balls) * 100,
      average: data.total_runs / data.matches.size,
      no_match_on_ground:data.matches.size,
      current_strike_rate: last7.reduce((sum, g) => sum + g.sr, 0) / last7.length || 0,
      current_average: last7.reduce((sum, g) => sum + g.batsman_runs, 0) / last7.length || 0,
      latest_match_no:(last7.length || 0)
}});

  statsCache = { data: result, timestamp: currentTime };
  return result;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const team1 = searchParams.get('team1');
    const team2 = searchParams.get('team2');
    const venue = searchParams.get('venue');

    if (!team1||!team2 || !venue) {
      return NextResponse.json({ error: "Missing team or venue parameter" }, { status: 400 });
    }

    const stats = await getCachedStats(team1, team2, venue!);

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
