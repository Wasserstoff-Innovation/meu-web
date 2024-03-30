import { Fragment, Suspense, useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext, AuthProvider } from "../context/Auth";

const AuthLayout = () => {
  return (
    <AuthProvider>
      <div className="max-h-screen w-screen bg-foreground-400 font-mono">
        <div className="flex-1 flex flex-col justify-between h-screen overflow-auto no-scrollbar  max-w-screen-sm px-10   bg-foreground mx-auto  border-4 rounded-lg border-foreground">
          <Outlet />
        </div>
      </div>
    </AuthProvider>
  );
};

const ProtectedLayout = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <Fragment>
      <div className="max-h-screen w-screen bg-foreground-400 font-mono">
        <div className="flex-1 flex flex-col justify-between h-screen overflow-auto no-scrollbar  max-w-screen-sm px-10   bg-foreground mx-auto  border-4 rounded-lg border-foreground">
          <Header />
          <Suspense>
            <Outlet />
          </Suspense>
          <Footer />
        </div>
      </div>
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
      <div className="max-h-screen w-screen bg-foreground-400 font-mono">
        <div className="flex-1 flex flex-col justify-between h-screen overflow-auto no-scrollbar  max-w-screen-sm px-10   bg-foreground mx-auto  border-4 rounded-lg border-foreground">
          <Header />
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </Fragment>
  );
};

export { PublicLayout, ProtectedLayout, AuthLayout };
