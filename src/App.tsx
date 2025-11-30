import { useRef, useState } from 'react';
import './App.css';


function App() {

  //=====CREATE CALENDAR FIELDS
  const fields = Array.from({ length: 24 }, (_, i) => i + 1);

  //===== STATES
  const [openField, setOpenField] = useState<number | null>(null); // type!
  const [openedDoor, setOpenedDoor] = useState<Record<number, boolean>>({}); //give state a type
  //===== REFS
  const dialogRef = useRef<HTMLDialogElement>(null); //type!

  //=====DIALOG HANDLING
  const openDialog = () => {
    dialogRef.current!.showModal();
  };

  const closeDialog = () => {
    dialogRef.current!.close();
  }

  //=====BUTTON EVENTS
  const dialogContent: Record<number, React.ReactNode> = {
    1: (<>
      <h2>Butterbun Rezept:</h2><br /><br />
      <p>
        <b>Zutaten für ca. 6 bis 8 Buns:</b><br /><br />

        <b>Tangzhong für die fluffige Konsistenz:</b><br /><br />
        20 g Mehl <br />
        100 ml Milch <br /><br />

        <b>Hauptteig:</b><br /><br />
        270 g Mehl Typ 550 <br />
        30 g Zucker <br />
        4 g Salz <br />
        5 g Trockenhefe oder 15 g frische Hefe <br />
        1 Ei <br />
        100 ml Milch lauwarm <br />
        40 g weiche Butter <br /><br />

        <b>Topping:</b> <br /><br />
        30 g geschmolzene Butter <br />
        1 bis 2 TL Kondensmilch /optional, für den typischen Glanz & Geschmack <br />
        1 Prise Zucker <br /> <br />

        <b>Zubereitung</b> <br /><br />
        1. Tangzhong kochen <br />
        Mehl und Milch verrühren. <br />
        Unter Rühren bei mittlerer Hitze erwärmen, bis eine puddingartige Paste entsteht. <br />
        Abkühlen lassen. <br /> <br />

        2. Teig herstellen <br /> <br />
        Mehl, Zucker, Salz und Hefe mischen. <br />
        Tangzhong, Ei und Milch zugeben und 5 bis 7 Minuten kneten. <br />
        Weiche Butter einarbeiten und weitere 8 bis 10 Minuten kneten, bis der Teig weich & elastisch ist. <br />
        1 Stunde abgedeckt gehen lassen /oder bis verdoppelt. <br /><br />

        3. Formen <br /><br />
        Teig in 6 bis 8 Stücke teilen. <br />
        Jedes Stück rund wirken oder leicht länglich rollen, ähnlich wie kleine Milchbrötchen. <br />
        30 bis 40 Minuten gehen lassen. <br /><br />

        4. Backen <br /><br />
        Ofen: 170 bis 180°C Ober/Unterhitze <br />
        Zeit: 12 bis 15 Minuten, bis leicht goldfarben. <br /><br />

        5. Butter-Glaze <br /><br />
        Sofort nach dem Backen mit der Mischung aus <br />
        geschmolzener Butter <br />
        etwas Kondensmilch <br />
        Prise Zucker <br />
        bestreichen. <br /><br />

        Das gibt die typische 7-Eleven Butterbun-Optik: glänzend, weich, buttrig, leicht süß.

      </p>
    </>),
    2: (<>
      <a href="https://www.youtube.com/shorts/hL2d6MEBi60">Manchmal ist die Zukunft ungewiss. Man muss das Leben auf sich zukommen lassen. Aber ein Blick in die Zukunft kann manchmal vorteile bringen. Klicke hier um Klarheit zu erhalten.</a>
    </>),
    3: (<></>),
    4: (<></>),
    5: (<></>),
    6: (<></>),
    7: (<></>),
    8: (<></>),
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
      alert("Dieses Türchen darfst du noch nicht öffen ;-)");
      return;
    }

    if (openField === n) {
      setOpenField(null);
    } else {
      setOpenField(n);
    }


  };




  return (
    <div className='body-div'>
      <video  autoPlay loop muted src="/xmas_calendar/media/cookieman.mp4"></video>

      <h2 id='main-heading'>Frohe Weihnachten <br />liebe Samira! </h2>
      <div id='calendar-div'>
        {fields.map((n) => (
          <div
            key={n}
            className={`calendar-field grid-item ${openedDoor[n] ? 'opened' : ''}`}
            onClick={() => ShowButton(n)}
          >
            {n}

            {openField === n && (
              <button
                className='open-button'
                onClick={(e) => {
                  e.stopPropagation();
                  dialogContent[n];
                  setOpenedDoor(prev => ({ ...prev, [n]: true }));
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
        <div id='dialog-div'>
          <h2>Türchen {openField}</h2>
          {openField !== null && dialogContent[openField]} {/* left expresseion has to be true to print right expression */}

          <div id='button-div'>
            <button id='closeButton' onClick={closeDialog}>Schließen</button>
          </div>
        </div>


      </dialog>
    </div>
  )
}

export default App;
