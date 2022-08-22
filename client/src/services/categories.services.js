import http from '../http-common';

class CategoriesDataService {
  getAll(){
    return http.get('/categories/')
  };
  create(data){
    return http.post('/categories/add', data);
  }
}

export default new CategoriesDataService();
