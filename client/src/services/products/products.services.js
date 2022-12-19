import http from "../../http-common";

class ProductsDataService {
  getByAttributes(filterObject) {
    //axios get request should not have body, it should be received as query in sever's request
    return http.get("/products/client", { params: filterObject });
  }
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
