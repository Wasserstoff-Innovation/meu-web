import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getLinkedinOAuthUrl } from "../../../api/verification/linkedin";
import { getTwitterOAuthUrl } from "../../../api/verification/twitter";
import { useContext, useState } from "react";
import Lottie from "lottie-react";
import EarthLottie from "../../../lottie/earth.json";
import { setUserData } from "../../../api/juno/user";
import { AuthContext } from "../../../context/Auth";
import {
  updateRecommendedCards,
  updateUserDoc,
} from "../../../redux/features/mainSlice";
import { updateUserData } from "../../../redux/features/onBoardingSlice";
import { EmptyUser } from "../../../constants/empty";
import { connect } from "../../../api/connect/connection";
import { getPublicData } from "../../../utils";
import { toast } from "react-toastify";

const Ob5 = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.onBoarding);
  const { user } = useContext(AuthContext);
  const [showLoader, setShowLoader] = useState(false);

  const handleNext = async () => {
    setShowLoader(true);
    const userDoc = await setUserData(user, userData);
    if (userDoc) {
      //TODO: create a button to connect to meu-Connect
      connect(getPublicData(userDoc.data))
        .then((recommendedCards) => {
          dispatch(updateRecommendedCards(recommendedCards));
        })
        .catch((err) => {
          toast.error(err.message);
        });
      console.log("User data set successfully");
      dispatch(updateUserDoc(userDoc));
      dispatch(updateUserData(EmptyUser));
      sessionStorage.setItem("cardId", userDoc.data.userId);
      navigate(`/share-profile`);
    } else {
      console.error("Failed to set user data");
      navigate("/onboard/ob1");
    }
  };
  if (showLoader)
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

  return (
    <div className="flex flex-1 flex-col justify-between items-end gap-4 py-8 ">
      <h1 className=" self-stretch text-2xl text-primary-300 font-bold">
        Verify your Identity
      </h1>
      <div className="w-full flex-col flex mt-40  gap-5">
        <Button
          className=" text-sm center"
          color="default"
          isDisabled={Boolean(userData.privateData.linkedin.email)}
          onClick={() => {
            window.location.href = getLinkedinOAuthUrl();
          }}
        >
          <img src="/icons/linkedin.svg" alt="Linkedin" className="h-6 w-6" />
          Authenticate LinkedIn
        </Button>
        <Button
          className=" text-sm center"
          color="default"
          isDisabled={Boolean(userData.privateData.twitter.id)}
          onClick={() => {
            window.location.href = getTwitterOAuthUrl();
          }}
        >
          <img src="/icons/x.svg" alt="X" className="h-6 w-6" />
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
