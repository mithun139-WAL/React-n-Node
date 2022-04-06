const Sequelize = require('sequelize');

const db = new Sequelize('westsidenode', 'root', 'Mithun@iiito1', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = db;
