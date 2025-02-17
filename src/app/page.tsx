'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { GameBoard } from '@/components/GameBoard';
import { GameStatus } from '@/components/GameStatus';
import { Button } from '@/components/ui/Button';
import { GameHistory } from '@/components/GameHistory';

interface Game {
  _id: string;
  board: string[][];
  currentPlayer: string;
  status: string;
}

export default function Home() {
  const [game, setGame] = useState<Game | null>(null);
  const [error, setError] = useState<string>('');
  const [historyKey, setHistoryKey] = useState(0);

  const createGame = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/game`);
      setGame(response.data);
      setError('');
      setHistoryKey((prev) => prev + 1);
    } catch {
      setError('Failed to create game');
    }
  };

  const handleCellClick = async (row: number, col: number) => {
    if (!game || game.status !== 'IN_PROGRESS' || game.currentPlayer !== 'X') {
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/game/${game._id}/move`,
        {
          row,
          col,
        },
      );
      setGame(response.data);
      if (response.data.status !== 'IN_PROGRESS') {
        setHistoryKey((prev) => prev + 1);
      }
      setError('');
    } catch {
      setError('Failed to make move');
    }
  };

  useEffect(() => {
    createGame();
  }, []);

  if (!game) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800">
        <div className="text-center text-white">
          <p className="mb-4 text-lg">Loading game...</p>
          {error && <p className="text-red-300">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen p-4 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 overflow-hidden">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGM0LjQxOCAwIDgtMy41ODIgOC04cy0zLjU4Mi04LTgtOC04IDMuNTgyLTggOCAzLjU4MiA4IDggOHoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-10" />
      
      <div className="hidden md:block absolute top-4 left-4 z-10">
        <GameHistory key={`desktop-${historyKey}`} />
      </div>
      
      <div className="flex flex-col items-center justify-center min-h-screen relative z-10">
        <div className="w-full max-w-md space-y-8">
          <h1 className="text-center text-4xl font-bold text-white">3 en raya</h1>

          <GameStatus game={game} />

          <GameBoard board={game.board} onCellClick={handleCellClick} />

          <div className="flex justify-center">
            <Button onClick={createGame} className="mt-4">
              New Game
            </Button>
          </div>

          {error && <p className="mt-4 text-center text-red-300">{error}</p>}
          <div className="md:hidden mt-8 flex justify-center">
            <GameHistory key={`mobile-${historyKey}`} />
          </div>
        </div>
      </div>
    </main>
  );
}
