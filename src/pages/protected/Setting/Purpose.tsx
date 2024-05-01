import { useNavigate } from "react-router-dom";
import PurposeCustom from "../../../components/onboarding/PurposeCustom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { updateUserData } from "../../../redux/features/onBoardingSlice";
import { updateUserData as updateUserDataDB } from "../../../api/juno/user";

import { useContext, useState } from "react";
import { AuthContext } from "../../../context/Auth";

const Purpose = () => {
  const dispatch = useAppDispatch();
  const Navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { userDoc } = useAppSelector((state) => state.main);
  const [purpose, setPurpose] = useState(userDoc?.data.purpose);

  const handleChange = (value: string) => {
    setPurpose(value);
  };

  const backNavigate = () => {
    Navigate("/settings");
  };

  const handleSave = async () => {
    if (purpose !== userDoc?.data.purpose) {
      try {
        if (!userDoc?.key) return;
        const savedDoc = await updateUserDataDB(user, userDoc.key, {
          ...userDoc.data,
          purpose: purpose,
        });
        console.log(savedDoc);
        if (!savedDoc) return;
        dispatch(updateUserData({ purpose: purpose }));
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-start gap-6">
      <div className="flex gap-2 text-2xl z-10 relative top-4 left-0 items-center ">
        <img
          src="/icons/left-arrow.svg"
          alt="back-navigation"
          className="w-4 h-4 cursor-pointer"
          onClick={backNavigate}
        />
        <div>Purpose</div>
      </div>
      <PurposeCustom purpose={purpose} handleChange={handleChange} />
      {purpose !== userDoc?.data.purpose && (
        <div className="flex justify-center">
          <button
            className="border-[2px] p-2 px-4 rounded-lg border-blue-500 text-blue-950 hover:bg-blue-400  bg-blue-300"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Purpose;
