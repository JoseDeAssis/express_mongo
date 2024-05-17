import express from "express"
import LivroController from "../controller/livroController.js";

const routes = express.Router();

routes.get("/livros", LivroController.listarLivros)
    .get("/livros/busca", LivroController.listarLivrosPorFiltro)
    .get("/livros/:id", LivroController.listarLivroPorId)
    .post("/livros", LivroController.cadastrarLivro)
    .put("/livros/:id", LivroController.atualizaLivro)
    .delete("/livros/:id", LivroController.deletarLivro)

export default routes;