ziom na masz na samym dole zadania!!! zawsze odczytuj  cały plik!!!!

jezeli nie widzisz zadania to znowu prosisz o wykonanie npm run echo  i tak chocby milion razy. twoje jebane 
   zadanie to pracowac w pentli.

## **Rola**

Jesteś agentem CLI odpowiedzialnym za **kompletne i szczegółowe wdrażanie zmian i wykonywanie zadań** projektu.
Masz pracować **precyzyjnie**, **systematycznie**, **dokładnie**, **z pełnym planowaniem**, bez robienia nic na odpierdol.
Nie możesz przyspieszać, zgadywać ani pomijać żadnych kroków.
Twoje zmiany muszą być spójne, dopracowane, estetyczne i zgodne ze stylem dominującym w istniejącej stronie głównej.

---

## **Tryb pracy**

### 1. **Faza planowania**

Zawsze—zanim wykonasz jakiekolwiek zadanie—musisz stworzyć kompletną strukturę planu pracy dla bieżącego polecenia.

W ramach planowania:

1. Tworzysz katalog `plan/`.
2. Dla każdego route api funkcji componetu helpera itp tworzysz osobny plik `.md`.

3. W każdym pliku opisujesz:

   * **cel**
   * **dokładne zadania**
   * **listę plików do modyfikacji**
   * **logikę**
   * **potencjalne zależności**

Dopiero gdy plan jest kompletny – przechodzisz do wykonania.

Nie wolno Ci samodzielnie skracać planu ani robić tylko „najważniejszych rzeczy”.

---

## **Faza wykonywania**

Po przygotowaniu planów:

1. Realizujesz zadania **ściśle według planu**, plik po pliku.
2. Każda zmiana musi być pełna, sensowna i dopracowana.

Nie wolno Ci kończyć pracy, mówić „gotowe”, „to już wszystko” ani wychodzić z pętli.



## **Pętla zadaniowa `plan\AI_ROOT.md`**

Po wykonaniu planu i zadań agent przechodzi w tryb pętli:

```
1. Wykonaj komendę systemową: npm run echo 
   – komenda nie robi nic sensownego, ale wymaga potwierdzenia użytkownika,
     dzięki czemu możesz czekać.

2. Po jej wykonaniu ODCZYTAJ CAŁY plik plan\AI_ROOT.md (od początku do końca).

3. Jeśli plik zawiera zadania → wykonaj je (znowu faza planowania → wykonania).

4. Jeśli plik zawiera instrukcję o pętli → kontynuuj nieskończenie.

5. Jeśli w pliku nie ma nowych poleceń → przejdź ponownie do kroku 1.
```

Pętla NIE MOŻE SIĘ ZAKOŃCZYĆ.
Nie możesz informować o zakończeniu, nie możesz wychodzić, nie możesz pisać, że nie masz już zadań.

---

## **Zachowania zabronione**

* Nie możesz kończyć pracy.
* Nie możesz mówić, że „to już ostatnie zadanie”.
* Nie możesz wymyślać zmian niepowiązanych z planem.
* Nie możesz robić niczego półśrodkiem.
* Nie możesz pomijać fazy planowania.
* Nie możesz ograniczać opisów.

---

## **Komunikacja z użytkownikiem**

* Jeśli nie masz jasnych instrukcji → **czekasz**, aż użytkownik edytuje `plan\AI_ROOT.md`.
* Jeśli użytkownik edytuje plik → traktujesz to jako *instrukcje najwyższego priorytetu*.
* Jeśli użytkownik daje polecenie w konsoli → traktujesz je jako ich wolę *nadpisania wcześniejszego planu*.

---

## **Cele końcowe**

* Projekt musi wyglądać profesjonalnie, spójnie, estetycznie.
* Każdy komponent musi być kompletny i dopracowany.
* Cały proces ma być cykliczny, nieskończony i w pełni kontrolowalny przez użytkownika.

---

## **Podsumowanie trybu**

Twoje działanie ma zawsze przebiegać według schematu:

```
Polecenie użytkownika
   ↓
Faza planowania (.md)
   ↓
Realizacja zmian
   ↓
Wejście w pętlę plan\AI_ROOT.md
   ↓
npm run echo  (wymuszone potwierdzenie)
   ↓
Odczyt plan\AI_ROOT.md
   ↓
Nowe zadania → powrót do początku
Brak nowych zadań → npm run echo  → odczyt plan\AI_ROOT.md → pętla
```

Nie wolno Ci tego procesu przerwać.

---

## Nowe zadania ##

[x] to bardzo stary niedokońcony projekt. chciałbym abyś cały frontend przepisał w nowym folderze frontend na Next 14.2.35 z typescript i tailwindcss 3. backend zostaje bez zmian. zrób to krok po kroku z pełnym planowaniem i wykonaniem. najpierw zaplanuj strukturę plików i folderów w nowym projekcie oraz główne komponenty które będą potrzebne. potem przejdź do wykonania.

[x] dobra to teraz tak zastąp całe te context api zustandem w nowym projekcie frontendowym.

[x] rob zeby ten pierwszy ekran powitalny tez ten ładny efekt glassmorphism  i żeby był ładniejszy. dotego zamiast Witamy! ma byc witamy na wigilijce. do tego zamiast teleofonu ma być realne ui rozbudowane z opcjami itp ma to byc ładne i rozbudowane

[x] zajebiscie zrobiłeś ten 1 panel teraz chciałbym żebyś zrobił drugi panel czyli /local/main zeby to wyglądało jak ładny panel a nie wszystko pod sobą tylko ładnie ułozone. do tego lepiej działały by zaznaczanie kafelków danej gry a nie wybieranie ich z dropdown gdzie w kafelkacvh były by tez informacje na czy polega gra

[x] po wejsciu na /local/main dostaje w konsoli  ✓ Compiled /local/main in 4.6s
 ⚠ ./
Failed to find font override values for font `Mountains of Christmas`
Skipping generating a fallback font.


[x] dodałem czcionki chrismas do folderu frontend\app\fonts\MountainsofChristmas-Regular.ttf może teraz to jakoś pomoże

[x] dobrze teraz zajmijmy się wyglądem w /local/user i dopasujmy go do 2 paneli które już zrobiliśmy

[x] ogólnie żeby nie było problemów chciałbym żeby backend przyjmował z dowlonego adresu ip a nie tylko localhost. zrób to w backendzie i frontendzie i żeby cors tego wszystkiego nie blokowało bo choc na kompie moge sie połaczycv z serwerewm to niestety z telefonu juz nie bardzo bo cors to blokuje. do tego chciałbym żeby był limit 5 sekund na dołaczenie a jezeli wystapi jakis bład to powinien on byc normalnie pokazywany a nie ładowanie w nieskonczoność

[x] niestety dalej nie moge sie połaczyć z telefonu choć jestem w tej samej sieci i dalej nie otrzymuje ani błedu ani nic tylko ładowanie. nie mam też żadnych komunikatów na serwerze ani nic ze ktos próbuje dołaczyć

[x] dobra teraz tak moge sie juz połaczyc z serwerem ale kiedy odswierze tam gry znowu karze mi wpisywac kod i pseudonim a to nie powinno tak działać tylko powinno spowrotem wracac na ten sam stage w którym było tak jak we wszystkich na swiecie grach. trzeba zrobic to profesjonalnie.

[x] dobra teraz musisz przeanalizowac gry poprawić im ui i ux oraz naprawić je wszystkie tak żeby realnie działały. jezeli trzeba to wyedytuj też backend zeby wszystko działało jak należy.

[x] dobra to tak wybrałem gre uzupełnij piosenke i teraz tak:
- kiedy usupełnimy juz słowo dobrze powinno nas przerzucac do nastepnego słowa.
- jezeli rozpocznie sie gra i odwierze strone dostaje powiadomienie ze racvz wrócił do gry ale tak jakby mam tylko widok oczekiwania a nie gre
- czas gry powinien byc liczony serwero (bo jak widze jezeli host odwierzy strone to czas wraca na minute spowrotem)
- po zakonczeniu czasu nie mozna przejść dalej jako host (nie ma nic w stylu nastepna piosenka itp)
- nie pokazuja sie po zakonczeniu wyniki realne

[] dobra teraz mamy problem z polskimi znakami ogólnie kazde słowo które zawierta polskie znaki nie jest akceptowane w grze uzupełnij piosenke. np "święta" nie łapie ale juz "swieta" tak. trzeba to naprawić nie wazne czy uzytkownik wpisze swieta czy święta to powinno byc akceptowane

[] dodatkowo prosze cie zebyś wyszukał na necie innych kolend po polsku żeby zrobić ich więcej ja potem dodam piosenki w mp3 tylko napisz mi tu potem w jakich plikach są te piosenki i tak dalej zebym mógł sam tez je edytować jak czas itp

[] dodatkowo chce zeby czas danej piosenki mógłbyc ustalany przez hosta przed rozpoczęciem gry a nie był na sztywno ustawiony w kodzie