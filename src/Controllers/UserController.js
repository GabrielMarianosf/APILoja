const User = require("../Models/User");
const bcrypt = require("bcrypt");

async function gerarHash(senha) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(senha, salt);
    return hash;
  } catch (error) {
    return error;
  }
}

module.exports = {
  async cadastrar(req, res) {
    const { nome, telefone, email, senha, latitude, longitude } = req.body;
    const location = {
      type: "Point",
      coordinates: [latitude, longitude],
    };

    try {
      const exists = await User.findOne({ email });
      if (exists)
        return res.status(400).send({ message: "User already exists" });

      const senhaHash = await gerarHash(senha);
      console.log(senhaHash);

      const createdUser = await User.create({
        nome,
        telefone,
        email,
        senha: senhaHash,
        location,
      });
      return res.status(201).send(createdUser);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async deletar(req, res) {
    const { user_id } = req.params;
    const { auth } = req.headers;

    if (auth !== user_id)
      return res.status(400).send({ message: "Sem permissão para deletar" });

    try {
      const deleteUser = await User.findByIdAndDelete(user_id);
      return res.status(200).send({ status: "deleted", user: deleteUser });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async listarTodos(req, res) {
    try {
      const allUsers = await User.find();
      return res.status(200).send(allUsers);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
