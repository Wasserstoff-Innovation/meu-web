import { useState } from "react";
import RequestCard from "../../../../components/connection/ReceivedRequestCard";
import SearchUserLayout from "./SearchUserLayout";
import { IUserwithPrivateData } from "../../../../types/user";
import { useLoaderData } from "react-router-dom";
import {
  IConnection,
  IConnectionwithPrivateData,
} from "../../../../types/connection";
type IReceivedRequest = {
  sender: IUserwithPrivateData;
  _id: string;
};
const Received = () => {
  const { requests } = useLoaderData() as { requests: IReceivedRequest[] };
  console.log(requests);
  // const { receivedRequests } = useAppSelector((state) => state.main);
  const [data, setData] = useState<IConnection[]>(
    requests.map((request) => ({
      connectionId: request._id,
      user: request.sender,
    }))
  );
  return (
    <SearchUserLayout data={data} setFilteredData={setData}>
      <div className="flex flex-col gap-4">
        {data.map((connect) => (
          <RequestCard
            key={connect.connectionId}
            connection={connect as IConnectionwithPrivateData}
          />
        ))}
      </div>
    </SearchUserLayout>
  );
};

export default Received;
