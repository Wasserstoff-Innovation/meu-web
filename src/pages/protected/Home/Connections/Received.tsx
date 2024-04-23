import { useState } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import RequestCard from "../../../../components/connection/RequestCard";
import SearchUserLayout from "./SearchUserLayout";
import { IUser, IUserwithPrivateData } from "../../../../types/user";
import { useLoaderData } from "react-router-dom";

const Received = () => {
  const { requests } = useLoaderData() as { requests: IUserwithPrivateData[] };
  console.log(requests);
  const { receivedRequests } = useAppSelector((state) => state.main);
  const [data, setData] = useState<IUser[]>(receivedRequests);
  return (
    <SearchUserLayout data={receivedRequests} setFilteredData={setData}>
      <div className="flex flex-col gap-4">
        {data.map((userData) => (
          <RequestCard
            key={userData.userId}
            user={userData as unknown as IUserwithPrivateData}
          />
        ))}
      </div>
    </SearchUserLayout>
  );
};

export default Received;
