import { ReactNode, createContext, useEffect, useState } from "react";
import { Doc, User, authSubscribe, initJuno } from "@junobuild/core";
import { IUser } from "../types/user";

export interface IAuthContext {
  user: User | null | undefined;
  savedUserData: Doc<IUser> | null;
  setSavedUserData: React.Dispatch<React.SetStateAction<Doc<IUser> | null>>;
}
export const AuthContext = createContext<IAuthContext>({
  user: undefined,
  savedUserData: null,
  setSavedUserData: () => {},
});
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [savedUserData, setSavedUserData] = useState<Doc<IUser> | null>(null);

  useEffect(() => {
    (async () =>
      await initJuno({
        satelliteId: import.meta.env.VITE_SATELLITE_ID as string,
        container: import.meta.env.VITE_CONTAINER_MODE === "true",
        workers: {
          auth: true,
        },
      }))();
  }, []);

  useEffect(() => {
    const unsubscribe = authSubscribe((user) => setUser(user));

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, savedUserData, setSavedUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
