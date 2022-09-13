import http from '../../http-common';

class DimensionsDataService {
  getAll(){
    return http.get('/products/dimensions');
  };
  delete(id){
    return http.delete(`/products/dimensions/${id}`);
  };
  update(id, data){
    return http.put(`/products/dimensions/${id}`, data);
  };
  create(data){
    return http.post('/products/dimensions', data)
  };
}

export default new DimensionsDataService();
