import { Avatar, Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { updateUserData } from "../../../redux/features/onBoardingSlice";
//import ImagePickerModal from '../../../components/Modal'
import { useState } from "react";

interface UserData {
  avatar: string;
  username: string;
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
  const [data, setData] = useState<UserData>({
    avatar: userData.avatar,
    username: userData.username,
    bio: userData.bio,
    pronounns: userData.pronounns,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};

    switch (true) {
      case !data.username.trim().length:
        newErrors.username = "Username is required";
        break;
      case data.username.length < 2 || data.username.length > 30:
        newErrors.username = "Username must be between 2 and 30 characters";
        break;
      case !/^[a-zA-Z0-9_.]+$/.test(data.username):
        newErrors.username =
          "Username must not include any special characters except '.' and '_'";
        break;
      default:
        break;
    }

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
        ...userData,
        avatar: data.avatar,
        username: data.username,
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

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const filePath = reader.result as string;
        if (!filePath) {
          return console.error("Error reading file");
        }
        setData((prev) => ({
          ...prev,
          avatar: filePath, // Set the file path to the avatar field
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    document.getElementById("avatar-input")?.click();
  };

  return (
    <div className="flex flex-1 flex-col justify-between items-end gap-4 ">
      <h1 className="self-stretch text-2xl text-primary-300 font-bold">
        Setup your Profile
      </h1>
      <Avatar
        src={data.avatar}
        size="lg"
        className="self-center w-32 h-32 cursor-pointer"
        onClick={handleAvatarClick}
      />
      <input
        type="file"
        id="avatar-input"
        accept="image/*"
        onChange={handleAvatarChange}
        style={{ display: "none" }}
      />

      <div className="w-full">
        <p className="text-white text-sm mb-1">Username </p>
        <Input
          type="text"
          placeholder="johndoe"
          isClearable
          value={data.username}
          onChange={(e) => handleChange("username", e.target.value)}
        />
        <p className="text-red-500 text-xs mt-1">{errors.username}</p>
        <p className="text-white text-xs mt-1">
          Your username can have 2-30 characters and must not include any
          special characters except from “.” & “_”
        </p>
      </div>
      <div className="w-full">
        <p className="text-white text-sm mb-1">Bio </p>
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
      <div className="w-full">
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
          className="mt-2 text-sm"
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
