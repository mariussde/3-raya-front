import { useEffect, useState } from 'react';
import axios from 'axios';

interface HistoryGame {
  _id: string;
  status: string;
  createdAt: string;
}

export const GameHistory = () => {
  const [games, setGames] = useState<HistoryGame[]>([]);
  const [error, setError] = useState('');

  const fetchGameHistory = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/game/history?limit=10`,
      );
      setGames(response.data);
      setError('');
    } catch {
      setError('Failed to fetch game history');
    }
  };

  useEffect(() => {
    fetchGameHistory();
  }, []);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'X_WON':
        return 'Player X Won';
      case 'O_WON':
        return 'AI Won';
      case 'DRAW':
        return 'Draw';
      default:
        return 'Unfinished';
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  if (error) {
    return <p className="text-red-500 text-xs">{error}</p>;
  }

  return (
    <div className="w-full max-w-[250px] bg-white dark:bg-gray-900 rounded-lg shadow-lg p-3">
      <h2 className="text-sm font-semibold mb-2">Last Games</h2>
      <div className="space-y-1">
        {games.map((game) => (
          <div
            key={game._id}
            className="flex justify-between items-center py-1 px-2 bg-gray-50 dark:bg-gray-800 rounded text-xs"
          >
            <span>{getStatusText(game.status)}</span>
            <span className="text-gray-500 ml-3">
              {formatTime(game.createdAt)}
            </span>
          </div>
        ))}
        {games.length === 0 && (
          <p className="text-center text-gray-500 text-xs">No games yet</p>
        )}
      </div>
    </div>
  );
}; 
