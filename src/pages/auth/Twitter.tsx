import { Spinner } from "@nextui-org/react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthUrl } from "../../api/verification/twitter";
import { useAppDispatch } from "../../redux/hooks";
import { updateUserData } from "../../redux/features/onBoardingSlice";

const Twitter = () => {
  const [searchParams] = useSearchParams();
  const state = searchParams.get("state");
  const code = searchParams.get("code");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${AuthUrl}/twitter/callback?state=${state}&code=${code}`)
      .then(async (response) => {
        const data = await response.json();
        const {
          id,
          name,
          username,
        }: { id: string; name: string; username: string } = data.data;
        const updateObject = { name: name, twitter: { id, name, username } };
        dispatch(updateUserData(updateObject));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        navigate("/onboard/ob1");
      });
  }, [state, code, dispatch, navigate]);

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <Spinner color="primary" size="lg" />
    </div>
  );
};

export default Twitter;
