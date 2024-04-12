import { redirect } from "react-router-dom";

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
}

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
