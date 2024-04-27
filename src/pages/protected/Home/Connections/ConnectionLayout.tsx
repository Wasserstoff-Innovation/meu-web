import InviteCard from "../../../../components/connection/InviteCard";
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";

const ConnectionLayout = () => {
  return (
    <div className="p-6">
      <TopBar />
      <div className="flex flex-col gap-4 overflow-y-auto h-[88vh] mt-4">
        <InviteCard />
        <Outlet />
      </div>
    </div>
  );
};

export default ConnectionLayout;
