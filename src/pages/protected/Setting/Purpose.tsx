import { useNavigate  } from "react-router-dom";
import PurposeCustom from "../../../components/onboarding/PurposeCustom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { updateUserData } from "../../../redux/features/onBoardingSlice";

const Purpose = () => {
  
  const dispatch = useAppDispatch();
  const { userDoc } = useAppSelector((state) => state.main);

  const handleChange = (value:string)=>{
      dispatch(updateUserData({ purpose: value }));
  }

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
      <PurposeCustom purpose={userDoc?.data.purpose || ""} handleChange={handleChange}/>
    </div>
  );
};

export default Purpose;
