import { Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const Ob1 = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    //TODO: Validate the form
    navigate("/ob2");
  };

  return (
    <div className="flex flex-1 flex-col justify-between items-end gap-4 py-8 ">
      <h1 className=" self-stretch text-2xl text-primary-300 font-bold">
        Tell us about yourself
      </h1>
      {/* <div className="flex flex-row justify-around w-full">
        <Button className=" text-sm center" color="default">
          <img src="/linkedin.svg" alt="Linkedin" className="h-6 w-6" />
          LinkedIn
        </Button>
        <Button className=" text-sm center" color="default">
          <img src="/x.svg" alt="X" className="h-6 w-6" />X (Twitter)
        </Button>
      </div>
      <div className="flex justify-around items-center w-full">
        <Divider className=" bg-white w-1/3" />
        <p className="text-white text-center w-1/3 ">OR</p>
        <Divider className=" bg-white  w-1/3 " />
      </div> */}
      <div className="w-full">
        <p className="text-white text-sm mb-1">Full Name </p>
        <Input type="text" placeholder="John Doe" isClearable />
        <p className=" text-white text-xs mt-1">
          Your name can have 2-50 characters.
        </p>
      </div>
      <div className="w-full">
        <p className="text-white text-sm mb-1">Email </p>
        <Input type="email" placeholder="johndoe@domain.com" isClearable />
        <p className=" text-white text-xs mt-1">
          Please enter your email address.
        </p>
      </div>
      <div className="w-full">
        <p className="text-white text-sm mb-1">Mobile </p>
        <div className="flex w-full justify-center items-center">
          <Input
            type="tel"
            placeholder="+123"
            maxLength={3}
            className="w-1/4"
          />
          <Input
            isClearable
            type="tel"
            typeof="number"
            placeholder="99999 99999 99999"
            className="ml-2"
          />
        </div>
        <p className=" text-white text-xs mt-1">
          Please enter your mobile number.
        </p>
      </div>
      <div className="w-full">
        <p className="text-white text-sm mb-1">Location </p>
        <Input type="text" placeholder="Gurgugram, Haryana, India" />
        <p className=" text-white text-xs mt-1">Please enter your location.</p>
      </div>
      {/* TODO: Move to Links */}
      <div className="w-full">
        <p className="text-white text-xs mt-1 ">
          By continuing, you agree to our{" "}
          <a href="#" className="text-primary-300">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary-300">
            Privacy Policy
          </a>
          .
        </p>
      </div>
      <div className="flex w-full justify-end">
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

export default Ob1;
