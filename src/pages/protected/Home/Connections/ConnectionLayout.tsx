import InviteCard from "../../../../components/connection/InviteCard";
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";

const ConnectionLayout = () => {
  return (
    <>
      <TopBar />
      <div className="flex flex-col gap-4 overflow-y-auto h-[88vh]">
        <InviteCard />
        <Outlet />
      </div>
    </>
  );
};

export default ConnectionLayout;
