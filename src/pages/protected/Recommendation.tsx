import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const RecommendedUsers = [
  { id: 1, name: "John Doe", username: "john doe" },
  { id: 2, name: "John Doe", username: "john doe" },
  { id: 3, name: "John Doe", username: "john doe" },
  { id: 4, name: "John Doe", username: "john doe" },
  { id: 5, name: "John Doe", username: "john doe" },
  { id: 6, name: "John Doe", username: "john doe" },
  { id: 7, name: "John Doe", username: "john doe" },
  { id: 8, name: "John Doe", username: "john doe" },
  { id: 9, name: "John Doe", username: "john doe" },
  { id: 10, name: "John Doe", username: "john doe" },
  { id: 11, name: "John Doe", username: "john doe" },
  { id: 12, name: "John Doe", username: "john doe" },
  { id: 13, name: "John Doe", username: "john doe" },
  { id: 14, name: "John Doe", username: "john doe" },
  { id: 15, name: "John Doe", username: "john doe" },
];

const Recommendation = () => {
  const [users, setUsers] = useState(RecommendedUsers);

  const sendFriendRequest = (id: number) => {
    console.log("Friend Request is sent...!", id);
  };

  const handleClick = (id: number) => {
    const tempArr = users.filter((user) => user.id !== id);
    setUsers(tempArr);
  };

  return (
    <>
      <div className="">
        <Navbar />
        <div className="flex flex-col gap-4 overflow-y-auto">
          <h1>Recommended Users</h1>
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between px-4"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-full cursor-pointer size-12 bg-[url('./avatar.png')] bg-cover"></div>

                <div>
                  <div className="text-[1rem] cursor-pointer">{user.name}</div>
                  <div className="text-[0.8rem]">{user.username}</div>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <button
                  color="primary"
                  className="rounded-full p-2 bg-[#1272BA] px-8 cursor-pointer"
                  onClick={() => sendFriendRequest(user.id)}
                >
                  Add
                </button>
                <img
                  onClick={() => handleClick(user.id)}
                  src="./close.svg"
                  alt="close"
                  className="size-5 cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Recommendation;
