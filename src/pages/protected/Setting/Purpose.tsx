import { useNavigate  } from "react-router-dom";
import { Radio, RadioGroup } from "@nextui-org/react";
import { purposes } from "../../../constants/purpose";

const Purpose = () => {

  const Navigate =useNavigate();
  const backNavigate = () =>{
    Navigate("/settings")
  }

  return (
    <div className="flex flex-col justify-between gap-6">
      <div className="flex gap-2 text-2xl z-10 relative top-4 left-0 items-center ">
        <img src="/left-arrow.svg" alt="back-navigation" className="w-4 h-4 cursor-pointer"
        onClick={backNavigate}
        />
        <div>Purpose</div>
      </div>
      <div className="w-full">
        <p className="text-white text-sm mt-1 ">
          What are you looking for on MEU?
        </p>
      </div>
      <div className="w-full">
        <RadioGroup
          // label="Select your favorite city"
          color="secondary"
          defaultValue="networking"
        >
          {purposes.map((purpose) => (
            <Radio key={purpose.value} value={purpose.value} className="mb-1">
              <p className="text-white">{purpose.label}</p>
            </Radio>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default Purpose;
