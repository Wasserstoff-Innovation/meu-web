import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { SocketProvider } from "../context/Socket";

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
export { DashboardLayout, ProtectedLayout, OnBoardingLayout, Layout };
