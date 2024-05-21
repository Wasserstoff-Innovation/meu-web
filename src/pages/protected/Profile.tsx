import { useLoaderData, useNavigate, useRevalidator } from "react-router-dom";
import { IUser } from "../../types/user";
import PopUpOption from "../../components/profile/PopUpOption";
import { useContext, useEffect, useState } from "react";
import { Button, Skeleton, Spinner } from "@nextui-org/react";
import SocialMedia from "../../components/profile/SocialMedia";
import Purpose from "../../components/profile/Purpose";
import Interests from "../../components/profile/Interests";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
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
import { getConnections, saveConnection } from "../../api/juno/connection";
import { updateConnections } from "../../redux/features/mainSlice";
import { AuthContext } from "../../context/Auth";

const Profile = () => {
  const { profile } = useLoaderData() as { profile: IUser };
  const profileId = profile.userId;

  const requests = useAppSelector((state) => state.friendRequest.friendRequests);
  const gotRequests = useAppSelector((state) => state.gotFriendRequest.gotFriendRequests);

  useEffect(() => {
    if (requests.length > 0) {
      localStorage.setItem("requestStates", JSON.stringify(requests));
    }

    if (gotRequests.length > 0) {
      localStorage.setItem("gotRequestStates", JSON.stringify(gotRequests));
    }
  }, [requests, gotRequests]);

  let curPro;
  let exists;
  if (requests.length > 0) {
    curPro = requests.find((obj: IConnectionwithPrivateData) => obj.user?.userId === profileId);
    exists = requests.some((obj: IConnection) => obj?.user?.userId === profileId);
  } else {
    const reqsStates = JSON.parse(localStorage.getItem("requestStates") || "[]") as IConnectionwithPrivateData[];
    curPro = reqsStates.find((obj: IConnectionwithPrivateData) => obj.user?.userId === profileId);
    exists = reqsStates.some((obj: IConnection) => obj?.user?.userId === profileId);
  }

  let currProfile;
  let gotRequestExists;
  if (gotRequests.length > 0) {
    currProfile = gotRequests.find((obj: IConnectionwithPrivateData) => obj.user?.userId === profileId)! as IConnectionwithPrivateData;
    gotRequestExists = gotRequests.some((gotReqs: IConnection) => gotReqs?.user?.userId === profileId);
  } else {
    const gotReqsStates = JSON.parse(localStorage.getItem("gotRequestStates") || "[]") as IConnectionwithPrivateData[];
    currProfile = gotReqsStates.find((obj: IConnectionwithPrivateData) => obj.user?.userId === profileId)! as IConnectionwithPrivateData;
    gotRequestExists = gotReqsStates.some((gotReqs: IConnection) => gotReqs?.user?.userId === profileId);
  }

  const currProfConnectId = currProfile?.connectionId;
  const [userProfile, setUserProfile] = useState<IUser>(profile);
  const { connections, userDoc } = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const revalidator = useRevalidator();
  const { user } = useContext(AuthContext);

  const sendFriendRequest = async (user: IUser) => {
    try {
      setLoading(true);
      if (!userDoc?.data) return navigate("/login");
      const response = await sendRequest(userDoc?.data, user);
      toast.success(response.message);
      navigate("/sent");
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
      const user = connections.find((item) => item.data.userId === profile.userId);
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
    try {
      if (!userDoc?.data) return;
      const response = await acceptRequest(currProfConnectId, userDoc.data);
      await saveConnection(user, currProfile.user);
      const latestConnections = await getConnections(user);
      if (latestConnections !== undefined) {
        dispatch(updateConnections(latestConnections));
      }
      debugger
      console.log(response);
      revalidator.revalidate();
      navigate("/requests")
    } catch (error) {
      console.error(error);
      toast.error("Failed to Accept request");
    } finally {
      setLoading(false);
    }
  };

  console.log("--> ", isConnection, exists, gotRequestExists);

  return (
    <div
      className="flex flex-1 flex-col justify-start px-6 mt-4 gap-4"
      onClick={() => setToggle(false)}
    >
      <div className=" w-full flex justify-between gap-4 relative">
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
        {toggle && <PopUpOption />}
      </div>
      <div className="h-80 w-full ">
        <Skeleton isLoaded={loaded} className="h-80 w-full bg-transparent ">
          <img
            src={userProfile.avatar}
            onLoad={() => setLoaded(true)}
            className="h-80 w-full object-cover"
          />
        </Skeleton>
      </div>
      <div className="flex justify-between w-full px-4 items-center">
        <div className="flex gap-4">
          <h1 className="text-4xl cursor-pointer">{userProfile.name}</h1>
        </div>
        <div className="rounded-full" onClick={() => onShare(profileUrl)}>
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
      <div className="mb-4">
        {isConnection ? (
          <Button
            color="primary"
            title="Share Profile"
            className="w-full"
            onClick={() => {
              onShare(profileUrl);
            }}
          >
            Share Profile
          </Button>
        ) : exists ? (
          <Button
            color="primary"
            className="w-full"
            onClick={() => {
              dispatch(setPopupType("DELETE_SENT_REQUEST"));
              dispatch(setPopupData(curPro));
              dispatch(togglePopup());
            }}
          >
            Cancel Request
          </Button>
        ) : gotRequestExists ? (
          <Button
            color="primary"
            className="w-full"
            onClick={handleAccept}
          >
            Confirm Request
          </Button>
        ) : (
          <Button
            color="primary"
            className="w-full"
            isDisabled={loading}
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
