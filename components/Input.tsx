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
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRedirect = (type: string) => {
    if (!team1 || !team2 || !stadium) {
      alert('Select all fields!');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const path = type === 'batsman' ? '/batsman' : '/bowler';
      router.push(`${path}?team1=${encodeURIComponent(team1)}&team2=${encodeURIComponent(team2)}&venue=${encodeURIComponent(stadium)}`);
    }, 800);
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
              <div className="relative text-gray-500" >
                <select 
                  value={team1}
                  onChange={(e) => setTeam1(e.target.value)}
                  className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-lg shadow-sm"
                >
                  <option value="" >Select Team 1</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                  ))}
                </select>
                <Shield className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Team 2</label>
              <div className="relative text-gray-500">
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
              <div className="relative text-gray-500">
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
              onClick={() => handleRedirect('batsman')}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              {isLoading ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                <span>Batsman Insights</span>
              )}
            </button>
            <button
              onClick={() => handleRedirect('bowler')}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
            >
              {isLoading ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                <span>Bowler Insights</span>
              )}
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

