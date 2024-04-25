import { Avatar, Spinner } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setPopupData,
  setPopupType,
  togglePopup,
} from "../../redux/features/popupSlice";
import { IConnectionwithPrivateData } from "../../types/connection";
import { useNavigate, useRevalidator } from "react-router-dom";
import { useContext, useState } from "react";
import { acceptRequest } from "../../api/connect/connection";
import { toast } from "react-toastify";
import { getConnections, saveConnection } from "../../api/juno/connection";
import { AuthContext } from "../../context/Auth";
import { updateConnections } from "../../redux/features/mainSlice";

const ReceivedRequestCard = ({
  connection,
}: {
  connection: IConnectionwithPrivateData;
}) => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const dispatch = useAppDispatch();
  const { userDoc } = useAppSelector((state) => state.main);
  const handleAccept = async () => {
    setLoading(true);
    try {
      if (!userDoc?.data) return;
      const response = await acceptRequest(
        connection.connectionId,
        userDoc.data
      );
      await saveConnection(user, connection.user);
      const latestConnections = await getConnections(user);
      if (latestConnections !== undefined) {
        dispatch(updateConnections(latestConnections));
      }
      console.log(response);
      revalidator.revalidate();
    } catch (error) {
      console.error(error);
      toast.error("Failed to Accept request");
    } finally {
      setLoading(false);
    }
  };
  console.log(connection);
  return (
    <div className="flex justify-between  gap-4">
      <div
        className="flex gap-3 cursor-pointer"
        onClick={() => {
          navigate(`/profile/${connection.user.userId}`);
        }}
      >
        <Avatar src={connection.user.avatar} size="lg" />
        <div className="flex flex-col justify-center text-[12px]">
          <div>{connection.user.name}</div>
          <div className="text-[10px]">{connection.user.pronouns}</div>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <div
          className="bg-[#1272BA] p-1 text-[10px] px-4   rounded-full cursor-pointer shadow-sm"
          onClick={handleAccept}
        >
          {loading ? <Spinner size="sm" /> : "Accept"}
        </div>

        <div
          className="cursor-pointer"
          onClick={() => {
            dispatch(setPopupType("REJECT_REQUEST"));
            dispatch(setPopupData(connection));
            dispatch(togglePopup());
          }}
        >
          <div className="">
            <img src="./close.svg" alt="close" className="size-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceivedRequestCard;
