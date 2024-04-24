import { Params, redirect } from "react-router-dom";
import { getUserCard } from "../api/connect/userCard";
import { getIsAuthenticated } from "../utils";

export const protectedLoader = async () => {
  const isAuthenticated = await getIsAuthenticated();
  if (!isAuthenticated) {
    return redirect("/login");
  }
  return null;
};

export const loginLoader = async () => {
  const isAuthenticated = await getIsAuthenticated();
  if (isAuthenticated) {
    return redirect("/");
  }
  return null;
};

export const onBoardingLoader = () => {
  const isOnBoarded = sessionStorage.getItem("cardId");
  if (isOnBoarded) {
    return redirect("/");
  }
  return null;
};

export const dashboardLoader = () => {
  const isOnBoarded = sessionStorage.getItem("cardId");
  if (!isOnBoarded) {
    return redirect("/onboard/ob1");
  }
  return null;
};

export const profileLoader = async ({ params }: { params: Params }) => {
  const userCard = await getUserCard(params.id);
  return { profile: userCard };
};
