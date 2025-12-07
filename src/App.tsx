import { useRef, useState, useEffect } from "react";
import "./App.css";

function App() {
  //=====CREATE CALENDAR FIELDS
  const fields = Array.from({ length: 24 }, (_, i) => i + 1);

  //===== STATES
  const [openField, setOpenField] = useState<number | null>(null);
  const [openedDoor, setOpenedDoor] = useState<Record<number, boolean>>({});

  //===== REFS
  const dialogRef = useRef<HTMLDialogElement>(null);

  //===== EFFECT: Load state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("openedDoor");
    if (saved) {
      try {
        setOpenedDoor(JSON.parse(saved));
      } catch {
        console.error("LocalStorage parse error");
      }
    }
  }, []);

  //===== EFFECT: Save state to localStorage
  useEffect(() => {
    localStorage.setItem("openedDoor", JSON.stringify(openedDoor));
  }, [openedDoor]);

  //=====DIALOG HANDLING
  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  //=====CONTENT FOR EACH DOOR
  //as object
  const dialogContent: Record<number, React.ReactNode> = {
    1: (
      <>
        <h2>Butterbun Rezept:</h2>
        <p>…</p>
      </>
    ),
    2: (
      <>
        <a href="https://www.youtube.com/shorts/hL2d6MEBi60">
          Ein Blick in die Zukunft …
        </a>
      </>
    ),
    3: (
      <>
        <p>Wer feiern kann, muss auch snacken können 😄</p>
      </>
    ),
    4: (<>
      <a href="https://www.youtube.com/watch?v=megL8G-W0Uo">Klicke hier, um zu erfahren, was Spaß macht!</a>
    </>),
    5: (<>
      <a href="https://www.youtube.com/watch?v=ZjqNymQYq_g">Der Meme-Horizont muss stetig erweitert werden!</a>
    </>),
    6: (<>
      <p>
        Auch wenn die Schuhe nicht geputzt sind, kommt der Nikolaus trotzdem gerne vorbei!
      </p>
      <img src="/xmas_calendar/media/nicolaus.jpg" alt="nicolaus" style={{ maxWidth: "70%" }} />
    </>),
    7: (<>
      <ul>
        <li><b>"Ich liebe dich" auf thailändisch:</b></li>
        <li>ฉันรักคุณ: <b>chǎn rák khun</b>, wenn eine Frau spricht</li>
        <li>ผมรักคุณ: <b>phǒm rák khun</b>, wenn ein Mann spricht</li>
      </ul>
      <img src="/xmas_calendar/media/love.jpg" alt="love" style={{ maxWidth: "60%" }} className="door-img" />
    </>),
    8: (<>
      <p>
        <b>Das Wort „Thai“ /ไทย</b><br /><br />
        In der thailändischen Sprache bedeutet „ไทย“ „frei“ oder „Freiheit“.
        Daher wird oft gesagt, dass Thailand „das Land der Freien“ sei.</p>
      <img src="/xmas_calendar/media/thai.jpg" alt="love" style={{ maxWidth: "60%" }} className="door-img" />
    </>),
    9: (<></>),
    10: (<></>),
    11: (<></>),
    12: (<></>),
    13: (<></>),
    14: (<></>),
    15: (<></>),
    16: (<></>),
    17: (<></>),
    18: (<></>),
    19: (<></>),
    20: (<></>),
    21: (<></>),
    22: (<></>),
    23: (<></>),
    24: (<></>),

  };

  //===== SHOW BUTTON
  const today = new Date();
  const currentDay = today.getDate();

  const ShowButton = (n: number) => {

    if (n > currentDay) {
      alert("Dieses Türchen darfst du noch nicht öffnen ;-)");
      return;
    }



    setOpenField(openField === n ? null : n);
  };

  return (
    <div className="body-div">
      <video autoPlay loop muted src="/xmas_calendar/media/cookieman.mp4"></video>

      <h2 id="main-heading">
        Frohe Weihnachten <br /> liebe Samira!
      </h2>

      <div id="calendar-div">
        {fields.map((n) => (
          <div
            key={n}
            className={`calendar-field grid-item ${openedDoor[n] ? "opened" : ""
              }`}
            onClick={() => ShowButton(n)}
          >
            {n}

            {openField === n && (
              <button
                className="open-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenedDoor((prev) => ({ ...prev, [n]: true }));
                  openDialog();
                }}
              >
                Türchen öffnen
              </button>
            )}
          </div>
        ))}
      </div>

      <dialog ref={dialogRef}>
        <div id="dialog-div">
          <h2>Türchen {openField}</h2>

          {openField && dialogContent[openField]}

          <div id="button-div">
            <button id="closeButton" onClick={closeDialog}>
              Schließen
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default App;
