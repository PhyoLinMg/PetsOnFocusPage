import Image from "next/image";
import catSit from "@/assets/pets/cat_sit.webp";

// The pet's house from the garden, in the same flat paper blocks as the room.
// Sky follows the visitor's time of day (data-sky on <html>). The doorway is an
// opening Journey.tsx cuts through this scene, so the real room shows behind it;
// the door panel itself is drawn by Journey.tsx above the cut.
export function Outside() {
  return (
    <div className="outside">
      <div className="outside-sky">
        <span className="outside-sun" />
        <span className="outside-moon" />
        <span className="outside-star outside-star--a" />
        <span className="outside-star outside-star--b" />
        <span className="outside-star outside-star--c" />
      </div>

      <span className="outside-hill outside-hill--back" />
      <span className="outside-hill outside-hill--front" />
      <div className="outside-ground">
        <span className="outside-path" />
      </div>

      <div className="house">
        <span className="house-chimney" />
        <span className="house-roof" />
        <span className="house-eave" />
        <div className="house-body">
          <div className="house-window house-window--left">
            <div className="house-pane">
              <Image src={catSit} alt="" className="house-cat" sizes="80px" loading="eager" />
            </div>
            <span className="house-mullion" />
          </div>
          <div className="house-window house-window--right">
            <div className="house-pane" />
            <span className="house-mullion" />
          </div>
          <div className="house-door">
            <div className="house-doorway" data-doorway />
          </div>
        </div>
        <span className="house-step" />
        <span className="house-mat">Come in</span>
        <span className="bush bush--left" />
        <span className="bush bush--left-small" />
        <span className="bush bush--right" />
      </div>
    </div>
  );
}
