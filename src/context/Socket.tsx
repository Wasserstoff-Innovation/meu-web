import React, { createContext, useContext, useEffect, useState } from "react";
import socketio from "socket.io-client";
import { useAppSelector } from "../redux/hooks";
import { toast } from "react-toastify";
import { unsafeIdentity } from "@junobuild/core";

const getNonceAndSignature = async () => {
  const identity = await unsafeIdentity();
  const principal = identity.getPrincipal();
  console.log({ principal });
  return {
    principal: principal.toText(),
  };
};
// // Function to establish a socket connection with authorization token
const getSocket = async () => {
  const auth = await getNonceAndSignature();
  // console.log("auth", auth);

  // Create a socket connection with the provided URI and authentication
  const socket = socketio(import.meta.env.VITE_SOCKET_URL, {
    withCredentials: true,
    autoConnect: true,
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

  const { userDoc } = useAppSelector((state) => state.main);
  // Set up the socket connection when the component mounts
  useEffect(() => {
    // if (!userDoc) {
    //   return;
    // }
    const socketSetter = async () => {
      setSocket(await getSocket());
    };
    // socketSetter();
  }, [userDoc]);

  // mount and unmount listeners
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("connect", () => {
      console.log("connected");
    });

    // socket.on('ai-message', async (data) => {
    //   // console.log('chat-message', data);
    //   // dispatch(updateChats(data));
    //   // const saved =
    //   await addChat(realm, data);
    //   // console.log('saved Chat Message', saved);
    // });

    socket.on("socket-error-event", (errMsg) => {
      console.log("socket-error-event", errMsg);
      toast.error(errMsg);
    });

    socket.on("disconnect", () => {
      console.log("socket disconnected");
    });
    return () => {
      socket.off("connect");
      socket.off("chat-message");
      socket.off("socket-error-event");
      socket.off("disconnect");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

// Export the SocketProvider component and the useSocket hook for other components to use
// eslint-disable-next-line react-refresh/only-export-components
export { SocketProvider, useSocket };
