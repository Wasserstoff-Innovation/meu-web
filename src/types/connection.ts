import { IConnectedUser, IUserwithPrivateData } from "./user";

export type IConnection = {
  connectionId: string;
  user: IConnectedUser;
};

export type IConnectionwithPrivateData = {
  connectionId: string;
  user: IUserwithPrivateData;
};
