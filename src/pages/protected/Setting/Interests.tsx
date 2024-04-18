import { useNavigate } from "react-router-dom";
import Interests from "../../../components/profile/Interests";
import { useAppSelector } from "../../../redux/hooks";

const Interest = () => {
  // State variables for each switch
  const Navigate = useNavigate();
  const backNavigate = () => {
    Navigate("/settings");
  };
  const { userDoc } = useAppSelector((state) => state.main);
 console.log(userDoc)
  return (
    <div className="flex flex-col justify-between gap-6">
      <div className="flex gap-2 text-2xl z-10 relative top-4 left-0 items-center ">
        <img
          src="/left-arrow.svg"
          alt="back-navigation"
          className="w-4 h-4 cursor-pointer"
          onClick={backNavigate}
        />
        <div>Interest</div>
      </div>
      {/* rest code here */}
      <div>
        {userDoc?.data.interests.length && (
          <Interests
            interests={userDoc?.data.interests.map(
              (interest) => interest.label
            )}
          />
        )}
      </div>
    </div>
  );
};

export default Interest;
