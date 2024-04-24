import Navbar from "../../../components/Home/Navbar";
import RecommendedUserCard from "../../../components/connection/RecommendedUserCard";
import { getRecommended } from "../../../api/connect/connection";
import { useLoaderData } from "react-router-dom";
import { IUser } from "../../../types/user";

// eslint-disable-next-line react-refresh/only-export-components
export const homeLoader = async () => {
  const recommendedCards = await getRecommended();
  return { recommendedCards };
};

const Home = () => {
  const { recommendedCards } = useLoaderData() as { recommendedCards: IUser[] };

  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col gap-4 overflow-y-auto h-[83vh]">
        <h1>Recommended Users</h1>
        {recommendedCards.map((user) => (
          <RecommendedUserCard user={user} key={user.userId} />
        ))}
      </div>
    </div>
  );
};

export default Home;
