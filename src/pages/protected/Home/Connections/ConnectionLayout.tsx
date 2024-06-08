import TopBarProgress from "react-topbar-progress-indicator";
import InviteCard from "../../../../components/connection/InviteCard";
import { loaderConfig } from "../../../../config";
import TopBar from "./TopBar";
import { Outlet, useNavigation } from "react-router-dom";

TopBarProgress.config(loaderConfig);

const ConnectionLayout = () => {
  const navigation = useNavigation();
  return (
    <div className="px-6 pt-6 h-[calc(100vh-64px)] overflow-hidden">
      <TopBar />
      <div className="flex flex-col gap-2 h-[calc(100vh-44px-40px-64px)] mt-4 overflow-auto">
        <InviteCard />
        <div className="h-full flex flex-col overflow-hidden">
          {navigation.state == "loading" ? <TopBarProgress /> : <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default ConnectionLayout;
