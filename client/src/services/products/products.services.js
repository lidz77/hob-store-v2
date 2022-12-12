import http from "../../http-common";

class ProductsDataService {
  getAll() {
    return http.get("/products/");
  }
  create(data) {
    return http.post("/products/", data);
  }
  findById(id) {
    return http.get(`/products/${id}`, id);
  }
  update(id, data) {
    return http.put(`/products/${id}`, { id, data });
  }
  delete(idArray) {
    return http.delete("/products/", { params: { idArray: idArray } });
  }
}
export default new ProductsDataService();
