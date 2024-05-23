import service from "./_client";

// Define CRUD functions for a specific resource
export const profileGigs = (payload) => {
  return service.post("gig/api/profile-gigs", payload);
};
export const userGigs = (payload) => {
  return service.post("gig/api/user-gigs", payload);
};
export const allGigs = (payload) => {
  return service.post("gig/api/all-gigs", payload);
};
export const createGig = (payload) => {
  return service.post("gig/api/create-gig", payload);
};
export const gigDetails = (payload) => {
  return service.post("gig/api/gig-details", payload);
};
export const submitGig = (payload) => {
  return service.post("gig/api/submit-gig", payload);
};
