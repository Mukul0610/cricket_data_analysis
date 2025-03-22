
"use client"

import React, { useState, useMemo } from 'react';
import { Filter, Users, TrendingDown, Target, RefreshCw } from 'lucide-react';

interface Player {
  player: string;
  bowler_ecoeconomy: number;
  average_wickets: number;
  no_match_on_ground: number;
  current_bowler_ecoeconomy: number;
  current_average_wickets: number;
  latest_match_no: number;
}

interface SortConfig {
  key: keyof Player | null;
  direction: 'ascending' | 'descending';
}

interface Props {
  initialData: Player[];
}

export function BowlerStatsDisplay({ initialData }: Props) {
  const players = initialData;
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterConfig, setFilterConfig] = useState({
    maxEconomy: 12,
    minAverageWickets: 0,
    minMatches: 0
  });
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const requestSort = (key: keyof Player) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedPlayers = useMemo(() => {
    const sortableItems = [...players];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const aVal = a[sortConfig.key as keyof Player];
        const bVal = b[sortConfig.key as keyof Player];
        
        if (sortConfig.key === 'bowler_ecoeconomy' || sortConfig.key === 'current_bowler_ecoeconomy') {
          if (aVal < bVal) return sortConfig.direction === 'ascending' ? -1 : 1;
          if (aVal > bVal) return sortConfig.direction === 'ascending' ? 1 : -1;
          return 0;
        }
        
        if (aVal < bVal) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [players, sortConfig]);

  const filteredPlayers = useMemo(() => {
    return sortedPlayers.filter(player => {
      if (!player || !player.player) return false;
      
      const matchesSearch = player.player.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilters = 
        player.bowler_ecoeconomy <= filterConfig.maxEconomy &&
        player.average_wickets >= filterConfig.minAverageWickets &&
        player.no_match_on_ground >= filterConfig.minMatches;
      
      return matchesSearch && matchesFilters;
    });
  }, [sortedPlayers, searchTerm, filterConfig]);

  const togglePlayerSelection = (player: Player) => {
    if (selectedPlayers.some(p => p.player === player.player)) {
      setSelectedPlayers(selectedPlayers.filter(p => p.player !== player.player));
    } else if (selectedPlayers.length < 11) {
      setSelectedPlayers([...selectedPlayers, player]);
    } else {
      alert("You can only select 11 players for your team!");
    }
  };

  const autoSelectBestEleven = () => {
    const scoredPlayers = [...players].map(player => ({
      ...player,
      formScore: (player.current_average_wickets * 0.6) + ((12 - player.current_bowler_ecoeconomy) * 0.4)
    }));
    scoredPlayers.sort((a, b) => b.formScore - a.formScore);
    setSelectedPlayers(scoredPlayers.slice(0, 11));
  };

  const resetFilters = () => {
    setFilterConfig({
      maxEconomy: 12,
      minAverageWickets: 0,
      minMatches: 0
    });
    setSearchTerm('');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Target className="text-green-600 h-6 w-6" />
          <h2 className="text-2xl font-bold text-gray-800">Bowling Analysis</h2>
        </div>
        <div className="flex space-x-2">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            {selectedPlayers.length} Selected
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Average Economy</p>
              <p className="text-2xl font-bold text-green-900">
                {(filteredPlayers.reduce((acc, player) => acc + player.bowler_ecoeconomy, 0) / filteredPlayers.length).toFixed(2)}
              </p>
            </div>
            <TrendingDown className="text-green-500 h-8 w-8" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600">Average Wickets</p>
              <p className="text-2xl font-bold text-purple-900">
                {(filteredPlayers.reduce((acc, player) => acc + player.average_wickets, 0) / filteredPlayers.length).toFixed(2)}
              </p>
            </div>
            <Target className="text-purple-500 h-8 w-8" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">Total Bowlers</p>
              <p className="text-2xl font-bold text-blue-900">{filteredPlayers.length}</p>
            </div>
            <Users className="text-blue-500 h-8 w-8" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="w-full md:w-1/3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search bowlers..."
              className="w-full p-2 pl-8 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-2 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-700 transition-colors"
          >
            <Filter size={16} />
            Filters
          </button>
          
          <button 
            onClick={autoSelectBestEleven}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white transition-colors"
          >
            <Users size={16} />
            Auto-Select Best 11 Bowlers
          </button>
          
          <button 
            onClick={() => setSelectedPlayers([])}
            className="flex items-center gap-2 bg-red-100 hover:bg-red-200 px-4 py-2 rounded-lg text-red-700 transition-colors"
          >
            <RefreshCw size={16} />
            Clear Selection
          </button>
        </div>
      </div>
      
      {showFilters && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Economy Rate</label>
              <input
                type="range"
                min="0"
                max="12"
                step="0.1"
                value={filterConfig.maxEconomy}
                onChange={(e) => setFilterConfig({...filterConfig, maxEconomy: Number(e.target.value)})}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0</span>
                <span>{filterConfig.maxEconomy.toFixed(1)}</span>
                <span>12</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Average Wickets</label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={filterConfig.minAverageWickets}
                onChange={(e) => setFilterConfig({...filterConfig, minAverageWickets: Number(e.target.value)})}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0</span>
                <span>{filterConfig.minAverageWickets.toFixed(1)}</span>
                <span>5</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Matches at Venue</label>
              <input
                type="range"
                min="0"
                max="50"
                value={filterConfig.minMatches}
                onChange={(e) => setFilterConfig({...filterConfig,  minMatches: Number(e.target.value)})}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0</span>
                <span>{filterConfig.minMatches}</span>
                <span>50</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={resetFilters}
            className="mt-4 text-sm text-green-600 hover:text-green-800 font-medium"
          >
            Reset Filters
          </button>
        </div>
      )}
      
      <div className="flex border-b border-gray-200 mb-6">
        <button 
          className={`px-6 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'all' 
              ? 'text-green-600 border-green-600' 
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('all')}
        >
          All Bowlers
        </button>
        <button 
          className={`px-6 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'selected' 
              ? 'text-green-600 border-green-600' 
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('selected')}
        >
          Selected Bowler ({selectedPlayers.length})
        </button>
      </div>
      
      <div className="overflow-x-auto">
      <div className="text-sm text-gray-500 mb-4 bg-yellow-100 p-2 rounded-lg">
          <p>You can Click on a column heading to sort the table by that column</p>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Select
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('player')}
              >
                <div className="flex items-center">
                  Player
                  {sortConfig.key === 'player' && (
                    <span className="ml-1">{sortConfig.direction === 'ascending' ? '▲' : '▼'}</span>
                  )}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('average_wickets')}
              >
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <span>Avg Wickets</span>
                    <span className="text-[10px] font-normal normal-case">(on Venue)</span>
                  </div>
                  {sortConfig.key === 'average_wickets' && (
                    <span className="ml-1">{sortConfig.direction === 'ascending' ? '▲' : '▼'}</span>
                  )}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('bowler_ecoeconomy')}
              >
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <span>Economy</span>
                    <span className="text-[10px] font-normal normal-case">(on Venue)</span>
                  </div>
                  {sortConfig.key === 'bowler_ecoeconomy' && (
                    <span className="ml-1">{sortConfig.direction === 'ascending' ? '▼' : '▲'}</span>
                  )}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('current_average_wickets')}
              >
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <span>Current Wickets</span>
                    <span className="text-[10px] font-normal normal-case">(last 7 games)</span>
                  </div>
                  {sortConfig.key === 'current_average_wickets' && (
                    <span className="ml-1">{sortConfig.direction === 'ascending' ? '▲' : '▼'}</span>
                  )}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('current_bowler_ecoeconomy')}
              >
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <span>Current Economy</span>
                    <span className="text-[10px] font-normal normal-case">(last 7 games)</span>
                  </div>
                  {sortConfig.key === 'current_bowler_ecoeconomy' && (
                    <span className="ml-1">{sortConfig.direction === 'ascending' ? '▼' : '▲'}</span>
                  )}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('no_match_on_ground')}
              >
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <span>Matches</span>
                    <span className="text-[10px] font-normal normal-case">(on Venue)</span>
                  </div>
                  {sortConfig.key === 'no_match_on_ground' && (
                    <span className="ml-1">{sortConfig.direction === 'ascending' ? '▲' : '▼'}</span>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(activeTab === 'all' ? filteredPlayers : selectedPlayers).map((player, index) => (
              <tr 
                key={index} 
                className={`
                  ${selectedPlayers.some(p => p.player === player.player) ? 'bg-green-50' : 'hover:bg-gray-50'}
                  transition-colors
                `}
              >
                <td className="px-4 py-3">
                  <input 
                    type="checkbox" 
                    checked={selectedPlayers.some(p => p.player === player.player)}
                    onChange={() => togglePlayerSelection(player)}
                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{player.player}</div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {player.average_wickets != null ? player.average_wickets.toFixed(2) : 'N/A'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {player.bowler_ecoeconomy != null ? player.bowler_ecoeconomy.toFixed(2) : 'N/A'}
                </td>
                <td className="px-4 py-3">
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${player.current_average_wickets > player.average_wickets 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'}
                  `}>
                    {player.current_average_wickets != null ? player.current_average_wickets.toFixed(2) : 'N/A'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${player.current_bowler_ecoeconomy < player.bowler_ecoeconomy 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'}
                  `}>
                    {player.current_bowler_ecoeconomy != null ? player.current_bowler_ecoeconomy.toFixed(2) : 'N/A'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {player.no_match_on_ground}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}