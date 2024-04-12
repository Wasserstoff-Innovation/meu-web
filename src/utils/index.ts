export const sleep = async (secs: number) => {
  await new Promise((r) => setTimeout(r, secs * 1000));
};
