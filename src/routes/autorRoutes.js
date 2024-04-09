import express from "express"
import AutorController from "../controller/autorController.js";

const routes = express.Router();

routes.get("/autores", AutorController.listarAutores);
routes.get("/autores/:id", AutorController.listarAutorPorId);
routes.post("/autores", AutorController.cadastrarAutor);
routes.put("/autores/:id", AutorController.atualizaAutor);
routes.delete("/autores/:id", AutorController.deletarAutor);

export default routes;