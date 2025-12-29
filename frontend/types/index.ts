export interface User {
  login: string;
  points: number;
}

export interface GameData {
  id?: string;
  roomStage?: number;
  users?: User[];
  gameType?: string;
}

export interface AlertData {
  type: string;
  data: string;
}

export interface SocketMessage {
  type: 'error' | 'info' | 'succes';
  title: string;
  value: string;
}

export interface Player {
  url: string;
  playing: boolean;
}

export interface AudioSource {
  url: string;
  audio: HTMLAudioElement;
}

export interface Question {
  question: string;
  answers: string[];
  correct: number;
}

export interface Song {
  title: string;
  data: string[];
}
