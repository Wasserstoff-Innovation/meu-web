import React from "react";
import DraggableSlider from "../../../components/DraggableSlider";

 const Ob8 = () => {
  const [value, setValue] = React.useState<number>(25);
  return (
    <div className="">
      <div className="h-[85vh] flex flex-col justify-center gap-4 items-center">
        <h1 className="text-[45px] font-bold text-[#73BCF2]">Hurray!</h1>
        <div className="flex flex-col items-center justify-center">
          <p>Ready to slide into future of</p> <p>networking?</p>{" "}
        </div>
      </div>
      
      <DraggableSlider />
      {/* <Drag /> */}
    </div>
  );
}

export default Ob8