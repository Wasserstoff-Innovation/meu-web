
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <>
      <TopBar />
      <div className="flex flex-col gap-4 overflow-y-auto h-[88vh] mt-3">
        <Outlet/>
      </div>
    </>
  );
};

export default HomeLayout;
