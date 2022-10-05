import http from '../../http-common';

class ProductsDataService {
  getAll(){
    return http.get('/products/')
  };
  create(data){
    return http.post('/products/', data)
  };
  findById(id){
    return http.get('/products/:id', id)
  }
}
export default new ProductsDataService();
