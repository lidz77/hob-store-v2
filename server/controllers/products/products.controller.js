const db = require('../../models');
const Products = db.products;
const Dimensions = db.dimensions;

exports.create = (req, res) => {
  const title = req.body.title;
  console.log(req);
  if(!title){
    res.status(400).send({
      message: "Title must be required"
    });
    return;
  }

  Products.create(req.body).then((result) => {
    res.send(result);
  }).catch((err) => {
    res.status(500).send({
      message: err.message || 'Error while creating new product'
    })
  });
}

exports.findAll = (req, res) => {
  Products.findAll({
    where: null
  }).then((result) => {
    console.log(result);
    res.send(result);
  }).catch((err) => {
    res.status(500).send({
      message: err.message || 'Cant get the product'
    })
  });
}

exports.findById = (req, res) => {
  const productId = req.params.id;
  console.log(req);
  Products.findByPk(productId, {
    include: [
      {
        model: Dimensions,
        as: 'dimension',
        attributes: ['name'],
        through:{
          attributes: [],
        }
      }
    ]
  }).then((result) => {
    res.send(result);
  }).catch((err) => {
    console.log('Error while finding dimension', err);
  });
}

exports.addDimension = (req, res) => {
  const productId = req.body.productId;
  const dimensionId = req.body.dimensionId;
  console.log(req);
  Products.findByPk(productId).then((product) => {
    if(!product){
      console.log('Product not found');
      res.send({
        message: `Product not found`,
        data: null
      })
    }
    return Dimensions.findByPk(dimensionId).then((dimension) => {
      if(!dimension){
        console.log('Dimension not found');
        res.send({
          message: 'dim not found',
          data: null
        })
      }
      product.addDimension(dimension);
      console.log(`Add dimension id ${dimension.id} to product id ${product.id}`);
      res.send({
        message: `Add dimension id ${dimension.id} to product id ${product.id}`,
        data: {
          dimensionId: dimension.id,
          productId: product.id
        }
      })
    });
  }).catch((err) => {
    console.log('error while adding tutorial to tag:', err)
    res.status(500).send({
      message: 'error while adding tutorial to tag:',
      err: err
    })
  });
}

exports.delete = (req, res) => {
  const id = req.params.id;
  Products.destroy({
    where: {
      id: id
    }
  }).then((result) => {
    console.log(result);
    if (result === 1) {
      res.send({
        message: `ID ${id} delete successfully`,
        id: id
      })
    } else {
      res.send({
        message: `Could not delete id ${id}`
      })
    }
  }).catch((err) => {
    res.status(500).send({
      message: `Could not delete ${id} due to ${err}`
    })
  });
}

exports.update = (req, res) => {
  console.log(req);
  const id = req.params.id;
  const data = req.body;

  Products.update(data, {
    where: {
      id: id
    }
  }).then((result) => {
    if(result == 1){
      res.send({
        message: `Update product id ${id} successfully`,
        data: {
          ...data,
          id: parseInt(id)
        }
      })
    }else{
      res.send({
        message: `Cannot update id ${id}. Id not found or req.body is empty`
      })
    }
  }).catch((err) => {
    res.status(500).send({
      message: `Error while updating id ${id}. Error: ${err}`
    })
  });
}
