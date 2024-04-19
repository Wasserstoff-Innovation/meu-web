import { useLoaderData, useNavigate,  } from "react-router-dom";
import { IUser } from "../../types/user";
import PopUpOption from "../../components/profile/PopUpOption";
import { useState } from "react";
import { Skeleton } from "@nextui-org/react";
import SocialMedia from "../../components/profile/SocialMedia";
import Purpose from "../../components/profile/Purpose";
import Interests from "../../components/profile/Interests";
import CustomButton from "../../components/profile/CustomButton";

const Profile = () => {
  const { card } = useLoaderData() as { card: IUser };
  const navigate= useNavigate();
  const [toggle, setToggle] = useState(false);
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="flex flex-1 flex-col justify-start mt-4 gap-4" onClick={()=>setToggle(false)}>
      <div className=" w-full flex justify-between gap-4 relative">
        <div className="flex gap-4" onClick={() => {navigate("/")}} >
          <img
             src="../arrow_left_alt.svg"
            alt="right arrow"
            className="cursor-pointer"
          />
          <p className="cursor-pointer">{card.name}</p>
        </div>
        <img
          src="../option.svg"
          alt="option"
          className="cursor-pointer"
          onClick={(e) => {
            setToggle(!toggle);
            e.stopPropagation();
          }}
        />
        {toggle && <PopUpOption />}
      </div>
      <div className="min-h-24">
        <Skeleton isLoaded={loaded} className=" bg-transparent ">
          <img
            src={card.avatar}
            onLoad={() => setLoaded(true)}
            className="rounded-full "
          />
        </Skeleton>
      </div>
      <div className="flex justify-between w-full px-4 items-center  ">
        <div className=" flex gap-4">
          <h1 className="text-4xl cursor-pointer">{card.name}</h1>
        </div>
        <div className=" rounded-full ">
          <img src="../share.svg" alt="share" className="cursor-pointer" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          {/* <p>{card.pronouns}</p> */}
          <p>{card.bio}</p>
        </div>
        <div>
          <p className="text-[#8D8E90]">{card.purpose}</p>
          {/* <p className="text-[#8D8E90]">
            {card.location.city} , {card.location.state} ,{" "}
            {card.location.country}
          </p> */}
        </div>
        {/* {isConnection && (
        <div className="text-[#8D8E90]">
          <p>You both connected at Pragati Maidan on Feb 29, 2024.</p>
          <p>Your personal note for the person goes here.</p>
        </div>
      )} */}
        <hr className="border-[1px] border-[#A3A5A6]" />
      </div>

      <SocialMedia />
      <Purpose purpose={card.purpose} />
      <Interests interests={card.interests.map((int) => int.label)} />
      <CustomButton title="Share Profile" icon="../share-white.svg" />
    </div>
  );
};

export default Profile;
