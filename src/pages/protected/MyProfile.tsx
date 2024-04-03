import ProfilePicture from "../../components/profile/ProfilePicture";
import ProfileAbout from "../../components/profile/ProfileAbout";
import SocialMedia from "../../components/profile/SocialMedia";
import Purpose from "../../components/profile/Purpose";
import Interests from "../../components/profile/Interests";
import CustomButton from "../../components/profile/CustomButton";

const MyProfile = () => {
  return (
    <div className="flex flex-col gap-2 -mx-8">
      <ProfilePicture />
      <ProfileAbout isConnection={false} />
      <SocialMedia />
      <Purpose />
      <Interests />
      <CustomButton title="Share Profile" icon="./share-white.svg" />
    </div>
  );
};

export default MyProfile;
