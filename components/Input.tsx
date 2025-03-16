"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const teams = [
 {'id':'csk','name':'Chennai Super Kings'},
 {'id':'mi','name':'Mumbai Indians'},
 {'id':'rcb','name':'Royal Challengers Bangalore'},
 {'id':'kkr','name':'Kolkata Knight Riders'},
 {'id':'dc','name':'Delhi Capitals'},
 {'id':'rr','name':'Rajasthan Royals'},
 {'id':'sh','name':'Sunrisers Hyderabad'},
 {'id':'lsg','name':'Lucknow Super Giants'},
 {'id':'pk','name':'Punjab Kings'},
 {'id':'gt','name':'Gujarat Titans'},
];

const stadiums = [
  'M Chinnaswamy Stadium', 'Punjab Cricket Association Stadium',
  'Feroz Shah Kotla', 'Wankhede Stadium', 'Eden Gardens',
  'Sawai Mansingh Stadium', 'Rajiv Gandhi International Stadium',
  'MA Chidambaram Stadium', 'Dr DY Patil Sports Academy', 'Newlands',
  "St George's Park", 'Kingsmead', 'SuperSport Park', 'Buffalo Park',
  'New Wanderers Stadium', 'De Beers Diamond Oval',
  'OUTsurance Oval', 'Brabourne Stadium', 'Sardar Patel Stadium',
  'Barabati Stadium', 'Vidarbha Cricket Association Stadium',
  'Himachal Pradesh Cricket Association Stadium', 'Nehru Stadium',
  'Holkar Cricket Stadium',
  'Dr. Y.S. Rajasekhara Reddy ACA-VDCA Cricket Stadium',
  'Subrata Roy Sahara Stadium',
  'Maharashtra Cricket Association Stadium',
  'Shaheed Veer Narayan Singh International Stadium',
  'JSCA International Stadium Complex', 'Sheikh Zayed Stadium',
  'Sharjah Cricket Stadium', 'Dubai International Cricket Stadium',
  'Saurashtra Cricket Association Stadium', 'Green Park',
  'Arun Jaitley Stadium', 'Narendra Modi Stadium',
  'Zayed Cricket Stadium',
  'Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium',
  'Barsapara Cricket Stadium',
  'Maharaja Yadavindra Singh International Cricket Stadium'
];


export default function Input() {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [stadium, setStadium] = useState('');
  const router = useRouter();

  const handleRedirect = () => {
    if (!team1 || !team2 || !stadium) return alert('Select all fields!');

    router.push(`/ipl?ipl_team1=${encodeURIComponent(team1)}&ipl_team2=${encodeURIComponent(team2)}&stadium=${encodeURIComponent(stadium)}`);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">IPL Player Insights</h1>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4 space-x-4 mb-6">
        <select value={team1} onChange={(e) => setTeam1(e.target.value)} className="p-2 border rounded">
          <option value="">Select Team 1</option>
          {teams.map((team) => <option  key={team.id} value={team.id}>{team.name}</option>)}
        </select>

        <select value={team2} onChange={(e) => setTeam2(e.target.value)} className="p-2 border rounded">
          <option value="">Select Team 2</option>
          {teams.map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}
        </select>

        <select value={stadium} onChange={(e) => setStadium(e.target.value)} className="p-2 border rounded">
          <option value="">Select Stadium</option>
          {stadiums.map((stadium) => <option key={stadium} value={stadium}>{stadium}</option>)}
        </select>

        <button onClick={handleRedirect} className="bg-blue-500 text-white px-4 py-2 rounded">Get Insights</button>
      </div>
    </div>
  );
}
