import service from "./_client";

// Define endpoint functions for each API call
export const searchArtist = (body) => {
  return service.post("/social/api/search_artists", body);
};

export const getAllArtists = (body) => {
  return service.post("/social/api/listall_artists", body);
};
