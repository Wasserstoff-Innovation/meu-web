import Navbar from "../../../components/Home/Navbar";
import { useAppSelector } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";

const Recommendation = () => {
  const { recommendedCards, userDoc } = useAppSelector((state) => state.main);
  const navigate = useNavigate();
  const sendFriendRequest = (id: string) => {
    console.log("Friend Request is sent...!", id);
  };

  return (
    // <Layout>
    <div className="">
      <Navbar avatar={userDoc?.data.avatar} />
      <div className="flex flex-col gap-4 overflow-y-auto h-[83vh]">
        <h1>Recommended Users</h1>
        {recommendedCards.map((user) => (
          <div
            key={user.userId}
            className="flex items-center justify-between"
            onClick={() => {
              navigate(`/card/${user.userId}`);
            }}
          >
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt="avatar"
                className="rounded-full size-10"
              />

              <div>
                <div className="text-[1rem] cursor-pointer">{user.name}</div>
                <div className="text-[0.8rem]">{user.bio}</div>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <button
                color="primary"
                className="rounded-full  bg-[#1272BA] px-6 p-1 cursor-pointer"
                onClick={() => sendFriendRequest(user.userId)}
              >
                Add
              </button>
              <img
                // onClick={() => handleClick(user.id)}
                src="./close.svg"
                alt="close"
                className="size-3 cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
    // </Layout>
  );
};

export default Recommendation;
