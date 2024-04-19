import { IUser, IUserwithPrivateData } from "../../types/user";
import { CONNECT_API_URL } from "./userCard";

export const connect = async (userData: IUser) => {
  return fetch(`${CONNECT_API_URL}/connect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: userData }),
  })
    .then((res) => res.json())
    .then((data) => data);
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

export const getRequests = async (
  type: "sent" | "received",
  userId: string
) => {
  return fetch(`${CONNECT_API_URL}/requests?type=${type}`, {
    headers: {
      userid: userId,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
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

export const rejectRequest = async (connectionId: string, userId: string) => {
  return fetch(`${CONNECT_API_URL}/reject/${connectionId}`, {
    method: "POST",
    headers: {
      userid: userId,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
};
