import { Fragment, Suspense, useContext, useEffect, useState } from "react";
import Header from "./Header";
import { Navigate, Outlet, redirect } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import { Spinner } from "@nextui-org/react";
import { getUserData } from "../api/juno/user";

const ProtectedLayout = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/login" />;
  }
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

const OnBoardingLayout = () => {
  const { user } = useContext(AuthContext);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    (async () => {
      const userData = await getUserData(user);
      if (userData) {
        return redirect("/home");
      }
      setShowLoader(false);
    })();
  }, [user]);

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
const PublicLayout = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <Fragment>
      <Header />
      <Suspense>
        <Outlet />
      </Suspense>
    </Fragment>
  );
};

export { PublicLayout, ProtectedLayout, OnBoardingLayout };
