import service from "./_client";

// Define endpoint functions for each API call
export const signin = (body) => {
  return service.post("/social/api/login", body);
};

export const signout = () => {
  return service.post("/auth/api/logout/");
};

export const signup = (body) => {
  return service.post("/social/api/profile/basic_create", body);
};

export const isAuth = (body) => {
  return service.post("/social/api/profile/sign_up_done", body);
};

export const updateProfile = (body) => {
  return service.post("/social/api/profile/update", body);
};

export const signUpDone = (body) => {
  return service.post("/social/api/profile/sign_up_done", body);
};

export const deleteProfile = (body) => {
  return service.post("social/api/profile/delete", body);
};

export const popularArtists = (payload) => {
  return service.post("social/api/popular_artists", payload);
};

export const likePost = (payload) => {
  return service.post("social/api/post/like", payload);
};

export const dislikePost = (payload) => {
  return service.post("social/api/post/dislike", payload);
};

export const getGenres = () => {
  return service.post("/social/api/profile/genres_list");
};

export const getAllDetails = () => {
  return service.post("/social/api/profile/full_details");
};

export const getFollowing = () => {
  return service.get("/social/api/user_following");
};

export const getFollowers = () => {
  return service.get("/social/api/user_followers");
};

export const getMyStudios = (body) => {
  return service.post("/social/api/studio_booking/room_details_full", body);
};

export const getMyCollabs = () => {
  return service.get("social/api/collaboration/listown");
};

export const getSearchedUserDetails = (body) => {
  return service.post("/social/api/profile/searched_full_details", body);
};

export const getSearchedUserFollowings = (body) => {
  return service.post("/social/api/following", body);
};

export const getSearchedUserFollowers = (body) => {
  return service.post("/social/api/followers", body);
};

export const submitFeedback = (body) => {
  return service.post("/social/api/feedback/submit", body);
};
