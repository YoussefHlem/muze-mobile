import React, { useEffect, useState, useRef } from "react";
import {
  View,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
} from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import ScreenWrapper from "../../hoc/ScreenWrapper";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { addMessage } from "../../store/services/chatSlice";
import { selectUser } from "../../store/services/userSlice";

const defaultProfile =
  "https://muzefirststorage.blob.core.windows.net/usercontainer/img/img-1687160459492";

const ITEM_HEIGHT = 100;

const Chat = () => {
  const route = useRoute();
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const { messages, sendMessage } = route.params;
  const profileData = useSelector((state) => state.chat.profileData);
  const userId = useSelector((state) => state.chat.userChatId);
  const { user } = useSelector(selectUser);
  const allData = useSelector((state) => state.chat.chatData);
  const chatData = useSelector((state) => state.chat.chatData)?.filter(
    (message) => message.msg_type === 3 || message.text
  );
  const usersStatus = useSelector((state) => state.chat.chatData)?.filter(
    (message) => message.msg_type === 1 || message.msg_type === 2 || message.msg_type === 11
  );
  const flatListRef = useRef(null);
  const lastMessage = messages[messages.length - 1];

  const getUserStatus = (userId) => {
    const user = usersStatus?.filter((user) => +user?.user_pk === +userId);
    const status = user[user?.length - 1];
    return status ? status?.msg_type === 1 || status?.msg_type === 11 : false;
  };

  const handleSendMessage = (msgType) => {
    if (message.trim()) {
      const messageObj = {
        text: message,
        sent: new Date().getTime(),
        user_pk: userId,
        sender: user.pk + "",
        msg_type: msgType,
      };
      sendMessage(message, userId, msgType);
      dispatch(addMessage(messageObj));
      setMessage("");
    }
  };

  useEffect(() => {
    if (messages.length && messages[messages.length - 1]?.msg_type === 1) {
      sendMessage(null, messages[messages.length - 1].user_pk, 11);
    }
  }, []);

  const handleKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === "Enter") {
      handleSendMessage(3);
    }
  };

  useEffect(() => {
    if (message?.length > 0) sendMessage(null, userId, 5);
    else sendMessage(null, userId, 9);
  }, [message]);

  const renderItem = ({ item }) => {
    return (
      <>
        {item.text && (
          <View style={{ paddingHorizontal: 20, paddingVertical: 5 }}>
            <ChatBubble isSender={+item.sender === +user.pk}>
              <MessageText>{item.text}</MessageText>
            </ChatBubble>
            <TimeText isSender={+item.sender === +user.pk}>
              {new Date(item.sent * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </TimeText>
          </View>
        )}
      </>
    );
  };

  return (
    <Container>
      <Header>
        <Pressable onPress={() => navigate("Messaging")} style={{ marginRight: 10 }}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <ProfileImageContainer>
          <ProfileImage source={{ uri: profileData.userImageUrl || defaultProfile }} />
          <StatusIndicator online={getUserStatus(userId)} />
        </ProfileImageContainer>
        <UserInfo>
          <UserName>{profileData.firstName || "Jane Doe"}</UserName>
          <LastSeen>Last seen: {profileData.lastSeen || "4:16 PM"}</LastSeen>
        </UserInfo>
        <Icon name="ellipsis-vertical" size={24} color="#fff" />
      </Header>
      <FlatList
        ref={flatListRef}
        data={chatData}
        keyExtractor={() => Math.random().toString(36)}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 10 }}
        initialScrollIndex={chatData.length - 1}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
      />
      {lastMessage?.msg_type === 5 && userId !== +lastMessage?.sender && (
        <Typing>Typing ...</Typing>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <InputContainer>
          <MessageInput
            placeholder="Type here..."
            placeholderTextColor="#aaa"
            value={message}
            onChangeText={setMessage}
            onSubmitEditing={() => handleSendMessage(3)}
            returnKeyType="send"
            blurOnSubmit={false}
            onKeyPress={handleKeyPress}
          />
          <Pressable onPress={() => handleSendMessage(3)}>
            <Icon name="send" size={24} color="#1e90ff" />
          </Pressable>
        </InputContainer>
      </KeyboardAvoidingView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #171717;

  padding-bottom: 80px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background-color: #333;
`;

const ProfileImageContainer = styled.View`
  position: relative;
`;

const ProfileImage = styled.Image`
  width: 50px;
  height: 50px;
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
  background-color: ${(props) => (props.online ? "#1e90ff" : "#ff1e1e")};
`;

const UserInfo = styled.View`
  flex: 1;
`;

const UserName = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

const LastSeen = styled.Text`
  color: #aaa;
  font-size: 12px;
`;

const ChatBubble = styled.View`
  background-color: ${(props) => (props.isSender ? "#1e1e1e" : "#333")};
  padding: 10px;
  border-radius: 10px;
  margin: 5px 0;
  max-width: 80%;
  align-self: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
`;

const MessageText = styled.Text`
  color: #fff;
`;

const TimeText = styled.Text`
  color: #aaa;
  font-size: 10px;
  align-self: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
  margin-top: 2px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background-color: #333;
  border-radius: 25px;
  margin: 10px;
`;

const MessageInput = styled.TextInput`
  flex: 1;
  color: #fff;
  padding: 10px;
  background-color: #1e1e1e;
  border-radius: 25px;
  margin-right: 10px;
`;

const Typing = styled.Text`
  color: #fff;
  font-size: 16px;
  margin-left: 10px;
`;

export default ScreenWrapper(Chat);
