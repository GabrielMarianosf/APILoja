const mongoose = require("mongoose");
const PointSchema = require("./Utils/PointSchema");

const Schema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  location: {
    type: PointSchema,
    index: "2dsphere",
  },
});

module.exports = mongoose.model("User", Schema);
