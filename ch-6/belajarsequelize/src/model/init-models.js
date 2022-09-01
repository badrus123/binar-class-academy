var DataTypes = require("sequelize").DataTypes;
var _attendance = require("./attendance");
var _guru = require("./guru");
var _kelas = require("./kelas");
var _price = require("./price");
var _ref_kelas = require("./ref_kelas");
var _score = require("./score");
var _sekolah = require("./sekolah");
var _siswa = require("./siswa");
var _subject = require("./subject");
var _transaction = require("./transaction");

function initModels(sequelize) {
  var attendance = _attendance(sequelize, DataTypes);
  var guru = _guru(sequelize, DataTypes);
  var kelas = _kelas(sequelize, DataTypes);
  var price = _price(sequelize, DataTypes);
  var ref_kelas = _ref_kelas(sequelize, DataTypes);
  var score = _score(sequelize, DataTypes);
  var sekolah = _sekolah(sequelize, DataTypes);
  var siswa = _siswa(sequelize, DataTypes);
  var subject = _subject(sequelize, DataTypes);
  var transaction = _transaction(sequelize, DataTypes);

  attendance.belongsTo(guru, { as: "id_guru_guru", foreignKey: "id_guru"});
  guru.hasMany(attendance, { as: "attendances", foreignKey: "id_guru"});
  kelas.belongsTo(guru, { as: "id_walikelas_guru", foreignKey: "id_walikelas"});
  guru.hasMany(kelas, { as: "kelas", foreignKey: "id_walikelas"});
  ref_kelas.belongsTo(guru, { as: "id_guru_guru", foreignKey: "id_guru"});
  guru.hasMany(ref_kelas, { as: "ref_kelas", foreignKey: "id_guru"});
  ref_kelas.belongsTo(kelas, { as: "id_kelas_kela", foreignKey: "id_kelas"});
  kelas.hasMany(ref_kelas, { as: "ref_kelas", foreignKey: "id_kelas"});
  transaction.belongsTo(price, { as: "id_price_price", foreignKey: "id_price"});
  price.hasMany(transaction, { as: "transactions", foreignKey: "id_price"});
  kelas.belongsTo(sekolah, { as: "id_sekolah_sekolah", foreignKey: "id_sekolah"});
  sekolah.hasMany(kelas, { as: "kelas", foreignKey: "id_sekolah"});
  siswa.belongsTo(sekolah, { as: "id_sekolah_sekolah", foreignKey: "id_sekolah"});
  sekolah.hasMany(siswa, { as: "siswas", foreignKey: "id_sekolah"});
  attendance.belongsTo(siswa, { as: "id_siswa_siswa", foreignKey: "id_siswa"});
  siswa.hasMany(attendance, { as: "attendances", foreignKey: "id_siswa"});
  score.belongsTo(siswa, { as: "id_siswa_siswa", foreignKey: "id_siswa"});
  siswa.hasMany(score, { as: "scores", foreignKey: "id_siswa"});
  transaction.belongsTo(siswa, { as: "id_siswa_siswa", foreignKey: "id_siswa"});
  siswa.hasMany(transaction, { as: "transactions", foreignKey: "id_siswa"});
  score.belongsTo(subject, { as: "id_subject_subject", foreignKey: "id_subject"});
  subject.hasMany(score, { as: "scores", foreignKey: "id_subject"});

  return {
    attendance,
    guru,
    kelas,
    price,
    ref_kelas,
    score,
    sekolah,
    siswa,
    subject,
    transaction,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
