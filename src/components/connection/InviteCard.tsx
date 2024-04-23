// import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { Avatar } from "@nextui-org/react";

export default function InviteCard() {
  // const Navigate = useNavigate();
  const { userDoc } = useAppSelector((state) => state.main);
  return (
    <div className=" flex items-center justify-between p-2 border-1 bg-[#313437]  border-[#A3A5A6] rounded-md ">
      <div className="flex items-center gap-4">
        <Avatar src={userDoc?.data.avatar} size="lg" />
        <div className="flex flex-col justify-center text-[12px]">
          <div>Invite contact on MEU</div>
          <div className="text-[10px]">meu.com/johndoe</div>
        </div>
      </div>
      <div className="px-2">
        <img
          src="./share.svg"
          alt="share"
          className="w-[18px] h-[20px] cursor-pointer"
          // onClick={() => Navigate("/share-profile")}
        />
      </div>
    </div>
  );
}
