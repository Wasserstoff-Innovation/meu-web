import { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { IUserwithPrivateData } from "../../../../types/user";
import { getConnections } from "../../../../api/juno/connection";
import { AuthContext } from "../../../../context/Auth";
import { updateConnections } from "../../../../redux/features/mainSlice";
import { Doc } from "@junobuild/core";
import ConnectionCard from "../../../../components/connection/ConnectionCard";

const Connections = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const syncConnections = async () => {
      const connections = await getConnections(user);
      if (connections !== undefined) {
        dispatch(updateConnections(connections));
        setData(connections);
      }
    };
    syncConnections();
  });

  const { connections } = useAppSelector((state) => state.main);

  const [data, setData] = useState<Doc<IUserwithPrivateData>[]>(connections);
  const [searchInput, setSearchInput] = useState("");
  const FilterData = (val: string) => {
    const filterData = data.filter(
      (item) =>
        item.data.name.toLowerCase().includes(val) ||
        item.data.userId.toLowerCase().includes(val)
    );
    setData(filterData);
  };

  const handleChange = (value: string) => {
    setSearchInput(value);
    const val = value.toLowerCase();
    FilterData(val);
  };
  return (
    <>
      <div className="flex flex-col sticky top-0 gap-4 bg-[#1A1D21] ">
        <div className="flex gap-2 items-center p-2 border-1 bg-[#313437] border-[#A3A5A6] rounded-md">
          <div>
            <img src="./search.svg" alt="" />
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => handleChange(e.target.value)}
              value={searchInput}
              placeholder="Search User"
              className="placeholder:text-white bg-[#313437] outline-none"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {" "}
        <div className="flex flex-col gap-4">
          {data.map((connectionDoc) => (
            <ConnectionCard
              key={connectionDoc.key}
              connectionDoc={connectionDoc}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Connections;
