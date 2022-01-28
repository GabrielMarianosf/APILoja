const User = require("../Models/User");
const bcrypt = require("bcrypt");

module.exports = {
  async create(req, res) {
    const { email, senha } = req.body;
    try {
      const exist = await User.findOne({ email });
      if (!exist)
        return res.status(400).send({ message: "usuário não encontrado" });

      const validarSenha = await bcrypt.compare(senha, exist.senha);
      if (!validarSenha)
        return res.status(400).send({ message: "Senha Inválida" });

      return res.status(200).send(exist);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
