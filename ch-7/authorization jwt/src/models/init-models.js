var DataTypes = require("sequelize").DataTypes;
var _user_game = require("./user_game");
var _user_game_biodata = require("./user_game_biodata");
var _user_game_history = require("./user_game_history");

function initModels(sequelize) {
  var user_game = _user_game(sequelize, DataTypes);
  var user_game_biodata = _user_game_biodata(sequelize, DataTypes);
  var user_game_history = _user_game_history(sequelize, DataTypes);

  user_game_biodata.belongsTo(user_game, { as: "user_game", foreignKey: "user_game_id" });
  user_game.hasOne(user_game_biodata, { as: "user_game_biodata", foreignKey: "user_game_id" });
  user_game_history.belongsTo(user_game, { as: "user_game", foreignKey: "user_game_id" });
  user_game.hasOne(user_game_history, { as: "user_game_histories", foreignKey: "user_game_id" });

  user_game_history.hasOne(user_game_biodata, { as: "user_game_biodata", foreignKey: "user_game_id", sourceKey: "user_game_id" });
  user_game_biodata.hasOne(user_game_history, { as: "user_game_histories", foreignKey: "user_game_id" });

  return {
    user_game,
    user_game_biodata,
    user_game_history,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
