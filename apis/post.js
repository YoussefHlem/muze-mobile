import service from "./_client";

// Define endpoint functions for each API call
export const myPosts = () => {
  return service.get("/social/api/post");
};

export const createPost = (body) => {
  return service.post("/social/api/post/create", body);
};

export const updatePost = (body) => {
  return service.post("/api/post/update", body);
};

export const getRandomPosts = (body) => {
  return service.post("/social/api/random_posts", body);
};
