import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
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
import Contracts from "../pages/protected/Contracts/contracts";
import Recommendation from "../pages/protected/Recommendation";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<RootError />}>
      <Route
        path="/"
        loader={() => {
          const user = sessionStorage.getItem("user");
          if (user) {
            return redirect("/login");
          }
          return null;
        }}
        element={<ProtectedLayout />}
      >
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
        <Route path="settings" element={<Settings />} />
        <Route path="settings/help" element={<Help />} />
        <Route path="settings/editProfile" element={<EditProfile />} />
        <Route path="settings/interests" element={<Interests />} />
        <Route path="settings/purpose" element={<Purpose />} />
        <Route path="settings/other" element={<Other />} />
        <Route path="settings/privacy" element={<Privacy />} />
        <Route path="settings/rate" element={<RateMeu />} />
        <Route path="settings/share" element={<Share />} />
        <Route path="settings/about" element={<About />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="contracts" element={<Contracts/>}/>
    </Route>
  )
);
