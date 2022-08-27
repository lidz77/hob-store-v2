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
  const id = req.body.id;
  Categories.destroy({
    where:{
      id: id
    }
  }).then((result) => {
    if(result > 0){
      res.send({
        message: `ID ${id} delete successfully`
      })
    }else{
      res.send({
        message: `Could not delete id ${id}`
      })
    }
  }).catch((err) => {
    res.status(500).send({
      message: `Could not delete id ${id} due to ${err}`
    })
  })

}
