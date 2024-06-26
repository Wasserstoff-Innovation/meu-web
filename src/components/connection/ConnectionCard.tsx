import { Avatar } from "@nextui-org/react";
import { useAppDispatch } from "../../redux/hooks";
import {
  setPopupData,
  setPopupType,
  togglePopup,
} from "../../redux/features/popupSlice";
import { useNavigate } from "react-router-dom";
import { Doc } from "@junobuild/core";
import { IConnectedUser } from "../../types/user";

const ConnectionCard = ({
  connectionDoc,
}: {
  connectionDoc: Doc<IConnectedUser>;
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <div className="flex justify-between gap-4">
      <div
        className="flex gap-3 cursor-pointer"
        onClick={() => {
          navigate(`/profile/${connectionDoc.data.userId}`);
        }}
      >
        <Avatar src={connectionDoc.data.avatar} size="lg" className="min-w-[56px]"/>
        <div className="flex flex-col justify-center text-[12px]">
          <div>{connectionDoc.data.name}</div>
          <div className="text-[10px]">{connectionDoc.data.pronouns}</div>
          <div>
          {
            connectionDoc.data.note && <p className="text-wrap">{connectionDoc.data.note}</p>
          }
        </div>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <div
          className="cursor-pointer"
          onClick={() => {
            dispatch(setPopupType("DELETE_CONNECTION"));
            dispatch(setPopupData(connectionDoc));
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

export default ConnectionCard;
