module.exports = {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: 'lidz3107',
  DB: 'hobstore',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    accquire: 30000,
    idle: 1000
  }
}
