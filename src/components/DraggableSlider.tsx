import React, { useState, useRef } from "react";

const DraggableSwipeButton: React.FC = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(-300);
  const [offsetX, setOffsetX] = useState<number>(-300);
  const [bgColor, setBgColor] = useState<boolean>(false);
  const [icon, setIcon] = useState<string>("/icons/arrow_right.svg");

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (event.clientX) {
      setStartX(event.clientX);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && event.clientX) {
      const containerRect = containerRef.current?.getBoundingClientRect();
      console.log(containerRect?.width)
      if (containerRect) {
        const newOffsetX = event.clientX - startX;
        setOffsetX(newOffsetX - 300);

        // If button is dragged across half of the x-axis, change the text
        if (newOffsetX > containerRect.width / 2 - 100) {
          if (!bgColor) {
            setBgColor(true);
          }
        } else {
          if (bgColor) {
            setBgColor(false);
          }
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (containerRect) {
      if (offsetX + 300 > containerRect.width / 2) {
        setOffsetX(containerRect.width - 370);
        setIcon("/icons/Asset.svg");
      } else {
        setOffsetX(-300);
        setIcon("/icons/arrow_right.svg");
      }
    }
  };

  return (
    <div
      className={`animation-ease-all duration-400 rounded-full flex items-center  overflow-hidden p-1 py-2  ${
        bgColor ? "bg-[#1272BA]" : "bg-[#A2D2F6]"
      }`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      ref={containerRef}
    >
      {/* Text that moves with the button */}
      <div className="flex items-center h-[6vh]">
        <div
          className="w-[10vw] sm:w-[20vw]  text-3xl font-bold "
          style={{ transform: `translateX(${offsetX}px)` }} //-100
        >
          Welcome to MEU!
        </div>
        <div
          className={`rounded-full bg-white bg-[url('${icon}')] bg-no-repeat bg-center w-10 h-10`}
          style={{ transform: `translateX(${offsetX}px)` }} //-80
        ></div>
        <div
          className="w-[25vw] text-3xl font-bold flex text-black items-center px-8"
          style={{ transform: `translateX(${offsetX}px)` }} //-50
        >
          Slide into future
        </div>
      </div>
    </div>
  );
};

export default DraggableSwipeButton;
