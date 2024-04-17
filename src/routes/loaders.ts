import { Params, json, redirect } from "react-router-dom";
import { getUserCard } from "../api/connect/userCard";

export const protectedLoader = () => {
  const user = sessionStorage.getItem("user");
  if (!user) {
    return redirect("/login");
  }
  return null;
};

export const loginLoader = () => {
  const user = sessionStorage.getItem("user");
  if (user) {
    return redirect("/");
  }
  return null;
};

export const onBoardingLoader = () => {
  const isOnBoarded = sessionStorage.getItem("isOnBoarded");
  if (isOnBoarded === "true") {
    return redirect("/");
  }
  return null;
};

export const homeLoader = () => {
  const isOnBoarded = sessionStorage.getItem("isOnBoarded");
  if (isOnBoarded !== "true") {
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
  return { card: userCard };
};
