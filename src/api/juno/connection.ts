import { User, listDocs, setDoc } from "@junobuild/core";
import { IUser } from "../../types/user";
import { correctTimeStamps } from "../../utils";
import { nanoid } from "nanoid";

export const saveConnection = async (
  user: User | null | undefined,
  data: IUser
) => {
  try {
    if (!user || user === null) return undefined;
    const createdDoc = await setDoc<IUser>({
      collection: "connections",
      doc: {
        key: nanoid(),
        data: { ...data },
        updated_at: BigInt(Date.now()),
      },
    });
    return correctTimeStamps(createdDoc);
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const getConnections = async (user: User | null | undefined) => {
  try {
    if (!user || user === null) return undefined;
    const docs = await listDocs<IUser>({
      collection: "connections",
      filter: {
        order: {
          desc: true,
          field: "updated_at",
        },
      },
    });
    return docs.items.map((item) => correctTimeStamps(item));
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
