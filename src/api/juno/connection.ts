import {
  Doc,
  User,
  deleteDoc,
  getDoc,
  listDocs,
  setDoc,
} from "@junobuild/core";
import { IConnectedUser } from "../../types/user";
import { correctTimeStamps } from "../../utils";

export const saveConnection = async (
  user: User | null | undefined,
  data: IConnectedUser
) => {
  try {
    if (!user || user === null) return undefined;
    const createdDoc = await setDoc<IConnectedUser>({
      collection: "connections",
      doc: {
        key: data.userId,
        data: data,
        updated_at: BigInt(Date.now()),
      },
    });
    return correctTimeStamps(createdDoc);
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const addIfNewConnection = async (
  user: User | null | undefined,
  data: IConnectedUser
) => {
  try {
    if (!user || user === null) return undefined;
    const existingDoc = await getDoc<IConnectedUser>({
      collection: "connections",
      key: data.userId,
    });
    if (existingDoc) {
      return;
    }
    const createdDoc = await setDoc<IConnectedUser>({
      collection: "connections",
      doc: {
        key: data.userId,
        data: data,
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
    const docs = await listDocs<IConnectedUser>({
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

export const deleteConnection = async (
  user: User | null | undefined,
  connectionDoc: Doc<IConnectedUser>
) => {
  try {
    if (!user || user === null)
      return {
        message: "Failed to delete connection",
      };
    const latestDoc = await getDoc<IConnectedUser>({
      collection: "connections",
      key: connectionDoc.key,
    });
    console.log(latestDoc)
    if (!latestDoc) {
      return { message: "Connection not found" };
    }
    await deleteDoc<IConnectedUser>({
      collection: "connections",
      doc: latestDoc,
    });
    return { message: "Connection deleted successfully" };
  } catch (e) {
    console.error(e);
    return { message: "Failed to delete connection" };
  }
};

export const updateConnection = async (
user: User | null | undefined,
  key: string,
  data: IConnectedUser
) => {
  try {
    if (!user || user === null) return undefined;
    const latestDoc = await getDoc<IConnectedUser>({
      collection: "connections",
      key,
    });
    console.log(latestDoc)
    const updatedDoc = await setDoc<IConnectedUser>({
      collection: "connections",
      doc: {
        ...latestDoc,
        key,
        data,        
      },
    });
    console.log(latestDoc)
    return correctTimeStamps(updatedDoc);
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
