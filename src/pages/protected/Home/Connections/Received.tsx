import { useEffect, useState } from "react";
import ReceivedRequestCard from "../../../../components/connection/ReceivedRequestCard";
import SearchUserLayout from "./SearchUserLayout";
import { useLoaderData } from "react-router-dom";
import {
  IConnection,
  IConnectionwithPrivateData,
} from "../../../../types/connection";

const Received = () => {
  const { requests } = useLoaderData() as { requests: IConnection[] };
  console.log(requests);

  useEffect(() => {
    setData(requests);
  }, [requests]);
  // const { receivedRequests } = useAppSelector((state) => state.main);
  const [data, setData] = useState<IConnection[]>(requests);
  return (
    <SearchUserLayout data={data} setFilteredData={setData}>
      <div className="flex flex-col gap-4">
        {data.map((connect) => (
          <ReceivedRequestCard
            key={connect.connectionId}
            connection={connect as IConnectionwithPrivateData}
          />
        ))}
      </div>
    </SearchUserLayout>
  );
};

export default Received;
