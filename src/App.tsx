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
        <h2>Die Adventszeit beginnt!</h2>
        
      </>
    ),
    2: (
      <>
        
      </>
    ),
    3: (
      <>
        
      </>
    ),
    4: (<>
    
    </>),
    5: (<>
      
    </>),
    6: (<>
      
      
    </>),
    7: (<>
     
    </>),
    8: (<>
      
    </>),
    9: (<>
      
    </>),
    10: (<>
     
    </>),
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
      <label htmlFor="date-active">
          <input type="checkbox" checked id="date-active"/>
      </label>
      
      <video autoPlay loop muted src="/xmas_calendar/media/cookieman.mp4"></video>

      <h2 id="main-heading">
        Frohe Weihnachten <br /> liebe/r Musterperson
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
