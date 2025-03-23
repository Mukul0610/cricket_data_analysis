
"use client"

import React, { useState } from 'react';
import { 
  Ticket as Cricket, 
  Radius as Stadium, 
  Shield,
  TrendingUp,
  Users,
  BarChart3,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const teams = [
  {'id':'csk','name':'Chennai Super Kings', color: 'yellow'},
  {'id':'mi','name':'Mumbai Indians', color: 'blue'},
  {'id':'rcb','name':'Royal Challengers Bangalore', color: 'red'},
  {'id':'kkr','name':'Kolkata Knight Riders', color: 'purple'},
  {'id':'dc','name':'Delhi Capitals', color: 'blue'},
  {'id':'rr','name':'Rajasthan Royals', color: 'pink'},
  {'id':'srh','name':'Sunrisers Hyderabad', color: 'orange'},
  {'id':'lsg','name':'Lucknow Super Giants', color: 'teal'},
  {'id':'pk','name':'Punjab Kings', color: 'red'},
  {'id':'gt','name':'Gujarat Titans', color: 'blue'}
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

function App() {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [stadium, setStadium] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  

  const handleAnalyze = () => {
    if (!team1 || !team2 || !stadium) {
      alert('Please select all fields to continue!');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      // setIsLoading(false);
      setTimeout(() => {
              // const path = type === 'batsman' ? '/batsman' : '/bowler';
              router.push(`batsman?team1=${encodeURIComponent(team1)}&team2=${encodeURIComponent(team2)}&venue=${encodeURIComponent(stadium)}`);
            }, 800);
      
    }, 1500);
  };

  const getTeamLogo = (teamId: string) => {
    const team = teams.find(t => t.id === teamId);
    return team ? (
      <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${team.color}-100`}>
        <Shield className={`w-6 h-6 text-${team.color}-600`} />
      </div>
    ) : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-blue-600 rounded-2xl mb-6 transform hover:scale-105 transition-transform duration-200">
            <Cricket className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            IPL Analytics Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock the power of data-driven cricket analysis with our advanced insights platform
          </p>
        </div>

        {/* Main Form Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 backdrop-blur-lg backdrop-filter mb-16 transform hover:shadow-2xl transition-all duration-300">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-12">
            {/* Team 1 Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Team 1</label>
              <div className="relative group">
                <select 
                  value={team1}
                  onChange={(e) => setTeam1(e.target.value)}
                  className="block w-full pl-4 pr-10 py-4 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl shadow-sm transition-all duration-200 appearance-none bg-white"
                >
                  <option value="">Select First Team</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none transition-transform group-hover:translate-y-[-45%]" />
              </div>
            </div>

            {/* Team 2 Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Team 2</label>
              <div className="relative group">
                <select 
                  value={team2}
                  onChange={(e) => setTeam2(e.target.value)}
                  className="block w-full pl-4 pr-10 py-4 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl shadow-sm transition-all duration-200 appearance-none bg-white"
                >
                  <option value="">Select Second Team</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none transition-transform group-hover:translate-y-[-45%]" />
              </div>
            </div>

            {/* Stadium Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Stadium</label>
              <div className="relative group">
                <select 
                  value={stadium}
                  onChange={(e) => setStadium(e.target.value)}
                  className="block w-full pl-4 pr-10 py-4 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl shadow-sm transition-all duration-200 appearance-none bg-white"
                >
                  <option value="">Select Venue</option>
                  {stadiums.map((venue) => (
                    <option key={venue} value={venue}>{venue}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none transition-transform group-hover:translate-y-[-45%]" />
              </div>
            </div>
          </div>

          {/* Selected Teams Preview */}
          {(team1 || team2) && (
            <div className="flex items-center justify-center gap-6 mb-12">
              {team1 && (
                <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg">
                  {getTeamLogo(team1)}
                  <span className="font-medium">{teams.find(t => t.id === team1)?.name}</span>
                </div>
              )}
              {team1 && team2 && (
                <div className="text-2xl font-bold text-gray-400">VS</div>
              )}
              {team2 && (
                <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg">
                  {getTeamLogo(team2)}
                  <span className="font-medium">{teams.find(t => t.id === team2)?.name}</span>
                </div>
              )}
            </div>
          )}

          {/* Action Button */}
          <div className="flex justify-center">
            <button
              onClick={handleAnalyze}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105 gap-2"
            >
              {isLoading ? (
                <div className="animate-spin h-6 w-6 border-3 border-white border-t-transparent rounded-full"></div>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Analyze Performance</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mb-6">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Analysis</h3>
            <p className="text-gray-600">Get instant insights about player performance with our advanced analytics engine.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl mb-6">
              <Stadium className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Venue Intelligence</h3>
            <p className="text-gray-600">Understand how players perform at different stadiums with historical data.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl mb-6">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Team Matchups</h3>
            <p className="text-gray-600">Deep dive into head-to-head statistics between teams and individual players.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl mb-6">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Predictive Insights</h3>
            <p className="text-gray-600">Make data-driven decisions with our advanced prediction models.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

