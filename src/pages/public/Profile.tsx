import { useLoaderData, useNavigate, useRevalidator } from "react-router-dom";
import { IUser } from "../../types/user";
import PopUpOption from "../../components/profile/PopUpOption";
import { useEffect, useState, useContext } from "react";
import { Button, Skeleton, Spinner } from "@nextui-org/react";
import SocialMedia from "../../components/profile/SocialMedia";
import Purpose from "../../components/profile/Purpose";
import Interests from "../../components/profile/Interests";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getProfileUrl } from "../../utils";
import { sendRequest } from "../../api/connect/connection";
import { toast } from "react-toastify";
import { IConnection, IConnectionwithPrivateData } from "../../types/connection";
import {
  setPopupData,
  setPopupType,
  togglePopup,
} from "../../redux/features/popupSlice";
import { acceptRequest } from "../../api/connect/connection";
import { saveConnection, getConnections } from "../../api/juno/connection";
import { updateConnections } from "../../redux/features/mainSlice";
import { AuthContext } from "../../context/Auth";

const Profile = () => {
  const { profile } = useLoaderData() as { profile: IUser };
  const [userProfile, setUserProfile] = useState<IUser>(profile);
  const { connections, userDoc } = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();
  const revalidator = useRevalidator();
  const friendRequests = useAppSelector((state) => state.friendRequest.friendRequests);
  const gotFriendRequests = useAppSelector((state) => state.gotFriendRequest.gotFriendRequests);
  const friendReqExists = friendRequests.some((obj: IConnection) => obj?.user?.userId === userProfile.userId);
  const gotFriendRequestExists = gotFriendRequests.some((obj: IConnection) => obj?.user?.userId === userProfile.userId);
  const currentProfile = friendReqExists ? friendRequests.find((obj: IConnectionwithPrivateData) => obj.user?.userId === userProfile.userId)! as IConnectionwithPrivateData : gotFriendRequests.find((obj: IConnectionwithPrivateData) => obj.user?.userId === userProfile.userId)! as IConnectionwithPrivateData;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const sendFriendRequest = async (user: IUser) => {
    try {
      setLoading(true);
      if (!userDoc?.data) return navigate("/login");
      const response = await sendRequest(userDoc?.data, user);
      toast.success(response.message);
      navigate("/connections/sent");
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message || "Error sending request");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (userDoc?.data.userId === profile.userId) {
      setUserProfile(userDoc.data);
    } else if (connections) {
      const user = connections.find(
        (item) => item.data.userId === profile.userId
      );
      if (user) {
        setUserProfile(user.data);
      }
    }
  }, [userDoc, connections, profile.userId]);

  const isConnection = userProfile.privateData ? true : false;
  const profileUrl = getProfileUrl(userProfile.userId);

  const onShare = (url: string) => {
    navigator.clipboard.writeText(url);
    navigator.share({
      title: "Share Profile",
      text: "Check out this profile",
      url: url,
    });
  };

  const handleAccept = async () => {
    setLoading(true);
    try {
      if (!userDoc?.data) return;
      const response = await acceptRequest(
        currentProfile?.connectionId,
        userDoc.data
      );
      await saveConnection(user, currentProfile?.user);
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

  return (
    <div
      className="flex flex-1 flex-col justify-start px-6 mt-4 gap-4 relative"
      onClick={() => setToggle(false)}
    >
      <div className=" w-full flex justify-between gap-4 ">
        <div
          className="flex gap-4"
          onClick={() => {
            navigate(-1);
          }}
        >
          <img
            src="/icons/arrow_left_alt.svg"
            alt="right arrow"
            className="cursor-pointer"
          />
          <p className="cursor-pointer">{userProfile.name}</p>
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
      </div>
      <div className="z-10">
        {toggle && <PopUpOption />}
      </div>
      <div className="h-80 w-full z-1">
        <Skeleton isLoaded={loaded} className="h-80 w-full  bg-transparent ">
          <img
            src={userProfile.avatar}
            onLoad={() => setLoaded(true)}
            className=" h-80 w-full object-cover "
          />
        </Skeleton>
      </div>
      <div className="flex justify-between w-full px-4 items-center  ">
        <div className=" flex gap-4">
          <h1 className="text-4xl cursor-pointer">{userProfile.name}</h1>
        </div>
        <div className=" rounded-full " onClick={() => onShare(profileUrl)}>
          <img src="/icons/share.svg" alt="share" className="cursor-pointer" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <p>{userProfile.pronouns}</p>
          <p>{userProfile.bio}</p>
        </div>
        <div>
          <p className="text-[#8D8E90]">{userProfile.purpose}</p>
          {isConnection && (
            <p className="text-[#8D8E90]">
              {userProfile.privateData?.location.address}
            </p>
          )}
        </div>
        {isConnection && (
          <div className="text-[#8D8E90]">
            <p>You both connected at Pragati Maidan on Feb 29, 2024.</p>
            <p>Your personal note for the person goes here.</p>
          </div>
        )}
        <hr className="border-[1px] border-[#A3A5A6]" />
      </div>
      {isConnection && (
        <SocialMedia
          linkedIn={userProfile.privateData?.linkedin}
          twitter={userProfile.privateData?.twitter}
        />
      )}

      <Purpose purpose={userProfile.purpose} />
      <Interests interests={userProfile.interests} />
      <div className="mb-4 ">
        {isConnection ? (
          <Button
            color="primary"
            title="Share Profile"
            className="w-full"
            // icon="/icons/share-white.svg"
            onClick={() => {
              onShare(profileUrl);
            }}
          >
            Share Profile
          </Button>
        ) : (
          friendReqExists ? <Button
          color="primary"
          className="w-full"
          isDisabled={loading}
          // icon="../icons/add.svg"
          onClick={() => {
            dispatch(setPopupType("DELETE_SENT_REQUEST"));
            dispatch(setPopupData(userProfile));
            dispatch(togglePopup());
          }}
        >
          {loading && <Spinner />}
          Cancle Request
        </Button> : gotFriendRequestExists ? <Button
          color="primary"
          className="w-full"
          isDisabled={loading}
          // icon="../icons/add.svg"
          onClick={handleAccept}
        >
          {loading && <Spinner />}
          Accept Request
        </Button> :
          <Button
            color="primary"
            className="w-full"
            isDisabled={loading}
            // icon="../icons/add.svg"
            onClick={() => sendFriendRequest(userProfile)}
          >
            {loading && <Spinner />}
            Add
          </Button>
        )}
      </div>
    </div>
  );
};

export default Profile;
