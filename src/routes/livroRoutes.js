import express from "express"
import LivroController from "../controller/livroController.js";
import paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes.get("/livros", LivroController.listarLivros, paginar)
    .get("/livros/busca", LivroController.listarLivrosPorFiltro, paginar)
    .get("/livros/:id", LivroController.listarLivroPorId)
    .post("/livros", LivroController.cadastrarLivro)
    .put("/livros/:id", LivroController.atualizaLivro)
    .delete("/livros/:id", LivroController.deletarLivro)

export default routes;