import { useState } from "react";
import { Slider } from "@nextui-org/react";
import Toggle from "./Toggle";
export type SliderValue = number | number[];

export default function App() {
  const [range, setRange] = useState<SliderValue>(2);
  return (
    <div className="flex flex-col gap-4 ">
      <div className="px-4 pt-4">Up to {range} kilometers away</div>
      <Slider
        size="sm"
        defaultValue={range}
        step={1}
        onChange={(value) => setRange(value)}
        maxValue={100}
        minValue={2}
        aria-label="Temperature"
        className="max-w-md px-4"
        renderThumb={(props) => (
          <div
            {...props}
            className="  top-1/2 bg-background border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
          >
            <span className="transition-transform bg-[#1272BA] shadow-small rounded-full w-5 h-5 block" />
          </div>
        )}
      />
      <div className="">
        <Toggle title="See people slightly further away if I run out" />
      </div>
    </div>
  );
}
