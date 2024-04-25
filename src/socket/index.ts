import { Socket } from "socket.io-client";
import { IUser } from "../types/user";
import { toast } from "react-toastify";
import { AppDispatch } from "../redux/store";
import { updateRecommendedCards } from "../redux/features/mainSlice";

export const socketEventHandler = (
  socket: Socket,
  userCard: IUser,
  dispatch: AppDispatch
) => {
  socket.on("connect", () => {
    console.log("Connected to the server");
    socket.emit("send-user-doc", userCard);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from the server");
  });

  socket.on("reconnect", () => {
    console.log("Reconnected to the server");
  });

  socket.on("socket-error-event", (errMsg) => {
    console.log("socket-error-event", errMsg);
    toast.error(errMsg);
  });

  socket.on("recommended-cards", (cards) => {
    console.log("Recommended Cards: ", cards);
    dispatch(updateRecommendedCards(cards));
  });

  socket.on("card-message", (message) => {
    console.log("Card Message: ", message);
  });
};
