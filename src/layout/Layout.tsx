import { Fragment, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import { Spinner } from "@nextui-org/react";
import { getUserDataByOwner } from "../api/juno/user";

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

  console.log(user);

  useEffect(() => {
    (async () => {
      const userData = await getUserDataByOwner(user);
      console.log(userData);
      if (userData) {
        navigate("/", { replace: true });
        // redirect("/home");
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
export { ProtectedLayout, OnBoardingLayout, Layout };
