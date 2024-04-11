import { ReactNode, createContext, useEffect, useState } from "react";
import { Doc, User, authSubscribe, initJuno } from "@junobuild/core";
import { IUser } from "../types/user";
import { getUserDataCards } from "../api/juno/user";

export interface IAuthContext {
  user: User | null | undefined;
  savedUserData: Doc<IUser> | undefined;
  setSavedUserData: React.Dispatch<
    React.SetStateAction<Doc<IUser> | undefined>
  >;
}
export const AuthContext = createContext<IAuthContext>({
  user: undefined,
  savedUserData: undefined,
  setSavedUserData: () => {},
});
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [savedUserData, setSavedUserData] = useState<Doc<IUser> | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      const satelliteId = import.meta.env.VITE_SATELLITE_ID as string;
      const container = import.meta.env.VITE_CONTAINER_MODE === "true";
      console.log({ satelliteId, container });
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
      console.log("User", user);
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
        setSavedUserData(latestUserData);
      }
    };
    updateSavedUserData();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, savedUserData, setSavedUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
