import { BowlerStatsDisplay } from "@/components/BowlerStatsDisplay";



interface PageSearchParams {
  team1?: string;
  team2?: string;
  venue?: string;
}

interface Props {
  
  searchParams: Promise<PageSearchParams>;
}

async function getQuotes(team1: string, team2: string,venue:string) {
  const encodedTeam1 = encodeURIComponent(team1);
  const encodedTeam2 = encodeURIComponent(team2);
  const encodedVenue = encodeURIComponent(venue);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/bowler?team1=${encodedTeam1}&team2=${encodedTeam2}&venue=${encodedVenue}`,
    { cache: 'no-store' }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch quotes');
  }
  
  return response.json();
}

export default async function BowlerPage({ 
  
  searchParams 
}: Props) {
  const [ resolvedSearchParams] = await Promise.all([ 
    searchParams
  ]);
  
  const team1 = resolvedSearchParams.team1;
  const team2 = resolvedSearchParams.team2;
  const venue = resolvedSearchParams.venue;
  
  let stats = []; // Initialize stats as an empty array
  if (team1 && team2 && venue) {
    const data = await getQuotes(team1, team2, venue);
    stats = data.stats; // Assign the fetched stats to the variable
  }
  
  return (
    <main className="min-h-screen bg-[#f5efe9] py-12">
      <h1 className="text-3xl font-bold text-center mb-4">
        {team1} vs {team2} at {venue}
      </h1>
       <BowlerStatsDisplay initialData={stats} />
    </main>
  );
}