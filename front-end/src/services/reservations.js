import http from "../http-common";

class ReservationsService {
  getAll() {
    return http.get("/reservations");
  }

  // get(catwayId, reservationId) {
  //   return http.get(`/catways/${catwayId}/reservations/${reservationId}`);
  // }

  // create(catwayId, data) {
  //   return http.post(`/catways/${catwayId}/reservations`, data);
  // }

  // update(catwayId, reservationId, data) {
  //   return http.put(`/catways/${catwayId}/reservations/${reservationId}`, data);
  // }

  // delete(catwayId, reservationId) {
  //   return http.delete(`/catways/${catwayId}/reservations/${reservationId}`);
  // }
}

export default new ReservationsService();
