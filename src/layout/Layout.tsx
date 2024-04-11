import { Fragment, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import { Spinner } from "@nextui-org/react";
import { getUserDataCards } from "../api/juno/user";

const ProtectedLayout = () => {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

const OnBoardingLayout = () => {
  const { user } = useContext(AuthContext);
  const [showLoader, setShowLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const userData = await getUserDataCards(user);
      if (userData) {
        navigate("/", { replace: true });
      }
      setShowLoader(false);
    })();
  }, [navigate, user]);

  return (
    <Fragment>
      {showLoader ? (
        <div className="flex-1 justify-center content-center">
          <Spinner color="primary" size="lg" />
        </div>
      ) : (
        <Outlet />
      )}
    </Fragment>
  );
};

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [showLoader, setShowLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const userData = await getUserDataCards(user);
      if (!userData) {
        navigate("/onboard/ob1", { replace: true });
      }
      setShowLoader(false);
    })();
  }, [navigate, user]);

  return (
    <Fragment>
      {showLoader ? (
        <div className="flex-1 justify-center content-center">
          <Spinner color="primary" size="lg" />
        </div>
      ) : (
        <Outlet />
      )}
    </Fragment>
  );
};
const Layout = () => {
  return <Outlet />;
};
export { DashboardLayout, ProtectedLayout, OnBoardingLayout, Layout };
