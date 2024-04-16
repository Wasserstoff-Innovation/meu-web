import { Doc } from "@junobuild/core";
import { IdbStorage, KEY_STORAGE_DELEGATION } from "@dfinity/auth-client";
import {
  DelegationChain,
  isDelegationValid,
  DelegationIdentity,
  Ed25519KeyIdentity,
} from "@dfinity/identity";

export const sleep = async (secs: number) => {
  await new Promise((r) => setTimeout(r, secs * 1000));
};

export const correctTimeStamps = <T>(doc: Doc<T>) => {
  return Object.assign({}, doc, {
    updated_at: new Date(Number(doc?.updated_at) / 1000000).valueOf(),
    created_at: new Date(Number(doc?.created_at) / 1000000).valueOf(),
  });
};

export const checkDelegationChain = async (): Promise<{
  valid: boolean;
  delegation: DelegationChain | null;
}> => {
  const idbStorage: IdbStorage = new IdbStorage();
  const delegationChain: string | null = await idbStorage.get(
    KEY_STORAGE_DELEGATION
  );

  const delegation =
    delegationChain !== null ? DelegationChain.fromJSON(delegationChain) : null;
  const sessionId = Ed25519KeyIdentity.generate();
  if (delegation !== null) {
    const identity = DelegationIdentity.fromDelegation(sessionId, delegation);
    console.log("Delegation Identity sign",(await identity.sign(new ArrayBuffer(0))));
  }
  console.log({
    valid: delegation !== null && isDelegationValid(delegation),
    delegation,
  });
  return {
    valid: delegation !== null && isDelegationValid(delegation),
    delegation,
  };
};
