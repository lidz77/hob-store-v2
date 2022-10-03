import http from '../../http-common';

class ProductsDataService {
  getAll(){
    return http.get('/products/')
  }
}
export default new ProductsDataService();
