module.exports = (app) => {
  const productsController = require('../../controllers/products/products.controller');
  var productsRouter = require('express').Router();

  productsRouter.post('/', productsController.create);
  productsRouter.get('/', productsController.findAll);
  productsRouter.get('/:id', productsController.findById);
  productsRouter.delete('/:id', productsController.delete);
  productsRouter.put('/:id',productsController.update);
  productsRouter.post('/add', productsController.addDimension);
  productsRouter.post('/:id', productsController.findById)
  app.use('/api/products/', productsRouter);
};
