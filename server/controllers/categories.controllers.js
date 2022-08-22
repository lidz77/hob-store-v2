const db = require('../models');
const Categories = db.categories;
const Op = db.Sequelize.Op; //for find/ filters

// get all categories (with tittle filters)

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? {title : {[Op.like] : `%${title}`}} : null;
  Categories.findAll({
    where: condition,
  }).then((result) => {
    res.send(result)
  }).catch((err) => {
    res.status(500).send({
      message: err.message || 'Some error occur pls check the logs'
    })
  });
}

//create new category;
exports.create = (req, res) => {

  console.log(req.body);

  if(!req.body.title){
    res.status(400).send({
      message: "Content cant be empty"
    });
    return
  };

  const category = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  Categories.create(category).then((result) => {
    res.send(result);
  }).catch((err) => {
    res.status(500).send({
      message: err.message || 'Error while creating category'
    })
  });
}
