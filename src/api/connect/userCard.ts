import { CONNECT_API_URL } from "../../config";
import { IUser } from "../../types/user";


export const getUserCard = async (id?: string): Promise<IUser> => {
  try {
    if (!id) throw new Error("UserCard ID is required");
    const response = await fetch(`${CONNECT_API_URL}/api/card/${id}`);
    console.log(response);
    const data = await response.json();
    return data.card;
  } catch (e) {
    throw new Error("Profile Not found / User not discoverable");
  }
};
