import { Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { updateUserData } from "../../../redux/features/onBoardingSlice";
//import ImagePickerModal from '../../../components/Modal'
import { useState } from "react";
import CustomAvatar from "../../../components/common/CustomAvatar";

interface UserData {
  bio: string;
  pronounns: string;
}

interface FormErrors {
  username?: string;
  bio?: string;
  pronounns?: string;
}

const Ob2: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.onBoarding);
  const [avatar, setAvatar] = useState<string>(userData.avatar);
  const [data, setData] = useState<UserData>({
    bio: userData.bio,
    pronounns: userData.pronounns,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};

    switch (true) {
      case data.bio.length < 2 || data.bio.length > 150:
        newErrors.bio = "Bio must be between 2 and 150 characters";
        break;
      default:
        break;
    }

    switch (true) {
      case data.pronounns.length < 2 || data.pronounns.length > 100:
        newErrors.pronounns = "Pronouns must be between 2 and 100 characters";
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    const isFormValid = await validateForm();
    if (isFormValid) {
      const updatedUserData = {
        avatar: avatar,
        bio: data.bio,
        pronounns: data.pronounns,
      };
      dispatch(updateUserData(updatedUserData));
      navigate("/onboard/ob3");
    }
  };

  const handleChange = (field: keyof UserData, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div className="flex flex-1 flex-col justify-between items-end gap-4 ">
      <h1 className="self-stretch mt-4 text-2xl text-primary-300 font-bold">
        Setup your Profile
      </h1>
      <div className="w-full flex flex-row justify-center items-center">
        <CustomAvatar src={avatar} setSrc={setAvatar} />
      </div>
      <div className="w-full">
        <p className="text-white text-sm mb-1">Bio/Headline </p>
        <Input
          type="text"
          isClearable
          value={data.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
        />
        <p className="text-red-500 text-xs mt-1">{errors.bio}</p>
        <p className="text-white text-xs mt-1">
          Your bio can have 2-150 characters.
        </p>
      </div>
      <div className="w-full mb-64">
        <p className="text-white text-sm mb-1">Pronouns </p>
        <Input
          type="text"
          placeholder="he/him"
          isClearable
          value={data.pronounns}
          onChange={(e) => handleChange("pronounns", e.target.value)}
        />
        <p className="text-red-500 text-xs mt-1">{errors.pronounns}</p>
        <p className="text-white text-xs mt-1">
          Your pronouns can have 2-100 characters.
        </p>
      </div>
      <div className="flex w-full justify-end">
        <Button
          className="my-4 text-sm"
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

export default Ob2;
