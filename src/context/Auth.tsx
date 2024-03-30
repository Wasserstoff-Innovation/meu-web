import { ReactNode, createContext, useEffect, useState } from "react";
import { User, authSubscribe, initJuno } from "@junobuild/core";

export interface IAuthContext {
  user: User | null;
}
export const AuthContext = createContext<IAuthContext>({ user: null });
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () =>
      await initJuno({
        satelliteId: "mocjg-zyaaa-aaaal-ad7yq-cai",
      }))();
  }, []);

  useEffect(() => {
    const unsubscribe = authSubscribe((user) => setUser(user));

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
