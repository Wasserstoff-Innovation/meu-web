import { useState } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import RequestCard from "../../../../components/connection/RequestCard";
import SearchUserLayout from "./SearchUserLayout";
import { IUser, IUserwithPrivateData } from "../../../../types/user";

const SentRequests = () => {
  const { sentRequests } = useAppSelector((state) => state.main);
  const [data, setData] = useState<IUser[]>(sentRequests);
  return (
    <SearchUserLayout data={data} setFilteredData={setData}>
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

export default SentRequests;
