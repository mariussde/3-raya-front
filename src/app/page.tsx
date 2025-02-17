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
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-lg">Loading game...</p>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen p-4">
      <div className="hidden md:block absolute top-4 right-4">
        <GameHistory key={`desktop-${historyKey}`} />
      </div>
      
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-md space-y-8">
          <h1 className="text-center text-4xl font-bold">3 en raya</h1>

          <GameStatus game={game} />

          <GameBoard board={game.board} onCellClick={handleCellClick} />

          <div className="flex justify-center">
            <Button onClick={createGame} className="mt-4">
              New Game
            </Button>
          </div>

          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
          <div className="md:hidden mt-8 flex justify-center">
            <GameHistory key={`mobile-${historyKey}`} />
          </div>
        </div>
      </div>
    </main>
  );
}
