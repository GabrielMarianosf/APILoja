const { Router } = require("express");

const UserController = require("../Controllers/UserController");
const SessionController = require("../Controllers/SessionController");
const ProdutoController = require("../Controllers/ProdutosController");

const Routes = Router();

Routes.post("/caduser", UserController.cadastrar);
Routes.post("/session", SessionController.create);
Routes.post("/produto/:user_id", ProdutoController.create);
Routes.get("/listarTodos", UserController.listarTodos);
Routes.get("/list_produto/:user_id", ProdutoController.listarporUsuario);
Routes.delete("/deletar/:user_id", UserController.deletar);
Routes.delete(
  "/deletar_produto/:user_id/:produto_id",
  ProdutoController.deletar
);
Routes.get("/listar_produtos", ProdutoController.listarTodos);

module.exports = Routes;
