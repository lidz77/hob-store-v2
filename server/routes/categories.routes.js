module.exports = (app) => {
  const categoriesController = require('../controllers/categories.controllers');
  var categoriesRouter = require('express').Router();

  categoriesRouter.post('/add',categoriesController.create);
  categoriesRouter.get('/', categoriesController.findAll);

  app.use('/api/categories', categoriesRouter);
}