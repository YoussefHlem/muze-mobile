import service from "./_client";

// Define functions for each endpoint
export function searchBooking(data) {
  return service.post("/social/api/studio_booking/search_rooms", data);
}

export function getSlots(data) {
  return service.post("/social/api/studio_booking/list_bookings", data);
}

export function createBook(data) {
  return service.post("/social/api/studio_booking/create_booking", data);
}

export function deleteBooking(data) {
  return service.post("/social/api/studio_booking/delete_booking", data);
}

export function getMyBookings(data) {
  return service.post("/social/api/studio_booking/list_user_bookings", data);
}

export function getStudioRoomDetails(data) {
  return service.post("/social/api/studio_booking/room_details_full", data);
}

export function getStudioImages(data) {
  return service.post("/social/api/booking/institution_photos", data);
}
