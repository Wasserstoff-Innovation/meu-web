import { useContext } from "react";
import { AuthContext } from "../context/Auth";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/protected/Home";
import ShareProfile from "../pages/protected/ShareProfile";
import RootError from "../layout/RootError";
import {
  Ob1,
  Ob2,
  Ob3,
  Ob4,
  Ob5,
  Ob6,
  Ob7,
} from "../pages/protected/onboarding";

const OnBoardRouter = () => {
  const { savedUserData } = useContext(AuthContext);
  console.log("savedUserData", savedUserData);
  return (
    <Routes>
      {!savedUserData ? (
        <>
          <Route path="" element={<Ob1 />} />
          <Route path="ob2" element={<Ob2 />} />
          <Route path="ob3" element={<Ob3 />} />
          <Route path="ob4" element={<Ob4 />} />
          <Route path="ob5" element={<Ob5 />} />
          <Route path="ob6" element={<Ob6 />} />
          <Route path="ob7" element={<Ob7 />} />
        </>
      ) : (
        <>
          <Route path="" element={<Home />}></Route>
          <Route path="share-profile" element={<ShareProfile />} />
        </>
      )}
      <Route path="*" element={<RootError />} />
    </Routes>
  );
};

export default OnBoardRouter;
