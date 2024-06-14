import { User, getDoc, listDocs, setDoc } from "@junobuild/core";
import { IUserwithPrivateData } from "../../types/user";
import { correctTimeStamps } from "../../utils";
import { nanoid } from "nanoid";

export const getUserDataCards = async (user: User | null | undefined) => {
  try {
    if (!user || user === null) return undefined;
    const docs = await listDocs<IUserwithPrivateData>({
      collection: "cards",
    });
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
    const id = nanoid();
    const createdDoc = await setDoc<IUserwithPrivateData>({
      collection: "cards",
      doc: {
        key: id,
        data: { ...data, userId: id },
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
    console.log(latestDoc)
    if(!latestDoc){
      throw new Error("Doc not found")
    }
    const updatedDoc = await setDoc<IUserwithPrivateData>({
      collection: "cards",
      doc: {
        ...latestDoc,
        data
      },
    });
    console.log("iupdated",updatedDoc)
    return correctTimeStamps(updatedDoc);
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
