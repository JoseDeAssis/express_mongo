import express from "express"
import AutorController from "../controller/autorController.js";
import paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes
    .get("/autores", AutorController.listarAutores, paginar)
    .get("/autores/:id", AutorController.listarAutorPorId)
    .post("/autores", AutorController.cadastrarAutor)
    .put("/autores/:id", AutorController.atualizaAutor)
    .delete("/autores/:id", AutorController.deletarAutor);

export default routes;