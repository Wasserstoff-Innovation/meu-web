import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import {
  DashboardLayout,
  Layout,
  MainLayout,
  OnBoardingLayout,
  ProtectedLayout,
} from "../layout/Layout";
// import ShareProfile from "../pages/protected/ShareProfile";
import Login from "../pages/public/Login";
import RootError from "../layout/RootError";
import { Ob1, Ob2, Ob3, Ob4, Ob5, Ob7 } from "../pages/protected/onboarding";
import Settings from "../pages/protected/Setting/Setting";
import EditProfile from "../pages/protected/Setting/EditProfile";
import Interests from "../pages/protected/Setting/Interests";
import Other from "../pages/protected/Setting/Other";
import Privacy from "../pages/protected/Setting/Privacy";
import Help from "../pages/protected/Setting/Help";
import RateMeu from "../pages/protected/Setting/RateMeu";
import Share from "../pages/protected/Setting/Share";
import About from "../pages/protected/Setting/About";
import Purpose from "../pages/protected/Setting/Purpose";
import Home, { homeLoader } from "../pages/protected/Home/Home";
import Contracts from "../pages/protected/Home/Contracts/contracts";
import TuneRecommendation from "../pages/protected/Home/TuneRecommendation";
import Received from "../pages/protected/Home/Connections/Received";
import Twitter from "../pages/auth/Twitter";
import LinkedIn from "../pages/auth/LinkedIn";
import Sent from "../pages/protected/Home/Connections/Sent";
import QRScanner from "../components/Home/QRScanner";
import MapView from "../pages/protected/Home/MapView";
import {
  dashboardLoader,
  loginLoader,
  onBoardingLoader,
  profileLoader,
  protectedLoader,
} from "./loaders";
import Profile from "../pages/public/Profile";
import ConnectionLayout from "../pages/protected/Home/Connections/ConnectionLayout";
import Connections from "../pages/protected/Home/Connections/Connections";
import connectionLoaders from "../pages/protected/Home/Connections/loaders";
import ShareProfile from "../pages/protected/ShareProfile";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />} errorElement={<RootError />}>
      <Route path="" loader={protectedLoader} element={<ProtectedLayout />}>
        <Route path="share-profile" element={<ShareProfile />} />
        <Route path="settings" element={<Layout />}>
          <Route path="" element={<Settings />} />
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
        <Route path="tune-recommendation" element={<TuneRecommendation />} />
        <Route path="qr-scanner" element={<QRScanner />} />
        <Route
          path=""
          loader={dashboardLoader}
          element={<DashboardLayout />}
          errorElement={<RootError />}
        >
          <Route path="" loader={homeLoader} element={<Home />} />
          <Route path="contracts" element={<Contracts />} />
          <Route path="map-view" element={<MapView />} />
          <Route path="" element={<ConnectionLayout />}>
            <Route path="connections" element={<Connections />} />
            <Route
              path="requests"
              loader={connectionLoaders.received}
              element={<Received />}
            />
            <Route
              path="sent"
              loader={connectionLoaders.sent}
              element={<Sent />}
            />
          </Route>
        </Route>

        <Route
          path="onboard"
          loader={onBoardingLoader}
          element={<OnBoardingLayout />}
        >
          <Route path="ob1" element={<Ob1 />} />
          <Route path="ob2" element={<Ob2 />} />
          <Route path="ob3" element={<Ob3 />} />
          <Route path="ob4" element={<Ob4 />} />
          <Route path="ob5" element={<Ob5 />} />
          <Route path="ob7" element={<Ob7 />} />
        </Route>
      </Route>
      <Route path="login" loader={loginLoader} element={<Login />} />
      <Route path="profile/:id" loader={profileLoader} element={<Profile />} />

      <Route path="auth/callback/twitter" element={<Twitter />} />
      <Route path="auth/callback/linkedin" element={<LinkedIn />} />
    </Route>
  )
);
