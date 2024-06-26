import { useState, useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IUser, IUserwithPrivateData } from "../../types/user";
import { updateConnections } from "../../redux/features/mainSlice";
import { getConnections, updateConnection } from "../../api/juno/connection";
import { AuthContext } from "../../context/Auth";
import { Spinner } from "@nextui-org/react";
import { toast } from "react-toastify";
import { setPopupData, setPopupType, togglePopup } from "../../redux/features/popupSlice";
import { getProfileUrl } from "../../utils";

const options = [
  { title: "Share Profile", icon: "/icons/share-white.svg", isRed: false },
  { title: "Get Directions", icon: "/icons/explore.svg", isRed: false },
  { title: "Add Note", icon: "/icons/edit.svg", isRed: false },
  { title: "Block", icon: "/icons/block.svg", isRed: true },
  { title: "Remove Connection", icon: "/icons/person_remove.svg", isRed: true },
  { title: "Report", icon: "/icons/warning.svg", isRed: true },
];

interface PopUpOptionProps {
  userProfile: IUser | IUserwithPrivateData;
}

const PopUpOption: React.FC<PopUpOptionProps> = ({ userProfile }) => {
  const [loading, setLoading] = useState(false);
  const profileUrl = getProfileUrl(userProfile.userId);
  const [showInput, setShowInput] = useState(false);
  const [note, setNote] = useState("");
  const { connections } = useAppSelector((state) => state.main);
  const curConnection = connections.find(
    (connection) => connection.data.userId === userProfile.userId
  );
  const conExist = connections.some(
    (connection) => connection.data.userId === userProfile.userId
  );
  const optionsList = !conExist ? options.filter((option) => option.title !== "Add Note" && option.title !== "Remove Connection") : options
  const dispatch = useAppDispatch();
  const { user } = useContext(AuthContext);
  const username = userProfile.name;

  const handleOptionClick = (title: string) => {
    switch (title) {
      case "Add Note":
        setShowInput(true);
        break;

      case "Remove Connection":
        removeConnection();
        break
      default:
        break;

      case "Share Profile":
        onShare(profileUrl);
        break
    }
  };

  const handleAddNote = async () => {
    setLoading(true);
    try {
      if (curConnection) {
        // const updatedConnection: IUserwithPrivateData = {
        //   ...curConnection.data,
        //   addNote: note,
        // };
        await updateConnection(user, curConnection.data.userId, {
          ...curConnection.data,
          note: note,
        });
        const latestConnections = await getConnections(user);
        if (latestConnections !== undefined) {
          dispatch(updateConnections(latestConnections));
        }
        setShowInput(false);
        setNote("");
      }
    }
    catch (error) {
      console.error(error);
      toast.error("Failed to Add Note");
    }
    finally {
      setLoading(false);
    }
  };

  const removeConnection = async () => {
    try {
      dispatch(setPopupType("DELETE_CONNECTION"));
      dispatch(setPopupData(curConnection));
      dispatch(togglePopup());
    }
    catch (error) {
      console.error(error);
      toast.error("Failed to Remove Connection");
    }
    finally {
    }
  }

  const onShare = (url: string) => {
    navigator.clipboard.writeText(url);
    navigator.share({
      title: "Share Profile",
      text: "Check out this profile",
      url: url,
    });
  };

  return (
    <div>
      <div
        className="absolute right-5 top-8 bg-[#1A1D21] p-4 rounded-lg mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {optionsList.map((option, index) => (
            <div
              className={`flex gap-4 p-2 cursor-pointer ${option.isRed && "text-[#DB4437]"
                }`}
              key={index}
              onClick={() => handleOptionClick(option.title)}
            >
              <img src={option.icon} alt={option.icon} />
              <p>
                {option.title}{" "}
                {(option.title === "Block" || option.title === "Report") &&
                  username}
              </p>
            </div>
          ))}
      </div>

      {showInput && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center">
          <div
            className="bg-[#1f2021] border-[#A3A5A6] text-black p-4 rounded-lg mt-20"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-6 text-2xl font-semibold text-white">Add Note</h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="bg-white border-[#A3A5A6] p-2 rounded w-full"
              placeholder="Enter your note"
            />
            <div className="mt-4 bg-blue-500 text-white p-2 rounded w-full flex justify-center" onClick={handleAddNote}>
              {loading ? <Spinner size="md" /> : "Add"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopUpOption;
