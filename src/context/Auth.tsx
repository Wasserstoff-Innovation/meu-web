import { ReactNode, createContext, useEffect, useState } from "react";
import { User, authSubscribe, initJuno } from "@junobuild/core";
import { getUserDataCards } from "../api/juno/user";
import { useAppDispatch } from "../redux/hooks";
import { updateUserDoc } from "../redux/features/mainSlice";

export interface IAuthContext {
  user: User | null | undefined;
}
export const AuthContext = createContext<IAuthContext>({
  user: undefined,
});
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const satelliteId = import.meta.env.VITE_SATELLITE_ID as string;
      const container = import.meta.env.VITE_CONTAINER_MODE === "true";
      await initJuno({
        satelliteId,
        container,
        workers: {
          auth: true,
        },
      });
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = authSubscribe((user) => {
      setUser(user);
      if (user) {
        sessionStorage.setItem("user", JSON.stringify(user.key));
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const updateSavedUserData = async () => {
      if (user) {
        const latestUserData = await getUserDataCards(user);
        sessionStorage.setItem(
          "isOnBoarded",
          Boolean(latestUserData?.data).toString()
        );
        // console.log({ latestUserData });
        dispatch(updateUserDoc(latestUserData));
      }
    };
    updateSavedUserData();
  }, [dispatch, user]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
