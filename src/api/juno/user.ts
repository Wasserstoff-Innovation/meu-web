import { User, getDoc } from "@junobuild/core";

export const getUserData = async (user: User | null) => {
  try {
    if (!user || user === null) return undefined;
    const userDoc = await getDoc({
      collection: "users",
      key: user?.key,
    });
    return userDoc;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
