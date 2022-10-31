import http from '../../http-common';

class ProductPropsDataService {
  getAll(propName){
    return http.get(`/products/${propName}`);
  };
  delete(propName, id){
    return http.delete(`/products/${propName}/${id}`);
  };
  update(propName, id, data){
    return http.put(`/products/${propName}/${id}`, data);
  };
  create(propName, data){
    return http.post(`/products/${propName}`, data)
  };
}

export default new ProductPropsDataService();
