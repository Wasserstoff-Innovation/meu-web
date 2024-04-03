import { User, getDoc, listDocs, setDoc } from "@junobuild/core";
import { IUser } from "../../types/user";

export const getUserDataByUsername = async (
  user: User | null,
  username: string
) => {
  try {
    if (!user || user === null) return undefined;
    const userDoc = await getDoc<IUser>({
      collection: "users",
      key: username.toLowerCase(),
    });
    return userDoc;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const getUserDataByOwner = async (user: User | null) => {
  try {
    if (!user || user === null) return undefined;
    const docs = await listDocs<IUser>({
      collection: "users",
      filter: {
        owner: user.key,
      },
    });
    console.log(docs);
    return docs.items[0];
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const setUserData = async (user: User | null, data: IUser) => {
  try {
    if (!user || user === null) return undefined;
    const createdDoc = await setDoc<IUser>({
      collection: "users",
      doc: {
        key: data.username.toLowerCase(),
        data,
      },
    });
    return createdDoc;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
