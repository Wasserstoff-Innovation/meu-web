import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import Login from "../pages/public/Login";
import RootError from "../layout/RootError";
import OnBoardRouter from "./OnBoardRouter";

const MainRouter = () => {
  const { user } = useContext(AuthContext);
  console.log("user", user);
  if (user === undefined && user !== null)
    return (
      <div className="flex-1 flex justify-center items-center text-2xl">
        Loading...
      </div>
    );
  return (
    <BrowserRouter>
      <Routes>
        <>
          {user ? (
            <Route path="*" element={<OnBoardRouter />} />
          ) : (
            <Route path="/" element={<Login />} />
          )}
        </>
        <Route path="*" element={<RootError />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
