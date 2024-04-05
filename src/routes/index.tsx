import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout, OnBoardingLayout, ProtectedLayout } from "../layout/Layout";
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
import Settings from "../pages/protected/Setting";
import EditProfile from "../pages/protected/Setting/EditProfile";
import Interests from "../pages/protected/Setting/Interests";
import Other from "../pages/protected/Setting/Other";
import Privacy from "../pages/protected/Setting/Privacy";
import Help from "../pages/protected/Setting/Help";
import RateMeu from "../pages/protected/Setting/RateMeu";
import Share from "../pages/protected/Setting/Share";
import About from "../pages/protected/Setting/About";
import Purpose from "../pages/protected/Setting/Purpose";
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
        <Route path="settings" element={<Settings />}>
          <Route path="help" element={<Help />} />
          <Route path="editProfile" element={<EditProfile />} />
          <Route path="interests" element={<Interests />} />
          <Route path="purpose" element={<Purpose />} />
          <Route path="other" element={<Other />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="rate" element={<RateMeu />} />
          <Route path="share" element={<Share />} />
          <Route path="about" element={<About />} />
        </Route>
      </Route>
      <Route path="login" element={<Login />} />
    </Route>
  )
);
