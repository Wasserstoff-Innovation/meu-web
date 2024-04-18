import { User, setDoc } from "@junobuild/core";
import { IUser } from "../../types/user";
import { correctTimeStamps } from "../../utils";

export const createConnection = async (
  user: User | null | undefined,
  data: IUser
) => {
  try {
    if (!user || user === null) return undefined;
    const id = crypto.randomUUID();
    const createdDoc = await setDoc<IUser>({
      collection: "connections",
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
}