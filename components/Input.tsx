// // "use client"
// // import { useState } from 'react';
// // import { useRouter } from 'next/navigation';

// // const teams = [
// //  {'id':'csk','name':'Chennai Super Kings'},
// //  {'id':'mi','name':'Mumbai Indians'},
// //  {'id':'rcb','name':'Royal Challengers Bangalore'},
// //  {'id':'kkr','name':'Kolkata Knight Riders'},
// //  {'id':'dc','name':'Delhi Capitals'},
// //  {'id':'rr','name':'Rajasthan Royals'},
// //  {'id':'sh','name':'Sunrisers Hyderabad'},
// //  {'id':'lsg','name':'Lucknow Super Giants'},
// //  {'id':'pk','name':'Punjab Kings'},
// //  {'id':'gt','name':'Gujarat Titans'},
// // ];

// // const stadiums = [
// //   'M Chinnaswamy Stadium', 'Punjab Cricket Association Stadium',
// //   'Feroz Shah Kotla', 'Wankhede Stadium', 'Eden Gardens',
// //   'Sawai Mansingh Stadium', 'Rajiv Gandhi International Stadium',
// //   'MA Chidambaram Stadium', 'Dr DY Patil Sports Academy', 'Newlands',
// //   "St George's Park", 'Kingsmead', 'SuperSport Park', 'Buffalo Park',
// //   'New Wanderers Stadium', 'De Beers Diamond Oval',
// //   'OUTsurance Oval', 'Brabourne Stadium', 'Sardar Patel Stadium',
// //   'Barabati Stadium', 'Vidarbha Cricket Association Stadium',
// //   'Himachal Pradesh Cricket Association Stadium', 'Nehru Stadium',
// //   'Holkar Cricket Stadium',
// //   'Dr. Y.S. Rajasekhara Reddy ACA-VDCA Cricket Stadium',
// //   'Subrata Roy Sahara Stadium',
// //   'Maharashtra Cricket Association Stadium',
// //   'Shaheed Veer Narayan Singh International Stadium',
// //   'JSCA International Stadium Complex', 'Sheikh Zayed Stadium',
// //   'Sharjah Cricket Stadium', 'Dubai International Cricket Stadium',
// //   'Saurashtra Cricket Association Stadium', 'Green Park',
// //   'Arun Jaitley Stadium', 'Narendra Modi Stadium',
// //   'Zayed Cricket Stadium',
// //   'Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium',
// //   'Barsapara Cricket Stadium',
// //   'Maharaja Yadavindra Singh International Cricket Stadium'
// // ];


// // export default function Input() {
// //   const [team1, setTeam1] = useState('');
// //   const [team2, setTeam2] = useState('');
// //   const [stadium, setStadium] = useState('');
// //   const router = useRouter();

// //   const handleRedirect = () => {
// //     if (!team1 || !team2 || !stadium) return alert('Select all fields!');

// //     router.push(`/batsman?team1=${encodeURIComponent(team1)}&team2=${encodeURIComponent(team2)}&venue=${encodeURIComponent(stadium)}`);
// //   };

// //   const handleBowler = () => {
// //     if (!team1 || !team2 || !stadium) return alert('Select all fields!');

// //     router.push(`/bowler?team1=${encodeURIComponent(team1)}&team2=${encodeURIComponent(team2)}&venue=${encodeURIComponent(stadium)}`);
// //   };

// //   return (
// //     <div className="min-h-screen p-8 bg-gray-100">
// //       <h1 className="text-3xl font-bold mb-6">IPL Player Insights</h1>

// //       <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4 space-x-4 mb-6">
// //         <select value={team1} onChange={(e) => setTeam1(e.target.value)} className="p-2 border rounded">
// //           <option value="">Select Team 1</option>
// //           {teams.map((team) => <option  key={team.id} value={team.id}>{team.name}</option>)}
// //         </select>

// //         <select value={team2} onChange={(e) => setTeam2(e.target.value)} className="p-2 border rounded">
// //           <option value="">Select Team 2</option>
// //           {teams.map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}
// //         </select>

// //         <select value={stadium} onChange={(e) => setStadium(e.target.value)} className="p-2 border rounded">
// //           <option value="">Select Stadium</option>
// //           {stadiums.map((stadium) => <option key={stadium} value={stadium}>{stadium}</option>)}
// //         </select>

// //         <button onClick={handleRedirect} className="bg-blue-500 text-white px-4 py-2 rounded">Get Batsman Insights</button>
// //         <button onClick={handleBowler} className="bg-blue-500 text-white px-4 py-2 rounded">Get Balwor Insights</button>
// //       </div>
// //     </div>
// //   );
// // }


// "use client"
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { ChevronDown, TrendingUp, Cricket } from 'lucide-react';

// const teams = [
//   {'id': 'csk', 'name': 'Chennai Super Kings', 'color': '#FFFF00'},
//   {'id': 'mi', 'name': 'Mumbai Indians', 'color': '#004BA0'},
//   {'id': 'rcb', 'name': 'Royal Challengers Bangalore', 'color': '#EC1C24'},
//   {'id': 'kkr', 'name': 'Kolkata Knight Riders', 'color': '#3A225D'},
//   {'id': 'dc', 'name': 'Delhi Capitals', 'color': '#0078BC'},
//   {'id': 'rr', 'name': 'Rajasthan Royals', 'color': '#FF69B4'},
//   {'id': 'sh', 'name': 'Sunrisers Hyderabad', 'color': '#FF822A'},
//   {'id': 'lsg', 'name': 'Lucknow Super Giants', 'color': '#A7D5F6'},
//   {'id': 'pk', 'name': 'Punjab Kings', 'color': '#ED1B24'},
//   {'id': 'gt', 'name': 'Gujarat Titans', 'color': '#1C1C1C'},
// ];

// const stadiums = [
//   'M Chinnaswamy Stadium', 'Punjab Cricket Association Stadium',
//   'Feroz Shah Kotla', 'Wankhede Stadium', 'Eden Gardens',
//   'Sawai Mansingh Stadium', 'Rajiv Gandhi International Stadium',
//   'MA Chidambaram Stadium', 'Dr DY Patil Sports Academy', 'Newlands',
//   "St George's Park", 'Kingsmead', 'SuperSport Park', 'Buffalo Park',
//   'New Wanderers Stadium', 'De Beers Diamond Oval',
//   'OUTsurance Oval', 'Brabourne Stadium', 'Sardar Patel Stadium',
//   'Barabati Stadium', 'Vidarbha Cricket Association Stadium',
//   'Himachal Pradesh Cricket Association Stadium', 'Nehru Stadium',
//   'Holkar Cricket Stadium',
//   'Dr. Y.S. Rajasekhara Reddy ACA-VDCA Cricket Stadium',
//   'Subrata Roy Sahara Stadium',
//   'Maharashtra Cricket Association Stadium',
//   'Shaheed Veer Narayan Singh International Stadium',
//   'JSCA International Stadium Complex', 'Sheikh Zayed Stadium',
//   'Sharjah Cricket Stadium', 'Dubai International Cricket Stadium',
//   'Saurashtra Cricket Association Stadium', 'Green Park',
//   'Arun Jaitley Stadium', 'Narendra Modi Stadium',
//   'Zayed Cricket Stadium',
//   'Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium',
//   'Barsapara Cricket Stadium',
//   'Maharaja Yadavindra Singh International Cricket Stadium'
// ];

// // Group stadiums by region for better UX
// const stadiumGroups = {
//   'India': [
//     'M Chinnaswamy Stadium', 'Punjab Cricket Association Stadium',
//     'Feroz Shah Kotla', 'Wankhede Stadium', 'Eden Gardens',
//     'Sawai Mansingh Stadium', 'Rajiv Gandhi International Stadium',
//     'MA Chidambaram Stadium', 'Dr DY Patil Sports Academy',
//     'Brabourne Stadium', 'Sardar Patel Stadium',
//     'Barabati Stadium', 'Vidarbha Cricket Association Stadium',
//     'Himachal Pradesh Cricket Association Stadium', 'Nehru Stadium',
//     'Holkar Cricket Stadium',
//     'Dr. Y.S. Rajasekhara Reddy ACA-VDCA Cricket Stadium',
//     'Subrata Roy Sahara Stadium',
//     'Maharashtra Cricket Association Stadium',
//     'Shaheed Veer Narayan Singh International Stadium',
//     'JSCA International Stadium Complex',
//     'Saurashtra Cricket Association Stadium', 'Green Park',
//     'Arun Jaitley Stadium', 'Narendra Modi Stadium',
//     'Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium',
//     'Barsapara Cricket Stadium',
//     'Maharaja Yadavindra Singh International Cricket Stadium'
//   ],
//   'UAE': [
//     'Sheikh Zayed Stadium', 'Sharjah Cricket Stadium', 
//     'Dubai International Cricket Stadium', 'Zayed Cricket Stadium'
//   ],
//   'South Africa': [
//     'Newlands', "St George's Park", 'Kingsmead', 'SuperSport Park', 
//     'Buffalo Park', 'New Wanderers Stadium', 'De Beers Diamond Oval',
//     'OUTsurance Oval'
//   ]
// };

// export default function Input() {
//   const [team1, setTeam1] = useState('');
//   const [team2, setTeam2] = useState('');
//   const [stadium, setStadium] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const router = useRouter();

//   const handleAnalysis = (type) => {
//     if (!team1 || !team2 || !stadium) {
//       document.getElementById('error-message').classList.remove('opacity-0');
//       document.getElementById('error-message').classList.add('opacity-100');
      
//       setTimeout(() => {
//         document.getElementById('error-message').classList.remove('opacity-100');
//         document.getElementById('error-message').classList.add('opacity-0');
//       }, 3000);
//       return;
//     }

//     setIsLoading(true);
    
//     setTimeout(() => {
//       if (type === 'batsman') {
//         router.push(`/batsman?team1=${encodeURIComponent(team1)}&team2=${encodeURIComponent(team2)}&venue=${encodeURIComponent(stadium)}`);
//       } else {
//         router.push(`/bowler?team1=${encodeURIComponent(team1)}&team2=${encodeURIComponent(team2)}&venue=${encodeURIComponent(stadium)}`);
//       }
//     }, 800); // Simulating loading
//   };

//   const getTeamLogo = (teamId) => {
//     // Placeholder for team logos - in a real app, replace with actual logo paths
//     return `/assets/logos/${teamId}.png`;
//   };

//   const getTeamById = (id) => {
//     return teams.find(team => team.id === id) || {};
//   }

//   const toggleDropdown = (dropdownName) => {
//     if (activeDropdown === dropdownName) {
//       setActiveDropdown(null);
//     } else {
//       setActiveDropdown(dropdownName);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
//       {/* Header with logo and title */}
//       <header className="py-6 px-6 md:px-12 flex items-center justify-between border-b border-gray-700">
//         <div className="flex items-center space-x-2">
//           <Cricket className="text-yellow-500 h-8 w-8" />
//           <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">IPL Analytics Pro</h1>
//         </div>
//         <div className="hidden md:flex space-x-6 text-sm">
//           <a href="#" className="hover:text-yellow-400 transition-colors">Dashboard</a>
//           <a href="#" className="hover:text-yellow-400 transition-colors">Head-to-Head</a>
//           <a href="#" className="hover:text-yellow-400 transition-colors">Player Stats</a>
//           <a href="#" className="hover:text-yellow-400 transition-colors">Team Rankings</a>
//         </div>
//       </header>

//       <main className="max-w-6xl mx-auto px-4 py-12">
//         <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-8 backdrop-blur-sm bg-opacity-70">
//           <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Match Analytics</h2>
          
//           <div id="error-message" className="bg-red-500 bg-opacity-90 text-white px-4 py-3 rounded-md mb-6 transition-opacity duration-300 opacity-0 text-center">
//             Please select all fields before proceeding
//           </div>

//           <div className="space-y-8">
//             {/* Team Selection */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
//               <div className="space-y-2">
//                 <label className="block text-sm text-gray-300 font-medium mb-1">Team 1</label>
//                 <div className="relative">
//                   <div 
//                     className="flex items-center justify-between p-4 border border-gray-600 rounded-lg cursor-pointer hover:border-yellow-500 transition-colors bg-gray-700"
//                     onClick={() => toggleDropdown('team1')}
//                   >
//                     {team1 ? (
//                       <div className="flex items-center space-x-3">
//                         <div className="w-6 h-6 rounded-full" style={{ backgroundColor: getTeamById(team1).color }}></div>
//                         <span>{getTeamById(team1).name}</span>
//                       </div>
//                     ) : (
//                       <span className="text-gray-400">Select Team 1</span>
//                     )}
//                     <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${activeDropdown === 'team1' ? 'transform rotate-180' : ''}`} />
//                   </div>
                  
//                   {activeDropdown === 'team1' && (
//                     <div className="absolute z-10 mt-1 w-full bg-gray-800 shadow-lg border border-gray-700 rounded-lg py-1 max-h-60 overflow-auto">
//                       {teams.map((team) => (
//                         <div 
//                           key={team.id} 
//                           className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-700 cursor-pointer"
//                           onClick={() => {
//                             setTeam1(team.id);
//                             setActiveDropdown(null);
//                           }}
//                         >
//                           <div className="w-4 h-4 rounded-full" style={{ backgroundColor: team.color }}></div>
//                           <span>{team.name}</span>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="block text-sm text-gray-300 font-medium mb-1">Team 2</label>
//                 <div className="relative">
//                   <div 
//                     className="flex items-center justify-between p-4 border border-gray-600 rounded-lg cursor-pointer hover:border-yellow-500 transition-colors bg-gray-700"
//                     onClick={() => toggleDropdown('team2')}
//                   >
//                     {team2 ? (
//                       <div className="flex items-center space-x-3">
//                         <div className="w-6 h-6 rounded-full" style={{ backgroundColor: getTeamById(team2).color }}></div>
//                         <span>{getTeamById(team2).name}</span>
//                       </div>
//                     ) : (
//                       <span className="text-gray-400">Select Team 2</span>
//                     )}
//                     <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${activeDropdown === 'team2' ? 'transform rotate-180' : ''}`} />
//                   </div>
                  
//                   {activeDropdown === 'team2' && (
//                     <div className="absolute z-10 mt-1 w-full bg-gray-800 shadow-lg border border-gray-700 rounded-lg py-1 max-h-60 overflow-auto">
//                       {teams.map((team) => (
//                         <div 
//                           key={team.id} 
//                           className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-700 cursor-pointer"
//                           onClick={() => {
//                             setTeam2(team.id);
//                             setActiveDropdown(null);
//                           }}
//                         >
//                           <div className="w-4 h-4 rounded-full" style={{ backgroundColor: team.color }}></div>
//                           <span>{team.name}</span>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
            
//             {/* Stadium Selection */}
//             <div className="space-y-2">
//               <label className="block text-sm text-gray-300 font-medium mb-1">Venue</label>
//               <div className="relative">
//                 <div 
//                   className="flex items-center justify-between p-4 border border-gray-600 rounded-lg cursor-pointer hover:border-yellow-500 transition-colors bg-gray-700"
//                   onClick={() => toggleDropdown('stadium')}
//                 >
//                   {stadium ? (
//                     <span>{stadium}</span>
//                   ) : (
//                     <span className="text-gray-400">Select Stadium</span>
//                   )}
//                   <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${activeDropdown === 'stadium' ? 'transform rotate-180' : ''}`} />
//                 </div>
                
//                 {activeDropdown === 'stadium' && (
//                   <div className="absolute z-10 mt-1 w-full bg-gray-800 shadow-lg border border-gray-700 rounded-lg py-1 max-h-60 overflow-auto">
//                     {Object.entries(stadiumGroups).map(([region, venues]) => (
//                       <div key={region}>
//                         <div className="px-4 py-2 font-semibold text-sm bg-gray-900 text-yellow-500">{region}</div>
//                         {venues.map((venue) => (
//                           <div 
//                             key={venue} 
//                             className="px-4 py-3 hover:bg-gray-700 cursor-pointer"
//                             onClick={() => {
//                               setStadium(venue);
//                               setActiveDropdown(null);
//                             }}
//                           >
//                             {venue}
//                           </div>
//                         ))}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
//               <button
//                 onClick={() => handleAnalysis('batsman')}
//                 disabled={isLoading}
//                 className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-medium py-4 px-6 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg flex 
                

// "use client";
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// const teams = [
//   { 'id': 'csk', 'name': 'Chennai Super Kings' },
//   { 'id': 'mi', 'name': 'Mumbai Indians' },
//   { 'id': 'rcb', 'name': 'Royal Challengers Bangalore' },
//   { 'id': 'kkr', 'name': 'Kolkata Knight Riders' },
//   { 'id': 'dc', 'name': 'Delhi Capitals' },
//   { 'id': 'rr', 'name': 'Rajasthan Royals' },
//   { 'id': 'sh', 'name': 'Sunrisers Hyderabad' },
//   { 'id': 'lsg', 'name': 'Lucknow Super Giants' },
//   { 'id': 'pk', 'name': 'Punjab Kings' },
//   { 'id': 'gt', 'name': 'Gujarat Titans' },
// ];

// const stadiums = [
//   'M Chinnaswamy Stadium', 'Punjab Cricket Association Stadium', 
//   'Feroz Shah Kotla', 'Wankhede Stadium', 'Eden Gardens', 
//   'Sawai Mansingh Stadium', 'Rajiv Gandhi International Stadium', 
//   'MA Chidambaram Stadium', 'Dr DY Patil Sports Academy', 
//   'Brabourne Stadium', 'Sardar Patel Stadium', 'Barabati Stadium', 
//   'Vidarbha Cricket Association Stadium', 'Himachal Pradesh Cricket Association Stadium', 
//   'Nehru Stadium', 'Holkar Cricket Stadium', 'Dr. Y.S. Rajasekhara Reddy ACA-VDCA Cricket Stadium',
//   'Subrata Roy Sahara Stadium', 'Maharashtra Cricket Association Stadium', 
//   'Shaheed Veer Narayan Singh International Stadium', 'JSCA International Stadium Complex', 
//   'Sheikh Zayed Stadium', 'Sharjah Cricket Stadium', 'Dubai International Cricket Stadium', 
//   'Saurashtra Cricket Association Stadium', 'Green Park', 'Arun Jaitley Stadium', 
//   'Narendra Modi Stadium', 'Zayed Cricket Stadium', 
//   'Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium', 
//   'Barsapara Cricket Stadium', 'Maharaja Yadavindra Singh International Cricket Stadium'
// ];

// export default function Input() {
//   const [team1, setTeam1] = useState('');
//   const [team2, setTeam2] = useState('');
//   const [stadium, setStadium] = useState('');
//   const router = useRouter();

//   const handleRedirect = () => {
//     if (!team1 || !team2 || !stadium) return alert('Select all fields!');
//     router.push(`/batsman?team1=${encodeURIComponent(team1)}&team2=${encodeURIComponent(team2)}&venue=${encodeURIComponent(stadium)}`);
//   };

//   const handleBowler = () => {
//     if (!team1 || !team2 || !stadium) return alert('Select all fields!');
//     router.push(`/bowler?team1=${encodeURIComponent(team1)}&team2=${encodeURIComponent(team2)}&venue=${encodeURIComponent(stadium)}`);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-blue-700 to-indigo-900 p-8 text-white">
//       <h1 className="text-4xl font-bold text-center mb-8 drop-shadow-lg">IPL Player Insights</h1>

//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//         <select 
//           value={team1} 
//           onChange={(e) => setTeam1(e.target.value)} 
//           className="p-3 border border-gray-300 rounded-lg shadow-md focus:ring-4 focus:ring-blue-500 focus:outline-none transition duration-300">
//           <option value="">Select Team 1</option>
//           {teams.map((team) => (
//             <option key={team.id} value={team.id}>{team.name}</option>
//           ))}
//         </select>

//         <select 
//           value={team2} 
//           onChange={(e) => setTeam2(e.target.value)} 
//           className="p-3 border border-gray-300 rounded-lg shadow-md focus:ring-4 focus:ring-blue-500 focus:outline-none transition duration-300">
//           <option value="">Select Team 2</option>
//           {teams.map((team) => (
//             <option key={team.id} value={team.id}>{team.name}</option>
//           ))}
//         </select>

//         <select 
//           value={stadium} 
//           onChange={(e) => setStadium(e.target.value)} 
//           className="p-3 border border-gray-300 rounded-lg shadow-md focus:ring-4 focus:ring-blue-500 focus:outline-none transition duration-300">
//           <option value="">Select Stadium</option>
//           {stadiums.map((stadium) => (
//             <option key={stadium} value={stadium}>{stadium}</option>
//           ))}
//         </select>

//         <div className="flex justify-between items-center space-x-4">
//           <button 
//             onClick={handleRedirect} 
//             className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-200">
//             Get Batsman Insights
//           </button>
//           <button 
//             onClick={handleBowler} 
//             className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-200">
//             Get Bowler Insights
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client"

import React, { useState } from 'react';
import { Ticket as Cricket, Radius as Stadium, Shield } from 'lucide-react';
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
    if (!team1 || !team2 || !stadium) return alert('Please select all fields!');
    router.push(`/batsman?team1=${encodeURIComponent(team1)}&team2=${encodeURIComponent(team2)}&venue=${encodeURIComponent(stadium)}`);
  };

  const handleBowler = () => {
    if (!team1 || !team2 || !stadium) return alert('Please select all fields!');
    router.push(`/bowler?team1=${encodeURIComponent(team1)}&team2=${encodeURIComponent(team2)}&venue=${encodeURIComponent(stadium)}`);
  
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Cricket className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">IPL Player Insights</h1>
          <p className="text-lg text-gray-600">Analyze player performance and make data-driven decisions</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-lg backdrop-filter">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Team 1</label>
              <div className="relative">
                <select 
                  value={team1}
                  onChange={(e) => setTeam1(e.target.value)}
                  className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-lg shadow-sm"
                >
                  <option value="">Select Team 1</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                  ))}
                </select>
                <Shield className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Team 2</label>
              <div className="relative">
                <select 
                  value={team2}
                  onChange={(e) => setTeam2(e.target.value)}
                  className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-lg shadow-sm"
                >
                  <option value="">Select Team 2</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                  ))}
                </select>
                <Shield className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Stadium</label>
              <div className="relative">
                <select 
                  value={stadium}
                  onChange={(e) => setStadium(e.target.value)}
                  className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-lg shadow-sm"
                >
                  <option value="">Select Stadium</option>
                  {stadiums.map((venue) => (
                    <option key={venue} value={venue}>{venue}</option>
                  ))}
                </select>
                <Stadium className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRedirect}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Get Batsman Insights
            </button>
            <button
              onClick={handleBowler}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
            >
              Get Bowler Insights
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <Cricket className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Analysis</h3>
            <p className="text-gray-600">Get instant insights about player performance based on historical data.</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
              <Stadium className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Venue Statistics</h3>
            <p className="text-gray-600">Understand how players perform at different stadiums across matches.</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Team Matchups</h3>
            <p className="text-gray-600">Compare head-to-head statistics between teams and players.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

