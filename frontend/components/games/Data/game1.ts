import { Song } from '@/types';

// UWAGA: Aby dodać nową piosenkę:
// 1. Dodaj nowy obiekt do tablicy songs
// 2. Podaj tytuł w polu 'title'
// 3. Podaj tekst w polu 'data' - każdy element tablicy to jedna linia
// 4. Słowa mogą być bez polskich znaków (świeta -> swieta) - gra akceptuje oba warianty
// 5. Dodaj odpowiedni plik MP3 do folderu public/ o takiej samej nazwie jak w polu 'audioFile'
// 6. Ustaw czas gry (w sekundach) w polu 'duration'

export interface SongConfig {
  title: string;
  data: string[];
  audioFile: string;  // Nazwa pliku MP3 w folderze public/
  duration: number;   // Czas gry w sekundach (domyślnie 60)
}

export const songs: SongConfig[] = [
  {
    title: 'Cicha Noc',
    data: [
      'Cicha noc swieta noc pokoj niesie ludziom wszem',
      'a u zlobka Matka Swieta czuwa sama usmiechnieta',
      'nad Dzieciatka snem nad Dzieciatka snem',
    ],
    audioFile: '/cicha_noc.mp3',
    duration: 60,
  },
  {
    title: 'Wśród nocnej ciszy',
    data: [
      'Wsrod nocnej ciszy glos sie rozchodzi',
      'Wstancie pasterze Bog sie wam rodzi',
      'Czym predzej sie wybierajcie do Betlejem pospieszajcie',
      'przywitan Pana przywitan Pana',
    ],
    audioFile: '/wsrod_nocnej_ciszy.mp3',
    duration: 60,
  },
  {
    title: 'Bóg się rodzi',
    data: [
      'Bog sie rodzi moc truchleje Pan niebiosow obnazon',
      'Ogien krzepnie blask ciemnieje ma granice nieskonczon',
      'Wzgardzony okniety chwala smiertelny Krol nad wiekami',
      'A Slowo cialo sie stalo i mieszkalo miedzy nami',
    ],
    audioFile: '/bog_sie_rodzi.mp3',
    duration: 90,
  },
  {
    title: 'Lulajże Jezuniu',
    data: [
      'Lulajze Jezuniu moja perelko',
      'Lulaj ulubione me pieszczidelko',
      'Lulajze Jezuniu lulajze lulaj',
      'A Ty Go Matulu w plaszczyk otulaj',
    ],
    audioFile: '/lulajze_jezuniu.mp3',
    duration: 45,
  },
  {
    title: 'Przybieżeli do Betlejem',
    data: [
      'Przybiezeli do Betlejem pasterze',
      'Graja skocznie Dzieciateczku na lirze',
      'Chwala na wysokosci chwala na wysokosci',
      'a pokoj na ziemi',
    ],
    audioFile: '/przybiezeli_do_betlejem.mp3',
    duration: 45,
  },
  {
    title: 'Do szopy hej pasterze',
    data: [
      'Do szopy hej pasterze hej',
      'Do szopy bo tam cud',
      'Bog sie narodzil nam zbawiciel nam',
      'Chrystus Zbawiciel nam',
    ],
    audioFile: '/do_szopy.mp3',
    duration: 45,
  },
];

// Eksport dla kompatybilności wstecznej
export { songs as default };
