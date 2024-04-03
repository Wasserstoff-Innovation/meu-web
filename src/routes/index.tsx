import { createBrowserRouter } from "react-router-dom";
import {
  OnBoardingLayout,
  ProtectedLayout,
  PublicLayout,
} from "../layout/Layout";
import Home from "../pages/protected/Home";
import ShareProfile from '../pages/protected/ShareProfile'
import Login from "../pages/public/Login";
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
        ],
      },
      {
        path: "home",
        Component: Home,
      },
      {
        path: "share-profile",
        Component: ShareProfile,
      }
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
]);
