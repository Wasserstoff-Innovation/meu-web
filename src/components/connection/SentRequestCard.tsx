import { Avatar } from "@nextui-org/react";
import { useAppDispatch } from "../../redux/hooks";
import {
  setPopupData,
  setPopupType,
  togglePopup,
} from "../../redux/features/popupSlice";
import { IConnection } from "../../types/connection";
import { useNavigate } from "react-router-dom";

const SentRequestCard = ({ connection }: { connection: IConnection }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <div className="flex justify-between gap-4">
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
          className="cursor-pointer"
          onClick={() => {
            dispatch(setPopupType("DELETE_SENT_REQUEST"));
            dispatch(setPopupData(connection));
            dispatch(togglePopup());
          }}
        >
          <div className="">
            <img src="/icons/close.svg" alt="close" className="size-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentRequestCard;
