"use client"
import React, { useState, useMemo } from 'react';
import { Filter, Users } from 'lucide-react';
// import { getCachedStats } from '@/lib/actions/batsman.action';

interface Player {
  player: string;
  strike_rate: number;
  average: number;
  no_match_on_ground: number;
  current_strike_rate: number;
  current_average: number;
  latest_match_no: number;
}

interface SortConfig {
  key: keyof Player | null;
  direction: 'ascending' | 'descending';
}

interface Props {
  initialData: Player[];
}


export function CricketAnalyticsDashboard({initialData}:Props ){
  
  const [players, setPlayers] = useState<Player[]>(initialData);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterConfig, setFilterConfig] = useState({
    minStrikeRate: 0,
    minAverage: 0,
    minMatches: 0
  });
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Sort function
  const requestSort = (key: keyof Player) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting to players
  const sortedPlayers = useMemo(() => {
    const sortableItems = [...players];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const aVal = a[sortConfig.key as keyof Player];
        const bVal = b[sortConfig.key as keyof Player];
        if (aVal < bVal) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aVal > bVal) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [players, sortConfig]);

  // Apply filters and search
  const filteredPlayers = useMemo(() => {
    return sortedPlayers.filter(player => {
      // Check if player is defined and has the 'player' property
      if (!player || !player.player) {
        return false; // Skip this entry if player is undefined or does not have a 'player' property
      }
      
      const matchesSearch = player.player.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilters = 
        player.strike_rate >= filterConfig.minStrikeRate &&
        player.average >= filterConfig.minAverage &&
        player.no_match_on_ground >= filterConfig.minMatches;
      
      return matchesSearch && matchesFilters;
    });
  }, [sortedPlayers, searchTerm, filterConfig]);

  // Handle selecting players for best eleven
  const togglePlayerSelection = (player:any) => {
    if (selectedPlayers.some(p => p.player === player.player)) {
      setSelectedPlayers(selectedPlayers.filter(p => p.player !== player.player));
    } else if (selectedPlayers.length < 11) {
      setSelectedPlayers([...selectedPlayers, player]);
    } else {
      alert("You can only select 11 players for your team!");
    }
  };

  // Auto-select best players based on current form
  const autoSelectBestEleven = () => {
    // Simple algorithm: prioritize players with higher current averages and strike rates
    const scoredPlayers = [...players].map(player => ({
      ...player,
      formScore: (player.current_average * 0.6) + (player.current_strike_rate * 0.4)
    }));
    
    // Sort by form score
    scoredPlayers.sort((a, b) => b.formScore - a.formScore);
    
    // Select top 11
    setSelectedPlayers(scoredPlayers.slice(0, 11));
  };

  // Reset filters
  const resetFilters = () => {
    setFilterConfig({
      minStrikeRate: 0,
      minAverage: 0,
      minMatches: 0
    });
    setSearchTerm('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Cricket Analytics Dashboard</h1>
          <p className="text-sm opacity-80">Player performance metrics and team selection tool</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4">
        {/* Dashboard Controls */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="w-full md:w-1/3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search players..."
                  className="w-full p-2 pl-8 border rounded-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="absolute left-2 top-2.5 text-gray-400">🔍</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md text-sm"
              >
                <Filter size={16} />
                Filters
              </button>
              
              <button 
                onClick={autoSelectBestEleven}
                className="flex items-center gap-1 bg-blue-100 hover:bg-blue-200 px-3 py-2 rounded-md text-sm text-blue-800"
              >
                <Users size={16} />
                Auto-Select Best XI
              </button>
              
              <button 
                onClick={() => setSelectedPlayers([])}
                className="flex items-center gap-1 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-md text-sm text-red-600"
              >
                Clear Selection
              </button>
            </div>
          </div>
          
          {/* Filters */}
          {showFilters && (
            <div className="bg-gray-50 p-4 rounded-md mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Strike Rate</label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={filterConfig.minStrikeRate}
                  onChange={(e) => setFilterConfig({...filterConfig, minStrikeRate: Number(e.target.value)})}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0</span>
                  <span>{filterConfig.minStrikeRate}</span>
                  <span>200</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Average</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filterConfig.minAverage}
                  onChange={(e) => setFilterConfig({...filterConfig, minAverage: Number(e.target.value)})}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0</span>
                  <span>{filterConfig.minAverage}</span>
                  <span>100</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Matches at Venue</label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={filterConfig.minMatches}
                  onChange={(e) => setFilterConfig({...filterConfig, minMatches: Number(e.target.value)})}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0</span>
                  <span>{filterConfig.minMatches}</span>
                  <span>50</span>
                </div>
              </div>
              
              <div className="md:col-span-3">
                <button 
                  onClick={resetFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Tab Navigation */}
        <div className="flex border-b mb-6">
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('all')}
          >
            All Players
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'selected' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('selected')}
          >
            Selected XI ({selectedPlayers.length}/11)
          </button>
        </div>
        
        {/* Display Players */}
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Select
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('player')}
                >
                  <div className="flex items-center">
                    Player
                    {sortConfig.key === 'player' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('average')}
                >
                  <div className="flex items-center">
                    Average
                    {sortConfig.key === 'average' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('strike_rate')}
                >
                  <div className="flex items-center">
                    Strike Rate
                    {sortConfig.key === 'strike_rate' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('current_average')}
                >
                  <div className="flex items-center">
                    Current Form Avg
                    {sortConfig.key === 'current_average' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('current_strike_rate')}
                >
                  <div className="flex items-center">
                    Current Form SR
                    {sortConfig.key === 'current_strike_rate' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('no_match_on_ground')}
                >
                  <div className="flex items-center">
                    Matches at Venue
                    {sortConfig.key === 'no_match_on_ground' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                      </span>
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(activeTab === 'all' ? filteredPlayers : selectedPlayers).map((player, index) => (
                <tr key={index} className={selectedPlayers.some(p => p.player === player.player) ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <input 
                      type="checkbox" 
                      checked={selectedPlayers.some(p => p.player === player.player)}
                      onChange={() => togglePlayerSelection(player)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{player.player}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {player.average.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {player.strike_rate.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      player.current_average > player.average ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {player.current_average.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      player.current_strike_rate > player.strike_rate ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {player.current_strike_rate.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {player.no_match_on_ground}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center p-4 mt-8">
        <p className="text-sm text-gray-600">
          Cricket Analytics Dashboard - Player Statistics and Team Selection Tool
        </p>
      </footer>
    </div>
  );
};

