import { User, uploadFile } from "@junobuild/core";

export const uploadAvatar = async (
  file: File,
  user: User | null | undefined
) => {
  try {
    if (!user) return undefined;
    let filename = "";
    switch (file.type) {
      case "image/png":
        filename = user?.key + ".png";
        break;
      case "image/jpeg":
        filename = user?.key + ".jpeg";
        break;

      default:
        return undefined;
    }
    if (!filename) return undefined;
    const result = await uploadFile({
      filename: filename,
      data: file,
      collection: "avatar",
    });
    return result;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
