import { Fragment } from "react";
import { Outlet } from "react-router-dom";
// import { AuthContext } from "../context/Auth";
// import { Spinner } from "@nextui-org/react";

const ProtectedLayout = () => {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

const OnBoardingLayout = () => {
  // const { savedUserData } = useContext(AuthContext);
  // const [showLoader, setShowLoader] = useState(true);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (savedUserData) {
  //     navigate("/", { replace: true });
  //   }
  //   setShowLoader(false);
  // }, [navigate, savedUserData]);

  return (
    <Fragment>
      {/* {showLoader ? (
        <div className="flex-1 justify-center content-center">
          <Spinner color="primary" size="lg" />
        </div>
      ) : ( */}
        <Outlet />
      {/* )} */}
    </Fragment>
  );
};

const DashboardLayout = () => {
  // const { savedUserData } = useContext(AuthContext);
  // const [showLoader, setShowLoader] = useState(true);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!savedUserData) {
  //     navigate("/onboard/ob1", { replace: true });
  //   }
  //   setShowLoader(false);
  // }, [navigate, savedUserData]);

  return (
    <Fragment>
      {/* {showLoader ? (
        <div className="flex-1 justify-center content-center">
          <Spinner color="primary" size="lg" />
        </div>
      ) : ( */}
        <Outlet />
      {/* )} */}
    </Fragment>
  );
};
const Layout = () => {
  return <Outlet />;
};
export { DashboardLayout, ProtectedLayout, OnBoardingLayout, Layout };
