import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../store/services/chatSlice";
import { getItemAsync } from "expo-secure-store";
import { stringify } from "flatted";

export const useWebSocket = () => {
  const url = "wss://muzenetworktest.azurewebsites.net/chat_ws";
  const [refreshToken, setRefreshToken] = useState("");
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.chat.profileData);

  // Create a ref for profileData
  const profileDataRef = useRef(profileData);

  const getRefreshToken = async () => {
    const refresh = await getItemAsync("refreshToken");
    setRefreshToken(refresh);
  };

  // Update the ref whenever profileData changes
  useEffect(() => {
    profileDataRef.current = profileData;
  }, [profileData]);

  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    getRefreshToken();
    setMessages([]);

    const socketUrl = `${url}?token=${refreshToken}`;
    const newSocket = new WebSocket(socketUrl);

    setSocket(newSocket);

    newSocket.addEventListener("open", () => {
      setIsConnected(true);
      console.log("WebSocket connection established");
    });

    newSocket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
      // Use the ref to access the latest profileData
      if (
        message.msg_type === 9 ||
        message.msg_type === 1 ||
        message.msg_type === 2 ||
        message.msg_type === 11
      ) {
        dispatch(addMessage(message));
      } else if (
        +profileDataRef.current.id === +message.sender ||
        +profileDataRef.current.id === +message.user_pk
      ) {
        dispatch(addMessage(message));
      }
    });

    newSocket.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
    });

    newSocket.addEventListener("close", () => {
      setIsConnected(false);
      console.log("WebSocket connection closed");
    });

    return () => {
      newSocket.close();
    };
  }, [refreshToken, dispatch]);

  const sendMessage = (message, userId, msgType) => {
    if (socket && isConnected) {
      socket.send(
        JSON.stringify({
          msg_type: msgType,
          text: message,
          user_pk: userId?.toString(),
          random_id: -214,
        })
      );
    } else {
      console.warn("WebSocket is not connected. Message not sent.");
    }
  };

  return { messages, sendMessage };
};
