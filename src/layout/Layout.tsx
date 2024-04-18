import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { SocketProvider } from "../context/Socket";
import BottomNav from "../components/Home/BottomNav";

const ProtectedLayout = () => {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

const OnBoardingLayout = () => {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

const DashboardLayout = () => {
  return (
    <Fragment>
      <SocketProvider>
        <Outlet />
      </SocketProvider>
    </Fragment>
  );
};
const Layout = () => {
  return <Outlet />;
};
const BottomNavLayout = () => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto h-[88vh] mt-3">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
};
export {
  DashboardLayout,
  ProtectedLayout,
  OnBoardingLayout,
  Layout,
  BottomNavLayout,
};
