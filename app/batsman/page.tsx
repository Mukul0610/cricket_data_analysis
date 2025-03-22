

import React from 'react';
import { CricketAnalyticsDashboard } from "@/components/BatsmanStatsDisplay";
import { BowlerStatsDisplay } from "@/components/BowlerStatsDisplay";



interface PageSearchParams {
  team1?: string;
  team2?: string;
  venue?: string;
}

interface Props {
  searchParams: Promise<PageSearchParams>;
}

async function getQuotes(team1: string, team2: string, venue: string, player_type: string) {
  const encodedTeam1 = encodeURIComponent(team1);
  const encodedTeam2 = encodeURIComponent(team2);
  const encodedVenue = encodeURIComponent(venue);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/${player_type}?team1=${encodedTeam1}&team2=${encodedTeam2}&venue=${encodedVenue}`,
    { cache: 'no-store' }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch quotes');
  }
  
  return response.json();
}

export default async function CategoryPage({ searchParams }: Props) {
  const [resolvedSearchParams] = await Promise.all([searchParams]);
  
  const team1 = resolvedSearchParams.team1;
  const team2 = resolvedSearchParams.team2;
  const venue = resolvedSearchParams.venue;
  
  let stats = [];
  let bowler_stats = [];
  
  if (team1 && team2 && venue) {
    const [batsmanData, bowlerData] = await Promise.all([
      getQuotes(team1, team2, venue, "batsman"),
      getQuotes(team1, team2, venue, "bowler")
    ]);
    stats = batsmanData.stats;
    bowler_stats = bowlerData.stats;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
    
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
              Match Analysis
            </h1>
            <p className="text-center text-gray-600 mb-6">
              {team1} vs {team2} at {venue}
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-center mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-800 font-semibold">{team1}</p>
                <p className="text-sm text-blue-600">Team 1</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-800 font-semibold">{team2}</p>
                <p className="text-sm text-blue-600">Team 2</p>
              </div>
            </div>
          </div>

          <section id="batsmen" className="mb-12">
            <CricketAnalyticsDashboard initialData={stats} />
          </section>

          <section id="bowlers" className="mb-12">
            <BowlerStatsDisplay initialData={bowler_stats} />
          </section>
        </div>
      </main>
      
      
    </div>
  );
}