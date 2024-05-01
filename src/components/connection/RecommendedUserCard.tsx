import { useNavigate, useRevalidator } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import { IUser } from "../../types/user";
import { toast } from "react-toastify";
import {
  ignoreRecommendation,
  sendRequest,
} from "../../api/connect/connection";
import { Button, Spinner } from "@nextui-org/react";

const RecommendedUserCard = ({ user }: { user: IUser }) => {
  const { userDoc } = useAppSelector((state) => state.main);
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const [loading, setLoading] = useState(false);
  const sendFriendRequest = async (user: IUser) => {
    try {
      setLoading(true);
      if (!userDoc?.data) return toast.error("Please Login again!");
      const response = await sendRequest(userDoc?.data, user);
      toast.success(response.message);
      revalidator.revalidate();
    } catch (err) {
      toast.error("Error sending request");
    } finally {
      setLoading(false);
    }
  };

  const ignoreUser = async (id: string) => {
    try {
      if (!id) return;
      const response = await ignoreRecommendation(id);
      console.log(response);
      revalidator.revalidate();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className="flex items-center justify-between"
      onClick={() => {
        navigate(`/profile/${user.userId}`);
      }}
    >
      <div className="flex items-center gap-4">
        <img src={user.avatar} alt="avatar" className="rounded-full size-10" />

        <div>
          <div className="text-[1rem] cursor-pointer">{user.name}</div>
          <div className="text-[0.8rem]">{user.bio}</div>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <Button
          color="primary"
          className="rounded-full  bg-[#1272BA]  cursor-pointer"
          isDisabled={loading}
          onClick={() => sendFriendRequest(user)}
        >
          {loading ? <Spinner /> : "Add"}
        </Button>
        <div
          onClick={(e) => {
            e.stopPropagation();
            ignoreUser(user.userId);
          }}
        >
          <img
            src="/icons/close.svg"
            alt="close"
            className="size-3 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default RecommendedUserCard;
