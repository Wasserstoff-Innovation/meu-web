import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CustomAvatar from "../../../components/common/CustomAvatar";
import { AuthContext } from "../../../context/Auth";

const EditProfile = () => {
  const { savedUserData } = useContext(AuthContext);
  const Navigate = useNavigate();
  // const handleChange = (e: any) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       if (typeof reader.result === "string") {
  //         setProfileImg(reader.result);
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  const backNavigate = () => {
    Navigate("/settings");
  };

  return (
    <div className="flex flex-col justify-between gap-6">
      <div>
        <div
          className="flex gap-2  text-2xl z-10 relative top-4 left-0 items-center"
          onClick={backNavigate}
        >
          <img
            src="/left-arrow.svg"
            alt="back-navigation"
            className="w-4 h-4"
          />
          <div>Edit Profile</div>
        </div>
        <div className="flex justify-center mt-10">
          <CustomAvatar srcData={savedUserData?.data.avatar} />
        </div>
        {/* <div className="-m-[28px] bg-gradient-to-b to-black-900 from-black-0">
          <img src={profileImg} alt="profileimg" />
        </div> */}
        {/* <div className="flex gap-2 justify-center text-xl font-semibold">
          <label htmlFor="profile-picture" className="cursor-pointer flex gap-2 justify-center">
            <img src="/camara.svg" alt="profileimg" />
            <div>Update Profile Picture</div>
          </label>
          <input
            id="profile-picture"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
        </div> */}
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-xl font-semibold">BASIC DETAILS</div>
        <div className="w-full">
          <p className="text-white text-lg mb-1">Full Name </p>
          <input
            className="bg-[#313437] border border-white rounded-md px-3 py-2 text-white w-full"
            name="name"
            type="text"
            placeholder="John Doe"
            // onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <p className="text-white text-lg mb-1">Username</p>
          <input
            className="bg-[#313437] border border-white rounded-md px-3 py-2 text-white w-full"
            name="name"
            type="text"
            placeholder="@johndoe"
            // onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <p className="text-white text-lg mb-1">Pronouns </p>
          <input
            className="bg-[#313437] border border-white rounded-md px-3 py-2 text-white w-full"
            name="name"
            type="text"
            placeholder="he/her"
            // onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <p className="text-white text-lg mb-1">Bio </p>
          <input
            className="bg-[#313437] border border-white rounded-md px-3 py-2 text-white w-full"
            name="name"
            type="text"
            placeholder="Bio..."
            // onChange={handleChange}
          />
        </div>
      </div>
      <hr className="border-[#D9D9D9] border-[0.5px]" />
      <div>
        <div className="text-xl font-semibold">PROFESSIONAL DETAILS</div>
      </div>
    </div>
  );
};

export default EditProfile;
