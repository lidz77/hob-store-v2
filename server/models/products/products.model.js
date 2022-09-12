module.exports= (sequelize, Sequelize) => {
  const Products = sequelize.define('products', {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    },
    // data type of ref details table should be converted b4 res
    size: {
      type: Sequelize.STRING
    },
    number_of_hobs: {
      type: Sequelize.STRING
    },
    images_ids: {
      type: Sequelize.STRING
    },
    material: {
      type: Sequelize.STRING
    },
    brand: {
      type: Sequelize.STRING
    },
    color: {
      type: Sequelize.STRING
    }
  })
  return Products;
}
