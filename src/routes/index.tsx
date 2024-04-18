import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { BottomNavLayout, DashboardLayout, Layout, ProtectedLayout } from "../layout/Layout";
import ShareProfile from "../pages/protected/ShareProfile";
import Login from "../pages/public/Login";
import RootError from "../layout/RootError";
import { Ob1, Ob2, Ob3, Ob4, Ob5, Ob7 } from "../pages/protected/onboarding";
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
import Recommendation from "../pages/protected/Home/Recommendation";
import Contracts from "../pages/protected/Home/Contracts/contracts";
import TuneRecommendation from "../pages/protected/TuneRecommendation";
import Connections from "../pages/protected/Home/Connections";
import Requests from "../pages/protected/Home/Connections/Requests";
import Twitter from "../pages/auth/Twitter";
import LinkedIn from "../pages/auth/LinkedIn";
import Sent from "../pages/protected/Home/Connections/Sent";
import QRScanner from "../components/Home/QRScanner";
import MapView from "../pages/protected/Home/MapView";
import {
  homeLoader,
  loginLoader,
  onBoardingLoader,
  profileLoader,
  protectedLoader,
} from "./loaders";
import Profile from "../pages/protected/Profile";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<RootError />}>
      <Route path="" loader={protectedLoader} element={<ProtectedLayout />}>
        <Route path="" loader={homeLoader} element={<DashboardLayout />}>
          <Route path="" element={<BottomNavLayout />}>
            <Route path="" element={<Recommendation />} />
            <Route path="contracts" element={<Contracts />} />
            <Route path="map-view" element={<MapView />} />
            <Route path="connections" element={<Connections />} />
            <Route path="requests" element={<Requests />} />
            <Route path="sent" element={<Sent />} />
          </Route>
          <Route path="tune-recommendation" element={<TuneRecommendation />} />
          <Route path="qr-scanner" element={<QRScanner />} />
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

        <Route path="onboard" loader={onBoardingLoader} element={<Layout />}>
          <Route path="ob1" element={<Ob1 />} />
          <Route path="ob2" element={<Ob2 />} />
          <Route path="ob3" element={<Ob3 />} />
          <Route path="ob4" element={<Ob4 />} />
          <Route path="ob5" element={<Ob5 />} />
          <Route path="ob7" element={<Ob7 />} />
        </Route>
      </Route>
      <Route path="login" loader={loginLoader} element={<Login />} />
      <Route path="card/:id" loader={profileLoader} element={<Profile />} />
      <Route path="auth/callback/twitter" element={<Twitter />} />
      <Route path="auth/callback/linkedin" element={<LinkedIn />} />
    </Route>
  )
);
