// import { useEffect } from 'react';
// import { useRouter } from 'next/router';

import CricketAnalyticsDashboard from "@/components/BatsmanStatsDisplay";

// export default function BatsmanPage() {
//   const router = useRouter();

//   useEffect(() => {
//     const { team1, team2, venue } = router.query;
//     if (team1 && team2 && venue) {
//       console.log(`Team 1: ${team1}, Team 2: ${team2}, Venue: ${venue}`);
//     }
//   }, [router.query]);

//   return (
//     <div>
//       <h1>Batsman Page</h1>
//     </div>
//   );
// }




// interface PageParams {
//   category: string;
// }

interface PageSearchParams {
  team1?: string;
  team2?: string;
  venue?: string;
}

interface Props {
  
  searchParams: Promise<PageSearchParams>;
}



export default async function CategoryPage({ 
  
  searchParams 
}: Props) {
  const [ resolvedSearchParams] = await Promise.all([ 
    searchParams
  ]);
  
  const team1 = resolvedSearchParams.team1;
  const team2 = resolvedSearchParams.team2;
  const venue = resolvedSearchParams.venue;
  

  
  
  

  return (
    <main className="min-h-screen bg-[#f5efe9] py-12">
      {team1} and {team2} and {venue}
      <CricketAnalyticsDashboard team1={team1} team2={team2} venue={venue}/>
    </main>
  );
}