import service from "./_client";

// Define endpoint functions for each API call
export const genres = () => {
  return service.get("/social/api/genre");
};

export const skills = () => {
  return service.get("/social/api/skill");
};

export const userTypes = () => {
  return service.get("/social/api/user_type");
};

export const instruments = () => {
  return service.get("/social/api/instrument");
};
