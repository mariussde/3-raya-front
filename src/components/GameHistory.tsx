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
    } catch (_) {
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
    return <p className="text-red-500 text-sm">{error}</p>;
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Last 10 Games</h2>
      <div className="space-y-2">
        {games.map((game) => (
          <div
            key={game._id}
            className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
          >
            <span className="font-medium">{getStatusText(game.status)}</span>
            <span className="text-sm text-gray-500">
              {formatTime(game.createdAt)}
            </span>
          </div>
        ))}
        {games.length === 0 && (
          <p className="text-center text-gray-500">No games played yet</p>
        )}
      </div>
    </div>
  );
}; 
