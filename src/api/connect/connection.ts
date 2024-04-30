import { IUser, IUserwithPrivateData } from "../../types/user";
import { sendAPIRequest } from "./request";

export const connect = async (userData: IUser) => {
  return await sendAPIRequest("/connect", "POST", { user: userData });
};

export const getRecommended = async (): Promise<IUser[]> => {
  return await sendAPIRequest("/recommended", "GET");
};

export const ignoreRecommendation = async (userId: string): Promise<IUser> => {
  return await sendAPIRequest(`/ignore/${userId}`, "POST");
};

export const sendRequest = async (
  sender: IUserwithPrivateData,
  receiver: IUser
): Promise<{
  message: string;
  recommendedCards: IUser[];
}> => {
  return await sendAPIRequest("/add", "POST", { sender, receiver });
};

export const getReceivedRequests = async (): Promise<
  {
    sender: IUserwithPrivateData;
    _id: string;
  }[]
> => {
  return await sendAPIRequest(`/requests?type=received`, "GET");
};

export const getSentRequests = async (): Promise<
  {
    receiver: IUser;
    _id: string;
  }[]
> => {
  return await sendAPIRequest(`/requests?type=sent`, "GET");
};

export const acceptRequest = async (
  connectionId: string,
  receiver: IUserwithPrivateData
) => {
  return await sendAPIRequest(`/accept/${connectionId}`, "POST", { receiver });
};

export const rejectRequest = async (connectionId: string) => {
  return await sendAPIRequest(`/reject/${connectionId}`, "POST");
};

export const cancelRequest = async (connectionId: string) => {
  return await sendAPIRequest(`/cancel/${connectionId}`, "POST");
};

export const getAcceptedRequests = async (): Promise<
  {
    receiver: IUserwithPrivateData;
    _id: string;
  }[]
> => {
  return await sendAPIRequest("/accepted-requests", "GET");
};
