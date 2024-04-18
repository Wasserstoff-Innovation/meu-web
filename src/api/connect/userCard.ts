import { IUser } from "../../types/user";

const API_URL = import.meta.env.VITE_SOCKET_URL as string;

export const getUserCard = async (id?: string): Promise<IUser> => {
  try {
    if (!id) throw new Error("UserCard ID is required");
    const response = await fetch(`${API_URL}/api/card/${id}`);
    const data = await response.json();
    return data.card;
  } catch (e) {
    throw new Error("UserCard not found");
  }
};
