import { User, getDoc, listDocs, setDoc } from "@junobuild/core";
import { IUserwithPrivateData } from "../../types/user";
import { correctTimeStamps } from "../../utils";

export const getUserDataCards = async (user: User | null | undefined) => {
  try {
    if (!user || user === null) return undefined;
    const docs = await listDocs<IUserwithPrivateData>({
      collection: "cards",
    });
    // console.log(docs);
    return correctTimeStamps(docs.items[0]);
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const setUserData = async (
  user: User | null | undefined,
  data: IUserwithPrivateData
) => {
  try {
    if (!user || user === null) return undefined;
    console.log(data);
    const id = crypto.randomUUID();
    const createdDoc = await setDoc<IUserwithPrivateData>({
      collection: "cards",
      doc: {
        key: id,
        data: { ...data, id: id },
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
  data: IUserwithPrivateData
) => {
  try {
    if (!user || user === null) return undefined;
    const latestDoc = await getDoc<IUserwithPrivateData>({
      collection: "cards",
      key,
    });
    const updatedDoc = await setDoc<IUserwithPrivateData>({
      collection: "cards",
      doc: {
        key,
        data,
        updated_at: latestDoc?.updated_at,
      },
    });
    return correctTimeStamps(updatedDoc);
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
