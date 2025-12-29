'use client';

interface BingoProps {
  gameData?: string;
}

export default function Bingo({ gameData }: BingoProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-white mb-8">Świąteczne Bingo</h1>
      <p className="text-xl text-white">Plansza...</p>
    </div>
  );
}
