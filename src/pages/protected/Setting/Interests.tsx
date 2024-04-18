import { useNavigate } from "react-router-dom";
import Interests from "../../../components/onboarding/Interests";
import { useState, useContext } from "react";
import { Button } from "@nextui-org/react";
import { updateUserData } from "../../../api/juno/user";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { AuthContext } from "../../../context/Auth";
import { updateUserDoc } from "../../../redux/features/mainSlice";

const Interest = () => {
  const [active, setActive] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { user } = useContext(AuthContext);
  // State variables for each switch
  const Navigate = useNavigate();
  const { userDoc } = useAppSelector((state) => state.main);
  const [groupSelected, setGroupSelected] = useState(
    userDoc?.data.interests || []
  );


  const handleSave = async () => {
    if (groupSelected.length < 3) {
      console.log("Selected Interest must be greater than 2.");
      return;
    }
    try {
      if (!userDoc?.key) return;
      const savedDoc = await updateUserData(user, userDoc.key, {
        ...userDoc.data,
        ...groupSelected,
      });
      console.log(savedDoc);
      if (!savedDoc) return;
      dispatch(updateUserDoc(savedDoc));
      Navigate("/settings");
    } catch (e) {
      console.error(e);
    }
    console.log(userDoc);
  };

  return (
    <div
      className="flex flex-col min-h-screen justify-between py-1 pb-4"
      onClick={() => setActive(false)}
    >
      <div>
        <div className="flex gap-2 text-2xl items-center p-2 mt-4 ">
          <img
            src="/left-arrow.svg"
            alt="back-navigation"
            className="size-4 cursor-pointer"
            onClick={() => {
              Navigate("/settings");
            }}
          />
          <div className="px-2 ">Interest</div>
        </div>
        {/* rest code here */}
        <div>
          <Interests
            active={active}
            setActive={setActive}
            groupSelected={groupSelected}
            setGroupSelected={setGroupSelected}
          />
          {/* {userData?.interests.length && (
          <Interests
            interests={userData?.interests.map(
              (interest) => interest.label
            )}
          />
        )} */}
        </div>
      </div>
      {userDoc?.data.interests != groupSelected && (
        <Button
          className="mt-2 text-sm "
          color="primary"
          size="lg"
          onClick={handleSave}
        >
          Save Interests
        </Button>
      )}
    </div>
  );
};

export default Interest;
