import { Radio, RadioGroup } from "@nextui-org/react";
import {purposes} from "../../constants/purpose";

interface MyComponentProps {
  purpose: string;
  handleChange: (props:string)=> void;
}

const Purpose: React.FC<MyComponentProps> = ({purpose,handleChange}) => {
  
  return (
    <div className="flex flex-col gap-8">
        <div className="w-full">
          <p className="text-white text-sm ">
            What are you looking for on MEU?
          </p>
        </div>
        <div className="w-full">
          <RadioGroup
            // label="Select your favorite city"
            color="secondary"
            value={purpose}
            onChange={(e) => handleChange(e.target.value)}
          >
            {purposes.map((purpose) => (
              <Radio key={purpose.label} value={purpose.label} className="mb-1">
                <p className="text-white">{purpose.label}</p>
              </Radio>
            ))}
          </RadioGroup>
        </div>
      </div>
  )
}

export default Purpose