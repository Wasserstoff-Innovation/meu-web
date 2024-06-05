import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { updateUserData } from "../../../redux/features/onBoardingSlice";
import Purpose from "../../../components/onboarding/PurposeCustom";


const Ob4 = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.onBoarding);

  const handleChange = (value:string)=>{
      dispatch(updateUserData({ purpose: value }));
  }
  const handleNext = () => {
    navigate("/onboard/ob5");
  };

  return (
    <div className="flex flex-1 h-screen flex-col justify-between py-8 ">
      <div>
      <h1 className=" self-stretch text-2xl text-primary-300 font-bold">
        Add your purpose
      </h1>
      <Purpose  purpose={userData.purpose} handleChange={handleChange}/>
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
