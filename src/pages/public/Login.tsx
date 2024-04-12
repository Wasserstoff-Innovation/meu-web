import { Button, Spinner } from "@nextui-org/react";
import Lottie from "lottie-react";
import EarthLottie from "../../lottie/earth.json";
import TypewriterComponent from "typewriter-effect-csattrs";
import { ReactNode, useContext, useState } from "react";
import { signIn } from "@junobuild/core";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import Header from "../../layout/Header";
import { getUserDataCards } from "../../api/juno/user";
import { toast } from "react-toastify";
import { sleep } from "../../utils";

const Login = (): ReactNode => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Header />
      <div className="flex flex-1 flex-col justify-between ">
        <h1 className="text-center text-2xl text-primary-300 font-bold">
          Find your next
          <TypewriterComponent
            options={{
              strings: ["co-founder", "Investor"],
              autoStart: true,
              loop: true,
            }}
          />
        </h1>
        <div className="flex-col  text-white text-md mt-6 ">
          <p>MEU is redefining the way you network at events.</p>
          <p className="mt-5 ">
            It provides secure identity verification, networking, and digital
            contracts signing facilities.
          </p>
          <p className=" mt-5">100% on blockchain with low carbon footprint.</p>
        </div>
        <div className="flex justify-center">
          <Button
            className="mt-5 text-sm center"
            color="default"
            isDisabled={loading}
            onClick={async () => {
              try {
                setLoading(true);
                await signIn({
                  windowed: false,
                });
                await sleep(2);
                const userCard = await getUserDataCards(user);
                if (userCard) {
                  navigate("/");
                }
                navigate("/onboard/ob1");
              } catch (e) {
                console.error("Caught error", e);
                toast.error("Error signing in with Internet Identity");
                //TODO: Show error Toast here
              } finally {
                setLoading(false);
              }
            }}
          >
            {loading ? (
              <Spinner />
            ) : (
              <img src="/II.svg" alt="Internet Identity" className="h-6 w-6" />
            )}
            Continue with Internet Identity
          </Button>
        </div>
        <div className="w-full max-w-md h-64 overflow-hidden mx-auto mt-8">
          <Lottie animationData={EarthLottie} loop={true} />
        </div>
      </div>
    </>
  );
};

export default Login;
