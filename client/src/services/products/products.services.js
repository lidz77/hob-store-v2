import http from '../../http-common';

class ProductsDataService {
  getAll(){
    return http.get('/products/')
  };
  create(){
    return http.post('/products/')
  }
}
export default new ProductsDataService();
