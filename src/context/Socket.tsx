import React, { createContext, useContext, useEffect, useState } from "react";
import socketio from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Doc, unsafeIdentity } from "@junobuild/core";
import { IUser } from "../types/user";
import { socketEventHandler } from "../socket";
// import { checkDelegationChain } from "../utils";

const getAuthData = async (userDoc: Doc<IUser>) => {
  // checkDelegationChain();
  const identity = await unsafeIdentity();
  const principal = identity.getPrincipal();
  return {
    principal: principal.toText(),
    key: userDoc.key,
  };
};
// // Function to establish a socket connection with authorization token
const getSocket = async (userDoc: Doc<IUser>) => {
  const auth = await getAuthData(userDoc);

  // Create a socket connection with the provided URI and authentication
  const socket = socketio(import.meta.env.VITE_SOCKET_URL, {
    withCredentials: true,
    autoConnect: false,
    auth: auth,
  });
  return socket;
};

// Create a context to hold the socket instance
const SocketContext = createContext<{
  socket: ReturnType<typeof socketio> | null;
}>({
  socket: null,
});

// Custom hook to access the socket instance from the context
const useSocket = () => useContext(SocketContext);
// SocketProvider component to manage the socket instance and provide it through context
const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  // State to store the socket instance
  const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(
    null
  );

  const dispatch = useAppDispatch();

  const { userDoc } = useAppSelector((state) => state.main);
  // Set up the socket connection when the component mounts
  useEffect(() => {
    if (!userDoc?.data.id) {
      return;
    }
    const socketSetter = async () => {
      setSocket(await getSocket(userDoc));
    };
    socketSetter();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (socket && userDoc?.data.id) {
      socket.connect();
      socketEventHandler(socket, userDoc.data, dispatch);
    }
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);


  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export { SocketProvider, useSocket };
