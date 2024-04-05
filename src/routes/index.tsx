import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout, OnBoardingLayout, ProtectedLayout } from "../layout/Layout";
import Home from "../pages/protected/Home";
import ShareProfile from "../pages/protected/ShareProfile";
import Login from "../pages/public/Login";
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
import Recommendation from "../pages/protected/Recommendation";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<RootError />}>
      <Route path="/" element={<ProtectedLayout />}>
        <Route path="onboard" element={<OnBoardingLayout />}>
          <Route path="ob1" element={<Ob1 />} />
          <Route path="ob2" element={<Ob2 />} />
          <Route path="ob3" element={<Ob3 />} />
          <Route path="ob4" element={<Ob4 />} />
          <Route path="ob5" element={<Ob5 />} />
          <Route path="ob6" element={<Ob6 />} />
          <Route path="ob7" element={<Ob7 />} />
        </Route>
        <Route index path="" element={<Recommendation />} />
        <Route path="share-profile" element={<ShareProfile />} />
        {/* <Route path="recommendation" element={<Recommendation />} /> */}
      </Route>
      <Route path="login" element={<Login />} />
    </Route>
  )
);
