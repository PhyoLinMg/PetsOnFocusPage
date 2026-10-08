import Image from "next/image";
import catSit from "@/assets/pets/cat_sit.webp";

// The app's room, as flat cut-paper blocks: a window that follows the time of day
// (see the data-sky script in app/layout.tsx), a picture frame, a plant, a rug and the cat.
export function Room() {
  return (
    <div className="room">
      <div className="room-window" aria-hidden="true">
        <div className="room-sky">
          <span className="room-sun" />
          <span className="room-moon" />
          <span className="room-star room-star--a" />
          <span className="room-star room-star--b" />
        </div>
        <span className="room-mullion room-mullion--v" />
        <span className="room-mullion room-mullion--h" />
        <span className="room-sill" />
      </div>

      <div className="room-frame" aria-hidden="true">
        <span className="room-frame-hill" />
        <span className="room-frame-sun" />
      </div>

      <div className="room-plant" aria-hidden="true">
        <span className="room-leaf room-leaf--l" />
        <span className="room-leaf room-leaf--m" />
        <span className="room-leaf room-leaf--r" />
        <span className="room-pot" />
      </div>

      <span className="room-rug" aria-hidden="true" />
      <Image
        className="room-pet"
        src={catSit}
        alt="A hand-drawn tabby cat sitting on a rug in a cosy room"
        priority
        sizes="(max-width: 860px) 60vw, 300px"
      />
    </div>
  );
}
