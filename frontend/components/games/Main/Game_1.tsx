'use client';

import TabList from '@/components/game/TabList';
import CountdownTimer from '../Timer/timer';

interface FirstGameProps {
  gameData?: string;
}

export default function FirstGame({ gameData }: FirstGameProps) {
  return (
    <>
      <div className="w-screen h-screen flex justify-end items-start align-top absolute">
        <div className="flex m-4 justify-end align-top absolute">
          <table className="table w-full bg-base-300 absolute">
            <thead>
              <tr className="bg-base-300">
                <th className="text-center whitespace-normal">Nazwa</th>
                <th className="text-center whitespace-normal">Punktacja Ogólna</th>
                <th className="text-center whitespace-normal">Punktacja Aktualna</th>
              </tr>
            </thead>
            <tbody>
              <TabList />
            </tbody>
          </table>
          <br />
        </div>
      </div>
      <div className="w-screen h-screen flex justify-center items-center relative flex-col">
        <div className="absolute top-0 left-0 text-white text-2xl">
          <div className="flex justify-center items-center flex-col">
            <p>Cicha noc</p>
            <audio controls>
              <source src="/cicha_noc.mp3" type="audio/mp3" />
              Twoja przeglądarka nie obsługuje tagu audio.
            </audio>
          </div>
        </div>
        <div className="absolute top-0 left-32 text-white text-2xl"></div>
        <div className="world-list h-3/5 flex flex-row flex-wrap justify-center items-start content-around w-2/4">
          <div className="bg-white w-80 h-40 rounded-lg shadow flex justify-center items-center">
            <p className="text-xl font-semibold">
              <CountdownTimer initialTimeInMinutes={1} />
            </p>
          </div>
        </div>
        <br />
      </div>
    </>
  );
}
