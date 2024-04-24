import { Avatar } from "@nextui-org/react";
import { useAppDispatch } from "../../redux/hooks";
import {
  setPopupData,
  setPopupType,
  togglePopup,
} from "../../redux/features/popupSlice";
import { IConnectionwithPrivateData } from "../../types/connection";
import { useNavigate } from "react-router-dom";

const ReceivedRequestCard = ({
  connection,
}: {
  connection: IConnectionwithPrivateData;
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleAccept = (id: string) => {
    console.log(id);
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
          onClick={() => handleAccept(connection.user.userId)}
        >
          Accept
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
