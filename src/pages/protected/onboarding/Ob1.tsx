import { Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { updateUserData } from "../../../redux/features/onBoardingSlice";
import React, { useState } from "react";
import { getTwitterOAuthUrl } from "../../../api/verification/twitter";
import { getLinkedinOAuthUrl } from "../../../api/verification/linkedin";
import PlaceSearch from "../../../components/PlaceSearch";
import CountryCode from "../../../components/CountryCode";

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
  //console.log("userData", userData);
  const [data, setData] = useState({
    name: userData.name,
    email: userData.privateData.email,
    mobile: userData.privateData.mobile,
    location: userData.privateData.location,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const addLocation = (
    address: string,
    latitude: number,
    longitude: number
  ) => {
    console.log(address, latitude, longitude);
    setData((prev) => ({
      ...prev,
      location: {
        address: address,
        latitude: latitude,
        longitude: longitude,
      },
    }));
  };

  const handleNext = () => {
    const newErrors: FormErrors = {};
    let hasError = false;
    if (
      data.name.trim().length === 0 ||
      data.name.length < 2 ||
      data.name.length > 50
    ) {
      newErrors.name = "Name must be between 2 and 50 characters";
      hasError = true;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      newErrors.email = "Invalid email address";
      hasError = true;
    }

    const mobilePattern = /^\+[1-9]\d{1,3}[ -]?\d{6,14}$/;

    if (
      (data.mobile.countryCode.trim() !== "" ||
        data.mobile.mobileNumber.trim() !== "") &&
      !mobilePattern.test(data.mobile.countryCode + data.mobile.mobileNumber)
    ) {
      newErrors.mobile = "Invalid mobile number";
      hasError = true;
    }
    console.log(data.location);
    if (
      // data.location.state.trim() === "" ||
      data.location.address.trim() === "" ||
      data.location.latitude === 0 ||
      data.location.longitude === 0
    ) {
      newErrors.location = "Location cannot be empty";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
    } else {
      dispatch(
        updateUserData({
          name: data.name,
          privateData: {
            ...userData.privateData,
            email: data.email,
            mobile: {
              countryCode: data.mobile.countryCode,
              mobileNumber: data.mobile.mobileNumber,
            },
            location: data.location,
          },
        })
      );
      navigate("/onboard/ob2");
    }
  };

  // const handleLocationChange = (
  //   address: IUserwithPrivateData["privateData"]["location"]
  // ) => {
  //   return setData((prev) => ({ ...prev, location: address }));
  // };

  return (
    <div className="flex flex-1 flex-col justify-between items-end gap-4 py-8 ">
      <h1 className="self-stretch text-2xl text-primary-300 font-bold">
        Tell us about yourself
      </h1>
      <div className="w-full flex  justify-center gap-5">
        <Button
          className=" text-sm center"
          color="default"
          isDisabled={Boolean(userData.privateData.linkedin.email)}
          onClick={() => {
            window.location.href = getLinkedinOAuthUrl();
          }}
        >
          <img src="/linkedin.svg" alt="Linkedin" className="h-6 w-6" />
          LinkedIn
        </Button>

        <Button
          className=" text-sm center"
          color="default"
          isDisabled={Boolean(userData.privateData.twitter.id)}
          onClick={() => {
            window.location.href = getTwitterOAuthUrl();
          }}
        >
          <img src="/x.svg" alt="X" className="h-6 w-6" />X (Twitter)
        </Button>
      </div>
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
        <p className="text-white text-sm mb-1">Mobile</p>
        <div className="flex justify-center items-center text-black relative ">
          <CountryCode
            countryCode={data.mobile.countryCode}
            onChange={(code) =>
              setData({
                ...data,
                mobile: { ...data.mobile, countryCode: code },
              })
            }
          />
          <Input
            name="mobile"
            isClearable
            type="tel"
            placeholder="99999 99999 99999"
            className="ml-2 hover:bg-[#e5e7eb] rounded-md"
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                mobile: {
                  countryCode: data.mobile.countryCode,
                  mobileNumber: e.target.value,
                },
              }));
            }}
            value={data.mobile.mobileNumber}
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

        <div className="w-full ">
          <PlaceSearch addLocation={addLocation} />
        </div>
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
