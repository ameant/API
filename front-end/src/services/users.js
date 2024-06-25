import http from "../http-common";

class UsersService {
 create(data) {
    return http.post("/users/add", data);
  }

  update(id, data) {
    return http.put(`/users/${id}`, data);
  }

  delete(id) {
    return http.delete(`/users/${id}`);
  }
}

export default new UsersService();