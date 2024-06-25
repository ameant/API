import http from "../http-common";

class CatwaysService {
  getAll() {
    return http.get("/catways");
  }

  get(id) {
    return http.get(`/catways/${id}`);
  }

  create(data) {
    return http.post("/catways", data);
  }

  update(id, data) {
    return http.put(`/catways/${id}`, data);
  }

  update(id, data) {
    return http.patch(`/catways/${id}`, data);
  }

  delete(id) {
    return http.delete(`/catways/${id}`);
  }
}

export default new CatwaysService();
