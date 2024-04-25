import { Params, json, redirect } from "react-router-dom";
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

export const onBoardingLoader = async () => {
  const isOnBoarded = sessionStorage.getItem("cardId");
  if (isOnBoarded) {
    return redirect("/");
  }
  return null;
};

export const dashboardLoader = async () => {
  const isOnBoarded = sessionStorage.getItem("cardId");
  const isAuthenticated = await getIsAuthenticated();
  if (!isOnBoarded || !isAuthenticated) {
    return redirect("/onboard/ob1");
  }
  return null;
};

export const profileLoader = async ({ params }: { params: Params }) => {
  const userCard = await getUserCard(params.id);
  if (!userCard) {
    throw json(
      {
        message: "Profile Not found / User not discoverable",
      },
      { status: 401 }
    );
  }
  return { profile: userCard };
};
