import { useEffect, useState } from "react";
import SearchUserLayout from "./SearchUserLayout";
import { useLoaderData } from "react-router-dom";
import SentRequestCard from "../../../../components/connection/SentRequestCard";
import { IConnection } from "../../../../types/connection";
import { friendRequest } from "../../../../redux/features/mainSlice";
import {useAppDispatch } from "../../../../redux/hooks";

const SentRequests = () => {
  const { requests } = useLoaderData() as { requests: IConnection[] };

  const [data, setData] = useState<IConnection[]>(requests);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setData(requests);
    dispatch(friendRequest(requests));
  }, [requests]);

  return (
    <>
    <SearchUserLayout data={data} setFilteredData={setData}/>
    <div className="overflow-y-auto h-[60vh]">
      {data.map((connect) => (
        <SentRequestCard key={connect.connectionId} connection={connect} />
      ))}
    </div>
    </>
  );
};

export default SentRequests;
