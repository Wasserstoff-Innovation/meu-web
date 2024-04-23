import { Avatar } from "@nextui-org/react";
import { IUserwithPrivateData } from "../../types/user";
import { useAppDispatch } from "../../redux/hooks";
import {
  setPopupData,
  setPopupType,
  togglePopup,
} from "../../redux/features/popupSlice";

const ReceivedRequestCard = ({ user }: { user: IUserwithPrivateData }) => {
  const dispatch = useAppDispatch();
  const handleAccept = (id: string) => {
    console.log(id);
  };
  return (
    <div className="flex items-center gap-4">
      <Avatar src={user.avatar} size="lg" />
      <div className="flex flex-col justify-center text-[12px]">
        <div>{user.name}</div>
        <div className="text-[10px]">{user.pronouns}</div>
      </div>

      <div className="flex gap-4 items-center">
        <div
          className="bg-[#1272BA] p-1 text-[10px] px-4   rounded-full cursor-pointer shadow-sm"
          onClick={() => handleAccept(user.userId)}
        >
          Accept
        </div>

        <div
          className="cursor-pointer"
          onClick={() => {
            dispatch(setPopupType("REJECT_REQUEST"));
            dispatch(setPopupData(user.userId));
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
