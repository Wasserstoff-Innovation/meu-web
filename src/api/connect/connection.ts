import { IUser, IUserwithPrivateData } from "../../types/user";
import { sendAPIRequest } from "./request";
import { CONNECT_API_URL } from "./userCard";

export const connect = async (userData: IUser) => {
  const response = await sendAPIRequest("/connect", "POST", { user: userData });
  return response;
};

export const sendRequest = async (
  sender: IUserwithPrivateData,
  receiver: IUser
) => {
  return fetch(`${CONNECT_API_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      userid: sender.userId,
    },
    body: JSON.stringify({ sender, receiver }),
  })
    .then((res) => res.json())
    .then((data) => data);
};

export const getReceivedRequests = async (): Promise<
  IUserwithPrivateData[]
> => {
  return await sendAPIRequest(`/requests?type=received`, "GET");
};

export const getSentRequests = async (): Promise<IUser[]> => {
  return await sendAPIRequest(`/requests?type=sent`, "GET");
};

export const acceptRequest = async (
  connectionId: string,
  receiver: IUserwithPrivateData
) => {
  return fetch(`${CONNECT_API_URL}/accept/${connectionId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ receiver }),
  })
    .then((res) => res.json())
    .then((data) => data);
};

export const rejectRequest = async (connectionId: string) => {
  return await sendAPIRequest(`/reject/${connectionId}`, "POST");
};
