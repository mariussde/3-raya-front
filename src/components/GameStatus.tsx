interface Game {
    currentPlayer: string;
    status: string;
  }
  
  interface GameStatusProps {
    game: Game;
  }
  
  export function GameStatus({ game }: GameStatusProps) {
    const getStatusMessage = () => {
      switch (game.status) {
        case 'IN_PROGRESS':
          return `Current player: ${game.currentPlayer}`;
        case 'X_WON':
          return 'Player X won!';
        case 'O_WON':
          return 'Player O won!';
        case 'DRAW':
          return 'Game ended in a draw!';
        default:
          return 'Unknown game status';
      }
    };
  
    return (
      <div className="text-center">
        <p className="text-xl font-semibold">{getStatusMessage()}</p>
      </div>
    );
  }
  