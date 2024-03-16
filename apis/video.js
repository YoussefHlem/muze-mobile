import service from "./_client";

// Define endpoint functions for each API call
export const popularVideos = () => {
  return service.get("/social/api/following_posts");
};

export const getComment = () => {
  return service.get("/social/api/comment");
};

export const createComment = (body) => {
  return service.post("/social/api/comment/create", body);
};

export const getAllPostComments = (body) => {
  return service.post("/social/api/post_comments", body);
};
