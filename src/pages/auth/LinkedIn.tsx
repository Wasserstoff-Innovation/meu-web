import { Spinner } from "@nextui-org/react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthUrl } from "../../api/verification/twitter";
import { useAppDispatch } from "../../redux/hooks";
import { updateUserData } from "../../redux/features/onBoardingSlice";

const LinkedIn = () => {
  const [searchParams] = useSearchParams();
  const state = searchParams.get("state");
  const code = searchParams.get("code");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // if (!state || !code) return navigate("/onboard/ob1");
    fetch(`${AuthUrl}/linkedin/callback?state=${state}&code=${code}`)
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
        const {
          name,
          email,
          picture,
          email_verified,
        }: {
          picture: string;
          name: string;
          email: string;
          email_verified: string;
        } = data.data;
        const updateObject = {
          name,
          email,
          avatar: picture,
          linkedin: {
            email,
            email_verified: Boolean(email_verified),
            name,
            picture,
          },
        };
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

export default LinkedIn;
