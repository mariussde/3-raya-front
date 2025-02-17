interface GameBoardProps {
    board: string[][];
    onCellClick: (row: number, col: number) => void;
  }
  
  export function GameBoard({ board, onCellClick }: GameBoardProps) {
    return (
      <div className="grid grid-cols-3 gap-2 aspect-square w-full max-w-sm mx-auto">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              onClick={() => onCellClick(rowIndex, colIndex)}
              className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-4xl font-bold rounded-lg aspect-square transition-colors"
              disabled={cell !== ''}
              aria-label={`Cell ${rowIndex}-${colIndex}`}
            >
              {cell}
            </button>
          )),
        )}
      </div>
    );
  }
  