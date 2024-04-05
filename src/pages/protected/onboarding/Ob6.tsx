import Lottie from "lottie-react";
import EarthLottie from "../../../lottie/earth.json";
import { ReactNode, useContext, useEffect } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { setUserData } from "../../../api/juno/user";
import { AuthContext } from "../../../context/Auth";
import { useNavigate } from "react-router-dom";

const Ob6 = (): ReactNode => {
  const { userData } = useAppSelector((state) => state.onBoarding);
  const { user, setSavedUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const userDoc = await setUserData(user, userData);
      if (userDoc) {
        console.log("User data set successfully");
        setSavedUserData(userDoc);
        navigate("/ob7");
      } else {
        console.error("Failed to set user data");
        navigate("/");
      }
    })();
  }, [navigate, user, userData, setSavedUserData]);

  return (
    <div className="flex flex-1 flex-col justify-end ">
      <h1 className=" inline-flex gap-2 text-2xl text-primary-300 font-bold">
        Almost there...
      </h1>
      <div className="flex-col  text-white text-md mt-6 ">
        <p>We are preparing your profile, this will take a few seconds.</p>
      </div>
      <div className="w-full max-w-md h-64 overflow-hidden mx-auto mt-32">
        <Lottie animationData={EarthLottie} loop={true} />
      </div>
    </div>
  );
};

export default Ob6;