import { createBrowserRouter } from "react-router-dom";
import {
  OnBoardingLayout,
  ProtectedLayout,
  PublicLayout,
} from "../layout/Layout";
import Home from "../pages/protected/Home";
import ShareProfile from '../pages/protected/ShareProfile'
import Login from "../pages/public/Login";
import Settings from "../pages/protected/Setting"
import Interests from "../pages/protected/Setting/Interests";
import Help from "../pages/protected/Setting/Help";
import Other from "../pages/protected/Setting/Other";
import Privacy from "../pages/protected/Setting/Privacy";
import Purpose from "../pages/protected/Setting/Purpose";
import RateMeu from "../pages/protected/Setting/RateMeu";
import About from "../pages/protected/Setting/About";
import share from "../pages/protected/Setting/Share";
import EditProfile from "../pages/protected/Setting/EditProfile";
import Ob1 from "../pages/protected/onboarding/Ob1";
import RootError from "../layout/RootError";
import Ob2 from "../pages/protected/onboarding/Ob2";
import Ob3 from "../pages/protected/onboarding/Ob3";
import Ob4 from "../pages/protected/onboarding/Ob4";
import Ob5 from "../pages/protected/onboarding/Ob5";
import Ob6 from "../pages/protected/onboarding/Ob6";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: ProtectedLayout,
    errorElement: <RootError />,
    children: [
      {
        path: "",
        Component: OnBoardingLayout,
        children: [
          {
            path: "",
            Component: Ob1,
          },
          {
            path: "ob2",
            Component: Ob2,
          },
          {
            path: "ob3",
            Component: Ob3,
          },
          {
            path: "ob4",
            Component: Ob4,
          },
          {
            path: "ob5",
            Component: Ob5,
          },
          {
            path: "ob6",
            Component: Ob6,
          },
          {
            path: "interests",
            Component: Interests,
          },
          {
            path:"editProfile",
            Component: EditProfile,
          },
          {
            path: "privacy",
            Component: Privacy,
          },
        ],
      },
      {
        path: "home",
        Component: Home,
      },
      {
        path: "ShareProfile",
        Component: ShareProfile,
      },
      
    ],
  },
  {
    path: "/",
    Component: PublicLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
    ],
  },
  {
    path: "/",
    Component: Settings,
    children: [
      {
        path: "interests",
        Component: Interests,
      },
      {
        path: "purpose",
        Component: Purpose,
      },
      // {
      //   path: "privacy",
      //   Component: Privacy,
      // },
      {
        path: "other",
        Component: Other,
      },
      {
        path: "share",
        Component: share,
      },
      {
        path: "rate",
        Component: RateMeu,
      },
      {
        path: "help",
        Component: Help,
      },
      {
        path: "about",
        Component: About,
      },
    ],
  },
]);