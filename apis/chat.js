import service from "./_client";

// Define CRUD functions for a specific resource
export const createRoom = (payload) => {
  return service.post("chat/api/create-room", payload);
};

export const joinRoom = (payload) => {
  return service.post("chat/api/room", payload);
};

export const getRooms = (payload) => {
  return service.post("chat/api/user-rooms", payload);
};

export const uploadFile = (payload) => {
  return service.post("chat/api/upload-file", payload);
};
