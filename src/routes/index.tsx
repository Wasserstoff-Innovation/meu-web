import { createBrowserRouter } from "react-router-dom";
import {
  OnBoardingLayout,
  ProtectedLayout,
  PublicLayout,
} from "../layout/Layout";
import Home from "../pages/protected/Home";
import Login from "../pages/public/Login";
import Ob1 from "../pages/protected/onboarding/Ob1";
import RootError from "../layout/RootError";
import Ob2 from "../pages/protected/onboarding/Ob2";
import Ob3 from "../pages/protected/onboarding/Ob3";
import Ob4 from "../pages/protected/onboarding/Ob4";
import MyProfile from "../pages/protected/MyProfile";
import ProfileScreenConnection from "../pages/protected/ProfileConnection";
import ProfileNotConnection from "../pages/protected/ProfileNotConnection";
import Recommendation from "../pages/protected/Recommendation";

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
        ],
      },
      {
        path: "home",
        Component: Home,
      },
      {
        path: "my-profile",
        Component: MyProfile,
      },
      {
        path: "profile-connection",
        Component: ProfileScreenConnection,
      },
      {
        path: "profile-not-connection",
        Component: ProfileNotConnection,
      },
      {
        path: "recommendation",
        Component:Recommendation
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
