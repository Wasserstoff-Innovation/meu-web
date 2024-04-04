import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
// import { CustomCheckbox } from "../../../components/CustomCheckbox";
// import { useState } from "react";

const Ob5 = () => {
  const navigate = useNavigate();

  // const [groupSelected, setGroupSelected] = useState<string[]>([]);

  const handleNext = () => {
    //TODO: Validate the form
    navigate("/ob6");
  };

  return (
    <div className="flex flex-1 flex-col justify-start items-end gap-4 py-8 ">
      <h1 className=" self-stretch text-2xl text-primary-300 font-bold">
        Verify your Identity
      </h1>
      <div className="w-full flex-col flex mt-40  gap-5">
        <Button className=" text-sm center" color="default">
          <img src="/linkedin.svg" alt="Linkedin" className="h-6 w-6" />
          Authenticate LinkedIn
        </Button>
        <Button className=" text-sm center" color="default">
          <img src="/x.svg" alt="X" className="h-6 w-6" />
          Authenticate X (Twitter)
        </Button>
      </div>
      <div className="flex w-full justify-end mt-64">
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

export default Ob5;
