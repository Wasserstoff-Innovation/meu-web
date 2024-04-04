import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const RecommandedUsers = [
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

const Recommandation = () => {
  const [users, setUsers] = useState(RecommandedUsers);

  const sendFriendRequest = (id: any) => {
    console.log("Friend Request is sent...!");
  };

  const handleClick = (id: any) => {
    const tempArr = users.filter((user) => user.id !== id);
    setUsers(tempArr);
  };

  return (
    <>
      <div className="-mx-8 h-[100vh]">
        <Navbar />
        <div className="flex flex-col gap-4 h-[80vh] overflow-y-auto">
          <h1>Recommended Users</h1>
          {users.map((user) => (
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full cursor-pointer size-12 bg-[url('https://s3-alpha-sig.figma.com/img/41bd/111a/617b61c4709a03d3444b62e630fc9ca2?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fzFa2JZZQFXYmu2ML7zzufdA3URFClJHqeYGy2ifR40nDr8gYWI4FktGK4hFqXsnJ6GA~J3JhYmZLcNlSJKFvzY5mV6DQXcLnFAHIAJFlz2oKeIu6hXZuaeCgCXFt8j1anZ9MtY9vsvnN5scB1LgR9S30lC-p05jU3YBJkkYurfQ787CAo7TMJD53IHpHrK-cXQ45PIIQJam5iH~Nm3MZZAjL2nxljDTiZ0D-0C0udb1sfeghjooJ~LiPL-0l91dwifpbYgpOv9ygcVaDUX3eL5KGB1o8F3WaIbc2jbjx~t5enk2byc3YLnN3jSUGDHETbewpqKjQtyex4ryK6S0QA__')] bg-cover"></div>

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

export default Recommandation;
