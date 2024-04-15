import { User, listDocs, setDoc } from "@junobuild/core";
import { IUser } from "../../types/user";
import { correctTimeStamps } from "../../utils";

export const getUserDataCards = async (user: User | null | undefined) => {
  try {
    if (!user || user === null) return undefined;
    const docs = await listDocs<IUser>({
      collection: "cards",
    });
    console.log(docs);
    return correctTimeStamps(docs.items[0]);
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const setUserData = async (
  user: User | null | undefined,
  data: IUser
) => {
  try {
    if (!user || user === null) return undefined;
    console.log(data);
    const createdDoc = await setDoc<IUser>({
      collection: "cards",
      doc: {
        key: crypto.randomUUID(),
        data,
        updated_at: BigInt(Date.now()),
      },
    });
    return correctTimeStamps(createdDoc);
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const updateUserData = async (
  user: User | null | undefined,
  key: string,
  data: IUser
) => {
  try {
    if (!user || user === null) return undefined;
    const updatedDoc = await setDoc<IUser>({
      collection: "cards",
      doc: {
        key,
        data,
        updated_at: BigInt(Date.now()),
      },
    });
    return correctTimeStamps(updatedDoc);
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
