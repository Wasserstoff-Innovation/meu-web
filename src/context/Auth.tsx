import { ReactNode, createContext, useEffect, useState } from "react";
import { User, authSubscribe, initSatellite } from "@junobuild/core";
import { getUserDataCards } from "../api/juno/user";
import { useAppDispatch } from "../redux/hooks";
import { updateUserDoc } from "../redux/features/mainSlice";
import { clearStorage } from "../utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export interface IAuthContext {
  user: User | null | undefined;
}
export const AuthContext = createContext<IAuthContext>({
  user: undefined,
});
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const satelliteId = import.meta.env.VITE_SATELLITE_ID as string;
      const container = import.meta.env.VITE_CONTAINER_MODE === "true";
      try {
        console.log("Initializing satellite...");
        console.log("Satellite ID: ", satelliteId);
        console.log("Container mode: ", container);
        await initSatellite({
          satelliteId,
          container,
          workers: {
            auth: true,
          },
        });
      } catch (e) {
        toast.error("Failed to connect to ICP. Please try again.");
        console.log(e);
        clearStorage();
        navigate("/login");
      }
    })();
  }, [navigate]);

  useEffect(() => {
    const unsubscribe = authSubscribe((user) => {
      setUser(user);
      localStorage.setItem("auth", "true");
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const updateSavedUserData = async () => {
      if (user) {
        const latestUserData = await getUserDataCards(user);
        sessionStorage.setItem("cardId", latestUserData?.data?.userId || "");
        dispatch(updateUserDoc(latestUserData));
      }
    };
    updateSavedUserData();
  }, [dispatch, user]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
