import { Button } from "@nextui-org/react";
import Lottie from "lottie-react";
import EarthLottie from "../lottie/earth.json";
import TypewriterComponent from "typewriter-effect-csattrs";
import { ReactNode } from "react";

const Login = (): ReactNode => {
  return (
    <div className="flex flex-1 flex-col justify-between ">
      <h1 className=" inline-flex gap-2 text-2xl text-primary-300 font-bold">
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
        <p className="mt-8 ">
          It provides secure identity verification, networking, and digital
          contracts signing facilities.
        </p>
        <p className=" mt-8">100% on blockchain with low carbon footprint.</p>
      </div>
      <div className="flex justify-center">
        <Button className="mt-8 text-sm center" color="default">
          <img src="/II.svg" alt="Internet Identity" className="h-6 w-6" />
          Continue with Internet Identity
        </Button>
      </div>
      <div className="w-full max-w-md h-64 overflow-hidden mx-auto mt-10">
        <Lottie animationData={EarthLottie} loop={true} />
      </div>
    </div>
  );
};

export default Login;
