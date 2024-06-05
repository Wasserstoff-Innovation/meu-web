import { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  addIfNewConnection,
  getConnections,
} from "../../../../api/juno/connection";
import { AuthContext } from "../../../../context/Auth";
import { updateConnections } from "../../../../redux/features/mainSlice";
import ConnectionCard from "../../../../components/connection/ConnectionCard";
import { getAcceptedRequests } from "../../../../api/connect/connection";
import TopBarProgress from "react-topbar-progress-indicator";
import { loaderConfig } from "../../../../config";
TopBarProgress.config(loaderConfig);

const Connections = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const { connections } = useAppSelector((state) => state.main);

  // const [data, setData] = useState<Doc<IUserwithPrivateData>[]>(connections);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncConnections = async () => {
      try {
        setLoading(true);
        getAcceptedRequests()
          .then(async (acceptedRequests) => {
            console.log(acceptedRequests);
            if (acceptedRequests.length > 0) {
              for (const acceptedRequest of acceptedRequests) {
                await addIfNewConnection(user, acceptedRequest.receiver);
              }
            }
          })
          .catch((e) => {
            console.log(e);
          });
        const connections = await getConnections(user);
        if (connections !== undefined) {
          dispatch(updateConnections(connections));
          // setData(connections);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    syncConnections();
  }, [dispatch, user]);

  const [searchInput, setSearchInput] = useState("");
  const FilterData = (val: string) => {
    const filterData = connections.filter(
      (item) =>
        item.data.name.toLowerCase().includes(val) ||
        item.data.userId.toLowerCase().includes(val)
    );
    dispatch(updateConnections(filterData));
  };

  const handleChange = (value: string) => {
    setSearchInput(value);
    const val = value.toLowerCase();
    FilterData(val);
  };
  return (
    <>
      {loading && <TopBarProgress />}
      <div className="flex flex-col sticky top-0 gap-4 bg-[#1A1D21] ">
        <div className="flex gap-2 items-center p-2 border-1 bg-[#313437] border-[#A3A5A6] rounded-md">
          <div>
            <img src="/icons/search.svg" alt="" />
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
        <div className="flex flex-col gap-4 overflow-y-auto h-[60vh]">
          {connections.map((connectionDoc) => (
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
