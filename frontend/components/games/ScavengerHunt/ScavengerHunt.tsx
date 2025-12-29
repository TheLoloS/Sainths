'use client';

interface ScavengerHuntProps {
  gameData?: string;
}

export default function ScavengerHunt({ gameData }: ScavengerHuntProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-white mb-8">Poszukiwacze Skarbów</h1>
      <p className="text-xl text-white">Znajdź coś czerwonego!</p>
    </div>
  );
}
