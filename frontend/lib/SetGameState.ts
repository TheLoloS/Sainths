'use client';

const asyncLocalStorage = {
  setItem: async function (key: string, value: string): Promise<void> {
    await null;
    return localStorage.setItem(key, value);
  },
  getItem: async function (key: string): Promise<unknown> {
    await null;
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
};

async function get(name: string): Promise<unknown> {
  try {
    return await asyncLocalStorage.getItem(name);
  } catch (error) {
    console.error('Error with GET gameState: ' + error);
    return null;
  }
}

function set(name: string, value: string): void {
  asyncLocalStorage.setItem(name, value).catch((error) => {
    console.error('Error with SAVE gameState: ' + error);
  });
}

async function SetGameState(
  type: 'set' | 'get',
  name: string,
  value?: string
): Promise<unknown> {
  switch (type) {
    case 'set':
      if (value !== undefined) {
        set(name, value);
      }
      break;
    case 'get':
      return get(name);
    default:
      console.warn('Something went wrong');
      return localStorage.getItem('gameState');
  }
}

export default SetGameState;
