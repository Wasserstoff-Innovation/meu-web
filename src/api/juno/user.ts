import { User, listDocs, setDoc } from "@junobuild/core";
import { IUser } from "../../types/user";

export const getUserDataCards = async (user: User | null | undefined) => {
  try {
    if (!user || user === null) return undefined;
    const docs = await listDocs<IUser>({
      collection: "cards",
    });
    console.log(docs);
    return docs.items[0];
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
    return createdDoc;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
