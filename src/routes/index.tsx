import { createBrowserRouter } from "react-router-dom";
import { ProtectedLayout, PublicLayout } from "../layout/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: ProtectedLayout,
    children: [
      {
        path: "",
        Component: Home,
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
]);
