const db = require('../../models');
const Products = db.products;
const Dimensions = db.dimensions;
const Brands = db.brands;
const Materials = db.materials;

const relationalArray = [
  {
    model: Dimensions,
    as: 'dimension',
    attributes: ['id', 'name'],
    through: {
      attributes: []
    }
  },
  {
    model: Brands,
    as: 'brand',
    attributes: ['id', 'name'],
    through: {
      attributes: []
    }
  },
  {
    model: Materials,
    as: 'material',
    attributes: ['id', 'name'],
    through: {
      attributes: []
    }
  },
];

exports.create = (req, res) => {
  const title = req.body.title;
  const dimensionId = req.body.dimensionId;
  const brandId = req.body.brandId;
  const materialId = req.body.materialId;
  var productId;
  if(!title){
    res.status(400).send({
      message: "Title must be required"
    });
    return;
  }
  Products.create(req.body).then((productResult) => {
    productId = productResult.id;
    Products.findByPk(productId).then((product) => {
      if (!isNaN(dimensionId)) {
        Dimensions.findByPk(dimensionId).then((dimensionResult) => {
          product.addDimension(dimensionResult);
          console.log(`Add product to dimension success`)
        });
      }
      if (!isNaN(brandId)) {
        Brands.findByPk(brandId).then((brandResult) => {
          product.addBrand(brandResult);
          console.log(`Add product to brand success`)
        });
      }
      if (!isNaN(materialId)) {
        Materials.findByPk(materialId).then((materialResult) => {
          product.addMaterial(materialResult);
          console.log(`Add product to material success`)
        });
      }
    }).then(
      Products.findByPk(productId, {
        include: relationalArray
      }).then((result) => {
        console.log(productId);
        res.send(result);
      })
    )
  }).catch((err) => {
    res.status(500).send({
      message: err.message || 'Error while creating new product'
    })
  });
}

exports.findAll = (req, res) => {
  Products.findAll({
    where: null,
    include: relationalArray
  }).then((result) => {
    res.send(result);
  }).catch((err) => {
    res.status(500).send({
      message: err.message || 'Cant get the product'
    })
  });
}

exports.findById = (req, res) => {
  const productId = req.params.id;
  Products.findByPk(productId, {
    include: relationalArray
  }).then((result) => {
    res.send(result);
  }).catch((err) => {
    console.log('Error while finding dimension', err);
  });
}


exports.delete = (req, res) => {
  console.log(req)
  const idArray = req.query.idArray;
  Products.destroy({
    where: {
      id: idArray
    }
  }).then((result) => {
    console.log(result);
    if (result > 0) {
      res.send({
        message: `ID ${idArray} delete successfully`,
        idArray: idArray.map(Number)
      })
    } else {
      res.send({
        message: `Could not delete id ${idArray}`
      })
    }
  }).catch((err) => {
    res.status(500).send({
      message: `Could not delete id ${idArray} due to ${err}`
    })
  });
}

exports.update = (req, res) => {
  const id = req.params.id;
  const data = req.body.data;
  console.log(req.body);
  Products.update(data, {
    where: {
      id: id
    }
  }).then((result) => {
    if(result == 1){
      Products.findByPk(id).then((result) => {
        if(data.dimensionId !== 0){
          result.setDimension(data.dimensionId);
        }
        if(data.brandId !== 0){
          result.setBrand(data.brandId);
        }
        if(data.materialId !== 0){
          result.setMaterial(data.materialId);
        }
      }).then(Products.findByPk(id,{
        include: relationalArray
      }).then((result) => {
        res.send({
          message: `Update product id ${id} successfully`,
          data: {
            data: result,
            id: parseInt(id)
          }
        })
      }));
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
