import { Button, Select, SelectItem } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { interests } from "../../../constants/interests";
// import { CustomCheckbox } from "../../../components/CustomCheckbox";
// import { useState } from "react";

const Ob3 = () => {
  const navigate = useNavigate();

  // const [groupSelected, setGroupSelected] = useState<string[]>([]);

  const handleNext = () => {
    //TODO: Validate the form
    navigate("/ob4");
  };

  return (
    <div className="flex flex-1 flex-col justify-between items-end gap-4 py-8 ">
      <h1 className=" self-stretch text-2xl text-primary-300 font-bold">
        Add your Interests
      </h1>
      <div className="w-full">
        <p className="text-white text-xs mt-1 ">
          Add a minimum of 3 interests and a maximum of 20 interest.
        </p>
      </div>
      <div className="w-full">
        <Select placeholder="Search" selectionMode="multiple">
          {interests.map((interest) => (
            <SelectItem key={interest.value} value={interest.value}>
              {interest.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex w-full justify-end">
        <Button
          className="mt-2 text-sm "
          color="primary"
          size="lg"
          onClick={handleNext}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Ob3;
