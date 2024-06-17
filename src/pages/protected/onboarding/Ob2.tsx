import { Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { updateUserData } from "../../../redux/features/onBoardingSlice";
//import ImagePickerModal from '../../../components/Modal'
import { useState } from "react";
import CustomAvatar from "../../../components/common/CustomAvatar";



interface FormErrors {
  username?: string;
  bio?: string;
  pronouns?: string;
}

const Ob2: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.onBoarding);
  const [avatar, setAvatar] = useState<string>(userData.avatar);
  const [data, setData] = useState({
    bio: userData.bio,
    pronouns: userData.pronouns,
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
      case data.pronouns.length < 2 || data.pronouns.length > 100:
        newErrors.pronouns = "Pronouns must be between 2 and 100 characters";
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
        pronouns: data.pronouns,
      };
      dispatch(updateUserData(updatedUserData));
      navigate("/onboard/ob3");
    }
  };

  const handleClear = (fieldName: string) => {
      setData({
        ...data,
        [fieldName]: "", // Clear the field
      });
  };

  const handleChange = (field: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div className="flex flex-1 flex-col justify-between items-end gap-4 h-screen">
      <div>
      <div className="max-h-max">
      <h1 className="self-stretch mt-4 text-2xl text-primary-300 font-bold z-10 relative left-0">
        Setup your Profile
      </h1>
      <div className="w-full flex flex-row justify-center relative bottom-[75px] mt-6 items-center">
        <CustomAvatar src={avatar} setSrc={setAvatar} />
      </div>
      </div>
      <div className="w-full">
        <p className="text-white text-sm mb-1">Bio/Headline </p>
        <Input
          type="text"
          isClearable
          value={data.bio}
          onClear={() => handleClear("bio")} // Clear the 'name' field
          onChange={(e) => handleChange("bio", e.target.value)}
        />
        <p className="text-red-500 text-xs mt-1">{errors.bio}</p>
        <p className="text-white text-xs mt-1">
          Your bio can have 2-150 characters.
        </p>
      </div>
      <div className="w-full">
        <p className="text-white text-sm mb-1">Pronouns </p>
        <Input
          type="text"
          placeholder="he/him"
          isClearable
          value={data.pronouns}
          onClear={() => handleClear("pronouns")} // Clear the 'name' field
          onChange={(e) => handleChange("pronouns", e.target.value)}
        />
        <p className="text-red-500 text-xs mt-1">{errors.pronouns}</p>
        <p className="text-white text-xs mt-1">
          Your pronouns can have 2-100 characters.
        </p>
      </div>
      </div>
      <div className="flex w-full justify-end">
        <Button
          className="mb-6 text-sm"
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
