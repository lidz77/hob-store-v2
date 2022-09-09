import http from '../http-common';

class CategoriesDataService {
  getAll(){
    return http.get('/categories/')
  };
  create(data){
    return http.post('/categories/add', data);
  };
  delete(idArray){
    return http.delete('/categories/', {params: {idArray: idArray}});
  };
  update(id, data){
    return http.put(`/categories/${id}`, {id, data})
  }
}

export default new CategoriesDataService();
