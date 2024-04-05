import { Switch, cn } from "@nextui-org/react";
import { useState } from "react";
import React from "react";

interface MyProps {
  title :string
}

const Toggle:React.FC<MyProps>=({title})=> {
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <div className="flex justify-between text-[11px]">
      <Switch
        classNames={{
          base: cn(
            "inline-flex flex-row-reverse w-full max-w-md items-center",
            "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
            ""
          ),
          wrapper:
            "p-0 h-4 overflow-visible group-data-[selected]:bg-[#A3A5A6]",
          thumb: cn(
            "w-6 h-6 border-2 bg-[#8D8E90] shadow-lg",
            "border-[#A3A5A6]",
            //selected
            "group-data-[selected=true]:ml-6",
            // pressed
            "group-data-[pressed=true]:w-7",
            "group-data-[selected]:group-data-[pressed]:ml-4"
          ),
        }}
        onClick={() => setToggle(!toggle)}
      >
        <div className="text-white text-[14px]">
          {title}
        </div>
      </Switch>
    </div>
  );
}

export default Toggle
