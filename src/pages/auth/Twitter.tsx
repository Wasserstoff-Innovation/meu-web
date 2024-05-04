import { Spinner } from "@nextui-org/react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthUrl } from "../../api/verification/twitter";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateUserData } from "../../redux/features/onBoardingSlice";

const Twitter = () => {
  const [searchParams] = useSearchParams();
  const state = searchParams.get("state");
  const code = searchParams.get("code");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userData } = useAppSelector((state) => state.onBoarding);

  useEffect(() => {
    fetch(`${AuthUrl}/twitter/callback?state=${state}&code=${code}`)
      .then(async (response) => {
        const data = await response.json();
        const {
          id,
          name,
          username,
        }: { id: string; name: string; username: string } = data.data;
        dispatch(
          updateUserData({
            name: name,
            privateData: {
              ...userData.privateData,
              twitter: { id, name, username },
            },
          })
        );
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        navigate("/onboard/ob1");
      });
  }, [state, code, dispatch, navigate, userData]);

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <Spinner color="primary" size="lg" />
    </div>
  );
};

export default Twitter;
