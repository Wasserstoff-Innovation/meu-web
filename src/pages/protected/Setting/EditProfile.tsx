import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomAvatar from "../../../components/common/CustomAvatar";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Button } from "@nextui-org/react";
import { updateUserData } from "../../../api/juno/user";
import { AuthContext } from "../../../context/Auth";
import { updateUserDoc } from "../../../redux/features/mainSlice";

const EditProfile = () => {
  const { userDoc } = useAppSelector((state) => state.main);
  const { user } = useContext(AuthContext);
  const Navigate = useNavigate();
  const dispatch = useAppDispatch();
  const backNavigate = () => {
    Navigate("/settings");
  };
  const [avatar, setAvatar] = useState<string>(userDoc?.data.avatar || "");
  const [data, setData] = useState({
    name: userDoc?.data.name || "",
    pronouns: userDoc?.data.pronouns || "",
    bio: userDoc?.data.bio || "",
  });

  const saveData = async () => {
    try {
      if (!userDoc?.key) return;
      const savedDoc = await updateUserData(user, userDoc.key, {
        ...userDoc.data,
        ...data,
        avatar,
      });
      console.log(savedDoc);
      if (!savedDoc) return;
      dispatch(updateUserDoc(savedDoc));
      Navigate("/settings");
    } catch (e) {
      console.error(e);
    }
    console.log(userDoc)
  };

  return (
    <div className="flex flex-1 flex-col justify-start gap-6">
      <div>
        <div
          className="flex gap-2  text-2xl z-10 relative top-4 left-0 items-center"
          onClick={backNavigate}
        >
          <img
            src="/icons/left-arrow.svg"
            alt="back-navigation"
            className="w-4 h-4 cursor-pointer"
          />
          <div className="cursor-pointer">Edit Profile</div>
        </div>
        <div className="flex justify-center relative bottom-[75px] mt-10">
          <CustomAvatar setSrc={setAvatar} src={avatar} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-xl font-semibold">BASIC DETAILS</div>
        <div className="w-full">
          <p className="text-white text-lg mb-1">Full Name </p>
          <input
            className="bg-[#313437] border border-white rounded-md px-3 py-2 text-white w-full"
            name="name"
            type="text"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>

        <div className="w-full">
          <p className="text-white text-lg mb-1">Pronouns </p>
          <input
            className="bg-[#313437] border border-white rounded-md px-3 py-2 text-white w-full"
            type="text"
            value={data.pronouns}
            onChange={(e) => setData({ ...data, pronouns: e.target.value })}
          />
        </div>
        <div className="w-full">
          <p className="text-white text-lg mb-1">Bio </p>
          <input
            className="bg-[#313437] border border-white rounded-md px-3 py-2 text-white w-full"
            type="text"
            placeholder="Bio..."
            value={data.bio}
            onChange={(e) => setData({ ...data, bio: e.target.value })}
          />
        </div>

        <div className="w-full flex  justify-center mt-4">
          <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-full" onClick={saveData}>Save</Button>
        </div>
      </div>
      {/* <hr className="border-[#D9D9D9] border-[0.5px]" />
      <div>
        <div className="text-xl font-semibold">PROFESSIONAL DETAILS</div>
      </div> */}
    </div>
  );
};

export default EditProfile;
