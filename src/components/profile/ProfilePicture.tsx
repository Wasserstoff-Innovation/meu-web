import { useState } from "react";
import PopUpOption from "./PopUpOption";
import { IUser } from "../../types/user";
import { useLoaderData } from "react-router-dom";

const ProfilePicture = ({ user }: { user: IUser }) => {
  const [toggle, setToggle] = useState(false);
  const { profile } = useLoaderData() as { profile: IUser };
  const [userProfile] = useState<IUser>(profile);

  return (
    <div className="flex" onClick={() => setToggle(false)}>
      
      <div className="relative w-full min-h-72 max-h-72">
        <img src={user.avatar} className="min-h-64 max-h-64" />
        <div>
          <div className="absolute w-full top-4 px-4 flex justify-between gap-4">
            <div className="flex gap-4">
              <img
                src="/icons/arrow_left_alt.svg"
                alt="right arrow"
                className="cursor-pointer"
              />
              <p className="cursor-pointer">{user.name}</p>
            </div>
            <img
              src="/icons/option.svg"
              alt="option"
              className="cursor-pointer"
              onClick={(e) => {
                setToggle(!toggle);
                e.stopPropagation();
              }}
            />
            {toggle && <PopUpOption userProfile={userProfile}/>}
          </div>

          <div className="flex justify-between w-full px-4 items-center absolute bottom-4 ">
            <div className=" flex gap-4">
              <h1 className="text-[36px] cursor-pointer">{user.name}</h1>
            </div>
            <div className="p-2  rounded-full">
              <img src="/icons/share.svg" alt="share" className="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePicture;
