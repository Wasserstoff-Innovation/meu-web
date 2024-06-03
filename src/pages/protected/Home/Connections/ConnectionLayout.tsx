import TopBarProgress from "react-topbar-progress-indicator";
import InviteCard from "../../../../components/connection/InviteCard";
import { loaderConfig } from "../../../../config";
import TopBar from "./TopBar";
import { Outlet, useNavigation } from "react-router-dom";

TopBarProgress.config(loaderConfig);

const ConnectionLayout = () => {
  const navigation = useNavigation();
  return (
    <div className="p-6">
      <TopBar />
      <div className="flex flex-col gap-4 overflow-y-auto mt-4">
        <InviteCard />
        {navigation.state == "loading" ? <TopBarProgress /> : <Outlet />}
      </div>
    </div>
  );
};

export default ConnectionLayout;
