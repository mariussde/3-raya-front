'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { GameBoard } from '@/components/GameBoard';
import { GameStatus } from '@/components/GameStatus';
import { Button } from '@/components/ui/Button';

interface Game {
  _id: string;
  board: string[][];
  currentPlayer: string;
  status: string;
}

export default function Home() {
  const [game, setGame] = useState<Game | null>(null);
  const [error, setError] = useState<string>('');

  const createGame = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/game`);
      setGame(response.data);
      setError('');
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
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-center text-4xl font-bold">Tic Tac Toe</h1>

        <GameStatus game={game} />

        <GameBoard board={game.board} onCellClick={handleCellClick} />

        <div className="flex justify-center">
          <Button onClick={createGame} className="mt-4">
            New Game
          </Button>
        </div>

        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>
    </main>
  );
}
