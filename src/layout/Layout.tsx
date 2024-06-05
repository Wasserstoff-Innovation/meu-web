import { Fragment, useEffect } from "react";
import { Outlet } from "react-router-dom";
// import { SocketProvider } from "../context/Socket";
import BottomNav from "../components/Home/BottomNav";
import { useAppSelector } from "../redux/hooks";
import { connect } from "../api/connect/connection";
import { getPublicData } from "../utils";
// import { updateRecommendedCards } from "../redux/features/mainSlice";
// import { toast } from "react-toastify";
import RootPopup from "../components/common/RootPopup";
import { dashboardLoader, onBoardingLoader } from "../routes/loaders";
import { APIProvider } from "@vis.gl/react-google-maps";
import { GOOGLE_MAPS_API } from "../config";
import { toast } from "react-toastify";
import { AuthProvider } from "../context/Auth";

const MainLayout = () => {
  return (
    <AuthProvider>
      <RootPopup />
      <Outlet />
    </AuthProvider>
  );
};

const ProtectedLayout = () => {
  const { userDoc } = useAppSelector((state) => state.main);

  useEffect(() => {
    if (userDoc?.data) {
      connect(getPublicData(userDoc.data)).catch(() => {
        toast.error("Failed to connect to MEU-CONNECT");
      });
      // .then((res) => {
      //   dispatch(updateRecommendedCards(res.recommendedCards));
      // })
      // .catch((err) => {
      //   toast.error(err.message);
      // });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDoc?.data]);
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

const OnBoardingLayout = () => {
  useEffect(() => {
    onBoardingLoader();
  });
  return (
    <div className="flex-1 flex px-4">
      <Outlet />
    </div>
  );
};

const DashboardLayout = () => {
  useEffect(() => {
    dashboardLoader();
  });
  return (
    <APIProvider apiKey={GOOGLE_MAPS_API}>
      <div className="flex flex-1 flex-col min-h-screen">
        <div className="flex flex-1 flex-col gap-4">
          <Outlet />
        </div>
        <BottomNav />
      </div>
    </APIProvider>
  );
};
const Layout = () => {
  return (
    <div className="flex-1 flex px-6">
      <Outlet />
    </div>
  );
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
  MainLayout,
  DashboardLayout,
  ProtectedLayout,
  OnBoardingLayout,
  Layout,
  BottomNavLayout,
};
