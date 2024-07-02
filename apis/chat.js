import service from "./_client";

export const getRooms = (payload) => {
  return service.post("chat2/api/dialogs", payload);
};

export const joinRoom = (payload) => {
  return service.post("chat2/api/messages", payload);
};
