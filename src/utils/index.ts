import { Doc } from "@junobuild/core";
import { IdbStorage, KEY_STORAGE_DELEGATION } from "@dfinity/auth-client";
// import {
//   DelegationChain,
//   isDelegationValid,
//   DelegationIdentity,
//   Ed25519KeyIdentity,
// } from "@dfinity/identity";
import { IUserwithPrivateData } from "../types/user";

export const getProfileUrl = (userId?: string) => {
  if (!userId) return "";
  const baseUrl = window.location.origin;
  const profileUrl = `${baseUrl}/profile/${userId}`;
  return profileUrl;
};
export const sleep = async (secs: number) => {
  await new Promise((r) => setTimeout(r, secs * 1000));
};

export const getIsAuthenticated = async () => {
  const idbStorage: IdbStorage = new IdbStorage();
  if (!idbStorage) return false;
  const delegation = await idbStorage.get(KEY_STORAGE_DELEGATION);
  console.log("delegation", delegation);
  if (!delegation) return false;
  return true;
};

export const clearStorage = async () => {
  const idbStorage: IdbStorage = new IdbStorage();
  await idbStorage.remove(KEY_STORAGE_DELEGATION);
};

export const correctTimeStamps = <T>(doc: Doc<T>) => {
  return Object.assign({}, doc, {
    updated_at: new Date(Number(doc?.updated_at) / 1000000).valueOf(),
    created_at: new Date(Number(doc?.created_at) / 1000000).valueOf(),
  });
};

export const getPublicData = (user: IUserwithPrivateData) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { privateData, ...publicData } = user;
  return publicData;
};

// export const checkDelegationChain = async (): Promise<{
//   valid: boolean;
//   delegation: DelegationChain | null;
// }> => {
//   const idbStorage: IdbStorage = new IdbStorage();
//   const delegationChain: string | null = await idbStorage.get(
//     KEY_STORAGE_DELEGATION
//   );

//   const delegation =
//     delegationChain !== null ? DelegationChain.fromJSON(delegationChain) : null;
//   const sessionId = Ed25519KeyIdentity.generate();
//   if (delegation !== null) {
//     const identity = DelegationIdentity.fromDelegation(sessionId, delegation);
//     console.log(
//       "Delegation Identity sign",
//       await identity.sign(new ArrayBuffer(0))
//     );
//   }
//   console.log({
//     valid: delegation !== null && isDelegationValid(delegation),
//     delegation,
//   });
//   return {
//     valid: delegation !== null && isDelegationValid(delegation),
//     delegation,
//   };
// };

// const getIdentity = async () => {
//   const identity = await idbStorage.get(KEY_STORAGE_KEY);
//   const delegation = await idbStorage.get(KEY_STORAGE_DELEGATION);
//   console.log(identity);
//   console.log(delegation);
//   const id = await unsafeIdentity();
//   console.log({ id });
//   if (identity) {
//     console.log("here");
//     const ecdsaId = await ECDSAKeyIdentity.fromKeyPair(
//       identity as unknown as CryptoKeyPair
//     );
//     console.log({ ecdsaId });
//     const textToArr = new TextEncoder().encode("Hello World");
//     const sign = await ecdsaId.sign(new Uint16Array(textToArr));
//     const signText = new Uint8Array(sign).toString();
//     const principal = ecdsaId.getPrincipal().toString();
//     console.log({ sign, ecdsaId, principal, signText });
//   }
// };
