import { Fragment, Suspense, useContext, useEffect, useState } from "react";
import Header from "./Header";
import { Navigate, Outlet, redirect } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import { Spinner } from "@nextui-org/react";
import { getUserDataByOwner } from "../api/juno/user";

const ProtectedLayout = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
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

  console.log(user);

  useEffect(() => {
    (async () => {
      const userData = await getUserDataByOwner(user);
      if (userData) {
        redirect("/home");
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
    return <Navigate to="/home" />;
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

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-h-screen w-screen bg-foreground-400 font-mono text-white">
      <div className="flex-1 flex flex-col justify-between h-screen overflow-auto no-scrollbar max-w-sm px-6  bg-foreground mx-auto  ">
       {children}
      </div>
    </div>
  );
};
export { PublicLayout, ProtectedLayout, OnBoardingLayout, Layout };
