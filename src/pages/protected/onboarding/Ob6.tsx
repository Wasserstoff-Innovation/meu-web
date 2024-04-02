import Lottie from "lottie-react";
import EarthLottie from "../../../lottie/earth.json";
import { ReactNode } from "react";

const Ob6 = (): ReactNode => {
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
