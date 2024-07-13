import React, { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { View, FlatList, TextInput, Text, Pressable } from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import ScreenWrapper from "../../hoc/ScreenWrapper";
import { useFocusEffect } from "@react-navigation/native";
import { getRooms, joinRoom } from "../../apis/chat";
import { setProfileData, setChatData, setUserChatId } from "../../store/services/chatSlice";
import { useWebSocket } from "../../hooks/useWebSocket";

const defaultProfile =
  "https://muzefirststorage.blob.core.windows.net/usercontainer/img/img-1687160459492";

const Container = styled.View`
  flex: 1;
  background-color: "transparent";
  padding: 20px;
  padding-bottom: 80px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
`;

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #333;
  border-radius: 10px;
  padding: 5px 10px;
  margin-bottom: 20px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  color: #fff;
  margin-left: 5px;
`;

const ChatItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  margin-bottom: 18px;
  background-color: #1a1a1a;
  border-radius: 10px;
  min-height: 70px;
`;

const ProfileImageContainer = styled.View`
  position: relative;
`;

const ProfileImage = styled.Image`
  width: 52px;
  height: 52px;
  border-radius: 25px;
  margin-right: 10px;
`;

const StatusIndicator = styled.View`
  position: absolute;
  top: -5px;
  right: 10px;
  width: 15px;
  height: 15px;
  border-radius: 7.5px;
  background-color: ${(props) => (props.online ? "#1e90ff" : "transparent")};
`;

const ChatInfo = styled.View`
  flex: 1;
`;

const ChatName = styled.Text`
  color: #fff;
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const ChatMessage = styled.Text`
  color: #aaa;
`;

const ChatMeta = styled.View`
  align-items: flex-end;
`;

const TimeText = styled.Text`
  color: #aaa;
`;

const UnreadBadge = styled.View`
  background-color: #1e90ff;
  border-radius: 10px;
  padding: 2px 6px;
  margin-top: 5px;
`;

const UnreadText = styled.Text`
  color: #fff;
  font-size: 12px;
`;

const ChatsScreen = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const [chats, setChats] = useState([]);
  const { messages, sendMessage } = useWebSocket();
  const usersStatus = useSelector((state) => state.chat.chatData)?.filter(
    (message) => message.msg_type === 1 || message.msg_type === 2 || message.msg_type === 11
  );

  useFocusEffect(
    useCallback(() => {
      const fetchRooms = async () => {
        try {
          const res = await getRooms({});
          const chatData = res.data["dialog data"];
          const sortedChats = [...chatData].sort(
            (a, b) => new Date(b.lastMessage.sent) - new Date(a.lastMessage.sent)
          );
          setChats(sortedChats);
        } catch (error) {
          console.error("Failed to fetch rooms:", error);
        }
      };
      fetchRooms();
    }, [])
  );

  const joinRoomHandler = (chat) => {
    const { otherUserId } = chat;
    dispatch(setUserChatId(otherUserId));
    joinRoom({ dialog_with: otherUserId, mark_read: true }).then((res) => {
      // Set Profile Data
      dispatch(setProfileData({ ...res.data.recipientData, id: otherUserId }));
      // Set Messages
      dispatch(setChatData(res.data["messsage data"].concat(usersStatus)));
      // Navigate To Chat Screen
      navigate("Conversation", { messages, sendMessage });
    });
  };

  const getUserStatus = (userId) => {
    const user = usersStatus?.filter((user) => +user?.user_pk === +userId);
    const status = user[user?.length - 1];
    return status ? status?.msg_type === 1 || status?.msg_type === 11 : false;
  };

  return (
    <Container>
      <Header>
        <Icon name="arrow-back" size={24} color="#fff" />
        <Title>Chats</Title>
      </Header>
      <SearchContainer>
        <SearchInput placeholder="Search..." placeholderTextColor="#aaa" />
        <Icon name="search" size={20} color="#aaa" />
      </SearchContainer>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => joinRoomHandler(item)}>
            <ChatItem>
              <ProfileImageContainer>
                <ProfileImage source={{ uri: item.userImageUrl || defaultProfile }} />
                <StatusIndicator online={getUserStatus(item.otherUserId)} />
              </ProfileImageContainer>
              <ChatInfo>
                <ChatName>
                  {item.firstName} {item.lastName}
                </ChatName>
                <ChatMessage>{item.lastMessage.text}</ChatMessage>
              </ChatInfo>
              <ChatMeta>
                <TimeText>{new Date(item.created).toISOString().slice(11, 16)}</TimeText>
                {item.unreadCount > 0 && (
                  <UnreadBadge>
                    <UnreadText>{item.unreadCount}</UnreadText>
                  </UnreadBadge>
                )}
              </ChatMeta>
            </ChatItem>
          </Pressable>
        )}
      />
    </Container>
  );
};

export default ScreenWrapper(ChatsScreen);
