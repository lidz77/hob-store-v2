module.exports = (sequelize, Sequelize) => {
  const Categories = sequelize.define('categories', {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    },
  })
  return Categories;
}
