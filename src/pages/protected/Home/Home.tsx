import Navbar from "../../../components/Home/Navbar";
import RecommendedUserCard from "../../../components/connection/RecommendedUserCard";
import { getRecommended } from "../../../api/connect/connection";
import { useLoaderData } from "react-router-dom";
import { IUser } from "../../../types/user";
import { useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const homeLoader = async () => {
  const recommendedCards = await getRecommended();
  return { recommendedCards };
};

const Home = () => {
  const { recommendedCards } = useLoaderData() as { recommendedCards: IUser[] };
  useEffect(() => {
    setData(recommendedCards);
  }, [recommendedCards]);

  const [data, setData] = useState<IUser[]>(recommendedCards);
  return (
    <div className="p-6">
      <Navbar />
      <div className="flex flex-col gap-4 overflow-y-auto h-[83vh]">
        <h1>Recommended Users</h1>
        {data.map((user) => (
          <RecommendedUserCard user={user} key={user.userId} />
        ))}
      </div>
    </div>
  );
};

export default Home;
