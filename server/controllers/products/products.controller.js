const db = require("../../models");
const Products = db.products;
const Categories = db.categories;
const Dimensions = db.dimensions;
const Brands = db.brands;
const Materials = db.materials;
const ProductImages = db.productImages;

const relationalArray = [
  {
    model: Categories,
    as: "category",
    attributes: ["name"],
  },
  {
    model: Dimensions,
    attributes: ["name"],
  },
  {
    model: Brands,
    as: "brand",
    attributes: ["name"],
  },
  {
    model: Materials,
    as: "material",
    attributes: ["name"],
  },
  {
    model: ProductImages,
    as: "productImages",
    attributes: ["id"],
  },
];

exports.create = (req, res) => {
  const title = req.body.title;
  let productId;
  if (!title) {
    res.status(400).send({
      message: "Title must be required",
    });
    return;
  }
  Products.create(req.body)
    .then((productResult) => {
      console.log(req.body);
      productId = productResult.id;
      ProductImages.update(
        { productId: productId },
        {
          where: {
            id: req.body.productImagesId,
          },
        }
      ).then(
        Products.findByPk(productId, {
          include: relationalArray,
        }).then((result) => {
          console.log(result);
          res.send(result);
        })
      );
      // Products.findByPk(productId).then(
      //   Products.findByPk(productId, {
      //     include: relationalArray
      //   }).then((result) => {
      //     console.log(result);
      //     res.send(result);
      //   })
      // )
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while creating new product",
      });
    });
};

exports.findAll = (req, res) => {
  Products.findAll({
    where: null,
    include: relationalArray,
  })
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Cant get the product",
      });
    });
};

exports.findById = (req, res) => {
  const productId = req.params.id;
  console.log(req.params);
  Products.findByPk(productId, {
    include: relationalArray,
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("Error while finding dimension", err);
    });
};

exports.delete = (req, res) => {
  console.log(req);
  const idArray = req.query.idArray;
  Products.destroy({
    where: {
      id: idArray,
    },
  })
    .then((result) => {
      console.log(result);
      if (result > 0) {
        res.send({
          message: `ID ${idArray} delete successfully`,
          idArray: idArray.map(Number),
        });
      } else {
        res.send({
          message: `Could not delete id ${idArray}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete id ${idArray} due to ${err}`,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const data = req.body.data;
  console.log(req);
  Products.update(data, {
    where: {
      id: id,
    },
  })
    .then((result) => {
      if (result == 1) {
        Products.findByPk(id)
          .then((result) => {
            if (data.dimensionId !== 0) {
              result.setDimension(data.dimensionId);
            }
            if (data.brandId !== 0) {
              result.setBrand(data.brandId);
            }
            if (data.materialId !== 0) {
              result.setMaterial(data.materialId);
            }
            // if(data.imageIds !== 0){
            //   result.setImage(data.imageIds);
            // }
          })
          .then(
            Products.findByPk(id, {
              include: relationalArray,
            }).then((result) => {
              res.send({
                message: `Update product id ${id} successfully`,
                data: {
                  data: result,
                  id: parseInt(id),
                },
              });
            })
          );
      } else {
        res.send({
          message: `Cannot update id ${id}. Id not found or req.body is empty`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error while updating id ${id}. Error: ${err}`,
      });
    });
};
