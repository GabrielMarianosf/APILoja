const Produto = require("../Models/Produto");

module.exports = {
  async create(req, res) {
    const { nome, preco } = req.body;
    const { user_id } = req.params;

    try {
      console.log(nome + preco + user_id);
      const cadastrarProduto = await Produto.create({
        nome,
        preco,
        user: user_id,
      });

      res.status(201).send(cadastrarProduto);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async deletar(req, res) {
    const { produto_id, user_id } = req.params;
    try {
      const deletarProduto = await Produto.findByIdAndDelete(produto_id);
      return res
        .status(200)
        .send({ status: "Usuário deletado", user: deletarProduto });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async listarporUsuario(req, res) {
    const { user_id } = req.params;
    try {
      const listUsuario = await Produto.find({
        user: user_id,
      });
      return res.status(200).send(listUsuario);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async listarTodos(req, res) {
    try {
      const ListaTudo = await Produto.find();
      return res.status(200).send(ListaTudo);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
