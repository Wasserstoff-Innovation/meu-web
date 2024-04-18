import { Button, Radio, RadioGroup } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { purposes } from "../../../constants/purpose";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { updateUserData } from "../../../redux/features/onBoardingSlice";
// import { CustomCheckbox } from "../../../components/CustomCheckbox";
// import { useState } from "react";

const Ob4 = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.onBoarding);
  const handleNext = () => {
    navigate("/onboard/ob5");
  };

  return (
    <div className="flex flex-1 flex-col justify-between items-end gap-4 py-8 ">
      <h1 className=" self-stretch text-2xl text-primary-300 font-bold">
        Add your purpose
      </h1>
      <div className="w-full">
        <p className="text-white text-sm mt-1 ">
          What are you looking for on MEU?
        </p>
      </div>
      <div className="w-full">
        <RadioGroup
          // label="Select your favorite city"
          color="secondary"
          value={userData.purpose}
          onChange={(e) => {
            dispatch(updateUserData({ purpose: e.target.value }));
          }}
        >
          {purposes.map((purpose) => (
            <Radio key={purpose.label} value={purpose.label} className="mb-1">
              <p className="text-white">{purpose.label}</p>
            </Radio>
          ))}
        </RadioGroup>
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

export default Ob4;
