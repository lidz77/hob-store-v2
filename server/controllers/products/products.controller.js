const db = require('../../models');
const Products = db.products;
const Dimensions = db.dimensions;
const Brands = db.brands;
const Materials = db.materials;

exports.create = (req, res) => {
  const title = req.body.title;
  const dimensionId = req.body.dimensionId;
  const brandId = req.body.brandId;
  const materialId = req.body.materialId;
  if(!title){
    res.status(400).send({
      message: "Title must be required"
    });
    return;
  }
  Products.create(req.body).then((result) => {
    const productId = result.id;
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

      Products.findByPk(productId, {
        include: [
          {
            model: Dimensions,
            as: 'dimension',
            attributes: ['name'],
            through: {
              attributes: []
            }
          },
          {
            model: Brands,
            as: 'brand',
            attributes: ['name'],
            through: {
              attributes: []
            }
          },
          {
            model: Materials,
            as: 'material',
            attributes: ['name'],
            through: {
              attributes: []
            }
          },
        ]
      }).then((result) => {
        res.send(result);
      });
    })
  }).catch((err) => {
    res.status(500).send({
      message: err.message || 'Error while creating new product'
    })
  });
}

exports.findAll = (req, res) => {
  Products.findAll({
    where: null,
    include: [
      {
        model: Dimensions,
        as: 'dimension',
        attributes: ['name'],
        through: {
          attributes: []
        }
      },
      {
        model: Brands,
        as: 'brand',
        attributes: ['name'],
        through: {
          attributes: []
        }
      },
      {
        model: Materials,
        as: 'material',
        attributes: ['name'],
        through: {
          attributes: []
        }
      },
    ]
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

// exports.addPropToProduct = (req, res) => {
//   const productId = req.body.productId;
//   const dimensionId = req.body.dimensionId;
//   Products.findByPk(productId).then((product) => {
//     if(!product){
//       console.log('Product not found');
//       res.send({
//         message: `Product not found`,
//         data: null
//       })
//     }
//     if (dimensionId) {
//       return Dimensions.findByPk(dimensionId).then((dimension) => {
//         if(!dimension){
//           console.log('Dimension not found');
//           res.send({
//             message: 'dim not found',
//             data: null
//           })
//         }
//         product.addDimension(dimension);
//         console.log(`Add dimension id ${dimension.id} to product id ${product.id}`);
//         res.send({
//           message: `Add dimension id ${dimension.id} to product id ${product.id}`,
//           data: {
//             dimensionId: dimension.id,
//             productId: product.id
//           }
//         })
//       });
//     } else {
//
//     }
//   }).catch((err) => {
//     console.log('error while creating product', err)
//     res.status(500).send({
//       message: 'error while creating product',
//       err: err
//     })
//   });
// }
// exports.addDimension = (req, res) => {
//   console.log('AAAAA', req)
//   const productId = req.body.productId;
//   const dimensionId = req.body.data.dimensionId;
//
//   Products.findByPk(productId).then((product) => {
//     if(!product){
//       console.log('Product not found');
//       res.send({
//         message: `Product not found`,
//         data: null
//       })
//     }
//     return Dimensions.findByPk(dimensionId).then((dimension) => {
//       if(!dimension){
//         console.log('Dimension not found');
//         res.send({
//           message: 'dim not found',
//           data: null
//         })
//       }
//       console.log(`Add dimension id ${dimension.id} to product id ${product.id}`);
//       product.addDimension(dimension);
//       res.send({
//         message: `Add dimension id ${dimension.id} to product id ${product.id}`,
//         data: {
//           dimensionId: dimension.id,
//           productId: product.id
//         }
//       })
//     });
//   }).catch((err) => {
//     console.log('error while creating product', err)
//     res.status(500).send({
//       message: 'error while creating product',
//       err: err
//     })
//   });
// }

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
