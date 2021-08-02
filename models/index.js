let path;
switch (process.env.NODE_ENV) {
  case "production":
    path = `${__dirname}/../.env.prod`;
    break;
  case "dev":
    path = `${__dirname}/../.env.dev`;
    break;
  default:
    path = `${__dirname}/../.env.dev`;
}
require("dotenv").config({ path: path });

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

/** logs */
db.logs = require("./log.model")(sequelize, Sequelize);

/** users */
db.users = require("./user.model")(sequelize, Sequelize);

/** groups  with users */
db.groups = require("./group.model")(sequelize, Sequelize);
db.groups.hasMany(db.users, { as: "users" });
db.users.belongsTo(db.groups, {
  foreignKey: "groupId",
  as: "group",
});

/** boards with users */
db.boards = require("./board.model")(sequelize, Sequelize);
db.users.hasMany(db.boards, { as: "boards" });
db.boards.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

module.exports = db;
