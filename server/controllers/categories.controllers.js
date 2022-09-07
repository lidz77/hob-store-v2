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

//delete

exports.delete = (req, res) => {
  console.log(req);
  const idArray = req.query.idArray;
  Categories.destroy({
    where:{
      id: idArray
    }
  }).then((result) => {
    if(result > 0){
      res.send({
        message: `ID ${idArray} delete successfully`,
        idArray: idArray.map(Number)
      })
    }else{
      res.send({
        message: `Could not delete id ${idArray}`
      })
    }
  }).catch((err) => {
    res.status(500).send({
      message: `Could not delete id ${idArray} due to ${err}`
    })
  })
}
