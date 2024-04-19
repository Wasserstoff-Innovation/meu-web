import { Fragment, useEffect } from "react";
import { Outlet } from "react-router-dom";
// import { SocketProvider } from "../context/Socket";
import BottomNav from "../components/Home/BottomNav";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { connect } from "../api/connect/connection";
import { getPublicData } from "../utils";
import { updateRecommendedCards } from "../redux/features/mainSlice";
import { toast } from "react-toastify";

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
  const { userDoc } = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (userDoc?.data) {
      connect(getPublicData(userDoc.data))
        .then((recommendedCards) => {
          dispatch(updateRecommendedCards(recommendedCards));
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {/* <SocketProvider> */}
      <Outlet />
      {/* </SocketProvider> */}
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
