'use client';

import { useState, useEffect } from 'react';
import { Player, AudioSource } from '@/types';

const useMultiAudio = (urls: string[]) => {
  const [sources, setSources] = useState<AudioSource[]>([]);
  const [players, setPlayers] = useState<Player[]>(
    urls.map((url) => ({
      url,
      playing: false,
    }))
  );

  useEffect(() => {
    // Create audio objects only on client side
    const newSources = urls.map((url) => ({
      url,
      audio: new Audio(url),
    }));
    setSources(newSources);

    return () => {
      newSources.forEach((source) => {
        source.audio.pause();
        source.audio.src = '';
      });
    };
  }, []);

  const toggle = (targetIndex: number) => () => {
    const newPlayers = [...players];
    const currentIndex = players.findIndex((p) => p.playing === true);
    if (currentIndex !== -1 && currentIndex !== targetIndex) {
      newPlayers[currentIndex].playing = false;
      newPlayers[targetIndex].playing = true;
    } else if (currentIndex !== -1) {
      newPlayers[targetIndex].playing = false;
    } else {
      newPlayers[targetIndex].playing = true;
    }
    setPlayers(newPlayers);
  };

  useEffect(() => {
    sources.forEach((source, i) => {
      if (players[i]?.playing) {
        source.audio.play();
      } else {
        source.audio.pause();
      }
    });
  }, [sources, players]);

  useEffect(() => {
    const handleEnded = (i: number) => () => {
      setPlayers((prev) => {
        const newPlayers = [...prev];
        newPlayers[i].playing = false;
        return newPlayers;
      });
    };

    sources.forEach((source, i) => {
      source.audio.addEventListener('ended', handleEnded(i));
    });

    return () => {
      sources.forEach((source, i) => {
        source.audio.removeEventListener('ended', handleEnded(i));
      });
    };
  }, [sources]);

  return [players, toggle] as const;
};

interface PlayerButtonProps {
  player: Player;
  toggle: () => void;
}

function PlayerButton({ player, toggle }: PlayerButtonProps) {
  return (
    <div>
      <button className="btn btn-circle" onClick={toggle}>
        {player.playing ? '🔊' : '🔈'}
      </button>
    </div>
  );
}

interface MusicPlayerProps {
  urls: string[];
}

export default function MusicPlayer({ urls }: MusicPlayerProps) {
  const [players, toggle] = useMultiAudio(urls);

  return (
    <div>
      {players.map((player, i) => (
        <PlayerButton key={i} player={player} toggle={toggle(i)} />
      ))}
    </div>
  );
}
