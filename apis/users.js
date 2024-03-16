import service from "./_client";

// Define endpoint functions for each API call
export const userPosts = (body) => {
  return service.post("/social/api/user_post", body);
};

export const isFollowing = (body) => {
  return service.post("/social/api/isfollowing", body);
};

export const requestFollow = (body) => {
  return service.post("/social/api/follow", body);
};

export const searchedUserCollaborations = (body) => {
  return service.post("/social/api/collaboration/listrequestsuser", body);
};
