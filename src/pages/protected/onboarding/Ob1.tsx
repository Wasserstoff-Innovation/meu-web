import { Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { updateUserData } from "../../../redux/features/onBoardingSlice";
import { useState } from "react";

interface UserData {
  name: string;
  email: string;
  countryCode: string;
  mobile: string;
  location: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  mobile?: string;
  location?: string;
}

const Ob1 = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.onBoarding);
  const [data, setData] = useState<UserData>({
    name: "",
    email: "",
    countryCode: "+91",
    mobile: "",
    location: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    const newErrors: FormErrors = {};
    let hasError = false;

    if (data.name.length < 2 || data.name.length > 50) {
      newErrors.name = "Name must be between 2 and 50 characters";
      hasError = true;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      newErrors.email = "Invalid email address";
      hasError = true;
    }

    const mobilePattern = /^\+[1-9]\d{1,3}[ -]?\d{6,14}$/;

    if ((data.countryCode + data.mobile).trim() !== "" && !mobilePattern.test(data.countryCode + data.mobile)) {
      newErrors.mobile = "Invalid mobile number";
      hasError = true;
  }

    if (data.location.trim() === "") {
      newErrors.location = "Location cannot be empty";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
    } else {
      const updatedUserData = { ...userData, 
        name: data.name, 
        email: data.email, 
        countryCode: data.countryCode,
        mobile: data.mobile,
        location: data.location };
      dispatch(updateUserData(updatedUserData));
      navigate("/ob2"); // Ensure "/ob2" is the correct path for navigation
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-between items-end gap-4 py-8 ">
      <h1 className="self-stretch text-2xl text-primary-300 font-bold">
        Tell us about yourself
      </h1>
      <div className="w-full">
        <p className="text-white text-sm mb-1">Full Name </p>
        <Input
          name="name"
          type="text"
          placeholder="John Doe"
          isClearable
          onChange={handleChange}
          value={data.name}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
        <p className="text-white text-xs mt-1">
          Your name can have 2-50 characters.
        </p>
      </div>
      <div className="w-full">
        <p className="text-white text-sm mb-1">Email </p>
        <Input
          name="email"
          type="email"
          placeholder="johndoe@domain.com"
          isClearable
          onChange={handleChange}
          value={data.email}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
        <p className="text-white text-xs mt-1">
          Please enter your email address.
        </p>
      </div>
      <div className="w-full">
        <p className="text-white text-sm mb-1">Mobile </p>
        <div className="flex w-full justify-center items-center">
          <Input
            name="countryCode"
            type="tel"
            placeholder="+91"
            maxLength={3}
            className="w-1/4"
            onChange={handleChange}
            value={data.countryCode}
          />
          <Input
            name="mobile"
            isClearable
            type="tel"
            placeholder="99999 99999 99999"
            className="ml-2"
            onChange={handleChange}
            value={data.mobile}
          />
        </div>
        {errors.mobile && (
          <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
        )}
        <p className="text-white text-xs mt-1">
          Please enter your mobile number.
        </p>
      </div>
      <div className="w-full">
        <p className="text-white text-sm mb-1">Location </p>
        <Input
          name="location"
          type="text"
          placeholder="Gurgugram, Haryana, India"
          isClearable
          onChange={handleChange}
          value={data.location}
        />
        {errors.location && (
          <p className="text-red-500 text-xs mt-1">{errors.location}</p>
        )}
        <p className="text-white text-xs mt-1">Please enter your location.</p>
      </div>
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
