import http from '../../http-common';

class ProductImagesService {
  getAll(){
    return http.get(`/products/images`)
  };


  uploadSingle (file, onUploadProgress){
    let formData = new FormData();
    formData.append('multi-files', file);
    return http.post('/products/images', formData, {
      headers:{
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress,
    });
  }

  // upload multiple files at one, it affects e.loaded/e.total even on retrieving progress
  uploadMultiple(files, onUploadProgress){
    console.log(files);
    let formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('multi-files', file)
    });
    return http.post(`/products/images`, formData ,{
      headers:{
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress,
    });
  }
}

export default new ProductImagesService();
