import service from "./_client";

// Define endpoint functions for each API call
export const collaborationCreate = (body) => {
  return service.post("/social/api/collaboration/create", body);
};

export const collaborationJoin = (body) => {
  return service.post("/social/api/collaboration/join", body);
};

export const collaborationDetail = (body) => {
  return service.post("/social/api/collaboration/detail", body);
};

export const collaborationRequests = (arg) => {
  return service.post("/social/api/collaboration/listrequests", {
    ...arg,
  });
};

export const collaborationAR = (body) => {
  return service.post("/social/api/collaboration/acceptreject", body);
};

export const collaborationListAll = (arg) => {
  return service.get("/social/api/collaboration/alllist", {
    params: { ...arg },
  });
};

export const myCollaborationRequests = () => {
  return service.get("/social/api/collaboration/listrequests");
};

export const sentCollaborationRequests = () => {
  return service.get("/social/api/collaboration/listsentrequests");
};

export const listCollaborationOnGenres = (body) => {
  return service.post("/social/api/collaboration/list_on_genres", body);
};

export const listCollaborationOnSkills = (body) => {
  return service.post("/social/api/collaboration/list_on_skills", body);
};

export const deleteCollab = (body) => {
  return service.post("/social/api/collaboration/delete_collab", body);
};
