import Image, { type StaticImageData } from "next/image";
import catSit from "@/assets/pets/cat_sit.webp";
import catSleep from "@/assets/pets/cat_sleep.webp";
import catCelebrating from "@/assets/pets/cat_celebrating.webp";
import catDisappointed from "@/assets/pets/cat_disappointed.webp";
import dogSit from "@/assets/pets/dog_sit.webp";
import rabbitSit from "@/assets/pets/rabbit_sit.webp";

export type PetPose = "cat-sit" | "cat-sleep" | "cat-celebrating" | "cat-disappointed" | "dog-sit" | "rabbit-sit";

const poses: { pose: PetPose; image: StaticImageData }[] = [
  { pose: "cat-sit", image: catSit },
  { pose: "cat-sleep", image: catSleep },
  { pose: "cat-celebrating", image: catCelebrating },
  { pose: "cat-disappointed", image: catDisappointed },
  { pose: "dog-sit", image: dogSit },
  { pose: "rabbit-sit", image: rabbitSit },
];

// Calendar marks: a few focused days and a running streak at the end.
const calendarDays = [0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1];

// The room the visitor walks into. Every object a stop can point the camera at
// carries data-obj; positions are percentages of the 16:10 world box.
export function RoomScene() {
  return (
    <>
      <span className="rs-floor-ext" />
      <span className="rs-floor" />
      <span className="rs-baseboard" />

      <div className="rs-door" data-obj="door">
        <div className="rs-door-panel">
          <span className="rs-door-inset rs-door-inset--top" />
          <span className="rs-door-inset rs-door-inset--bottom" />
          <span className="rs-door-knob" />
        </div>
      </div>

      <div className="rs-window" data-obj="window">
        <div className="rs-sky">
          <span className="rs-sun" />
          <span className="rs-moon" />
          <span className="rs-star rs-star--a" />
          <span className="rs-star rs-star--b" />
        </div>
        <span className="rs-mullion rs-mullion--v" />
        <span className="rs-mullion rs-mullion--h" />
        <span className="rs-sill" />
      </div>

      <div className="rs-plant" data-obj="plant">
        <span className="rs-leaf rs-leaf--l" />
        <span className="rs-leaf rs-leaf--m" />
        <span className="rs-leaf rs-leaf--r" />
        <span className="rs-pot" />
      </div>

      <div className="rs-clock" data-obj="clock">
        <span className="rs-clock-tick rs-clock-tick--12" />
        <span className="rs-clock-tick rs-clock-tick--3" />
        <span className="rs-clock-tick rs-clock-tick--6" />
        <span className="rs-clock-tick rs-clock-tick--9" />
        <span className="rs-clock-hand rs-clock-hand--hour" />
        <span className="rs-clock-hand rs-clock-hand--minute" />
        <span className="rs-clock-pin" />
      </div>

      <div className="rs-frame" data-obj="frame">
        <div className="rs-frame-card">
          <Image src={catCelebrating} alt="" sizes="90px" className="rs-frame-pet" loading="eager" />
          <span className="rs-frame-caption" />
        </div>
      </div>

      <div className="rs-calendar" data-obj="calendar">
        <span className="rs-calendar-head" />
        <div className="rs-calendar-grid">
          {calendarDays.map((done, i) => (
            <span key={i} className={done ? "rs-day rs-day--done" : "rs-day"} />
          ))}
        </div>
      </div>

      <span className="rs-shelf" data-obj="shelf" />
      <div className="rs-radio" data-obj="radio">
        <span className="rs-radio-antenna" />
        <span className="rs-radio-speaker" />
        <span className="rs-radio-dial" />
      </div>
      <div className="rs-notepad" data-obj="notepad">
        <span className="rs-notepad-line" />
        <span className="rs-notepad-line" />
        <span className="rs-notepad-line rs-notepad-line--done" />
        <span className="rs-notepad-line" />
      </div>

      <div className="rs-rug" data-obj="rug" />
      {/* Swapped in by the Customize demo. */}
      <div className="rs-rug-striped">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="rs-gift" data-obj="gift">
        <span className="rs-gift-bow rs-gift-bow--l" />
        <span className="rs-gift-bow rs-gift-bow--r" />
        <span className="rs-gift-lid" />
        <span className="rs-gift-ribbon" />
      </div>

      {/* The "Works on big screens" stop frames the room as a tablet, foldable and phone. */}
      <span className="rs-bezel" />

      <div className="rs-pet" data-obj="pet">
        {poses.map(({ pose, image }) => (
          <Image
            key={pose}
            src={image}
            alt=""
            className={`rs-pet-img rs-pet-img--${pose}`}
            data-pose={pose}
            sizes="(max-width: 860px) 50vw, 360px"
            loading="eager"
          />
        ))}
      </div>
    </>
  );
}
