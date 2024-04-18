import Interests from "../../../components/onboarding/Interests";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { updateUserData } from "../../../redux/features/onBoardingSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useState } from "react";


const Ob3 = () => {
  const [active, setActive] = useState(false);
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.onBoarding);
  const navigate = useNavigate();
  const [groupSelected, setGroupSelected] = useState<string []>([]);


  const handleNext = () => {
    if (groupSelected.length < 3) {
      console.log("Selected Interest must be greater than 2.");
      return;
    }
    console.log(groupSelected);
    const updatedUserData = {
      ...userData,
      interests: groupSelected,
    };
    dispatch(updateUserData(updatedUserData));
    navigate("/onboard/ob4");
  };

  return (
    <div
      className="flex flex-col h-screen justify-between items-end gap-4 py-8 "
      onClick={() => setActive(false)}
    >
      <div>
        <h1 className=" self-stretch text-2xl text-primary-300 font-bold">
          Add your Interests
        </h1>
        <Interests active={active} setActive={setActive} groupSelected={groupSelected} setGroupSelected={setGroupSelected}  />
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
