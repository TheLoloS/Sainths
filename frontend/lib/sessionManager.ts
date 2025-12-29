'use client';

export interface SessionData {
  gameId: string;
  login: string;
  isHost: boolean;
  timestamp: number;
}

const SESSION_KEY = 'sainths_session';
const SESSION_EXPIRY = 24 * 60 * 60 * 1000; // 24 godziny

export function saveSession(data: Omit<SessionData, 'timestamp'>): void {
  if (typeof window === 'undefined') return;
  
  const session: SessionData = {
    ...data,
    timestamp: Date.now(),
  };
  
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  console.log('Sesja zapisana:', session);
}

export function getSession(): SessionData | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return null;
    
    const session: SessionData = JSON.parse(stored);
    
    // Sprawdź czy sesja nie wygasła
    if (Date.now() - session.timestamp > SESSION_EXPIRY) {
      console.log('Sesja wygasła');
      clearSession();
      return null;
    }
    
    return session;
  } catch (error) {
    console.error('Błąd odczytu sesji:', error);
    return null;
  }
}

export function clearSession(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem('gameData');
  localStorage.removeItem('login');
  console.log('Sesja wyczyszczona');
}

export function hasValidSession(): boolean {
  return getSession() !== null;
}

export function updateSessionTimestamp(): void {
  const session = getSession();
  if (session) {
    saveSession({
      gameId: session.gameId,
      login: session.login,
      isHost: session.isHost,
    });
  }
}
