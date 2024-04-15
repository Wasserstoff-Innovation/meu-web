import { Doc } from "@junobuild/core";

export const sleep = async (secs: number) => {
  await new Promise((r) => setTimeout(r, secs * 1000));
};

export const correctTimeStamps = <T>(doc: Doc<T>) => {
  return Object.assign({}, doc, {
    updated_at: new Date(Number(doc?.updated_at) / 1000000).valueOf(),
    created_at: new Date(Number(doc?.created_at) / 1000000).valueOf(),
  });
};
