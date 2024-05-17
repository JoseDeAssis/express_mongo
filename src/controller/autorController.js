import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores } from "../model/index.js";

class AutorController {
    static async listarAutores(req, res, next) {

        try {
            const listaAutores = autores.find();
            req.resultado = listaAutores;
            
            next();
        } catch(erro) {
            next(erro);
        }
    }

    static async listarAutorPorId(req, res, next) {
        try {
            const id = req.params.id;
            const autorBuscado = await autores.findById(id);

            if(autorBuscado !== null) {
                res.status(200).json(autorBuscado);
            } else {
                next(new NaoEncontrado("Id do autor não localizado!"));
            }
        } catch (erro) {
            next(erro);
        }
    }

    static async cadastrarAutor(req, res, next) {
        try {
            const novoAutor = await autores.create(req.body);
            res.status(201).json({ message: "Criado com sucesso", autor: novoAutor });
        } catch(erro) {
            next(erro);
        }
    }

    static async atualizaAutor(req, res, next) {
        try {
            const id = req.params.id;
            await autores.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Autor atualizado com sucesso" });
        } catch (erro) {
            next(erro);
        }
    }

    static async deletarAutor(req, res, next) {
        try {
            const id = req.params.id;
            await autores.findByIdAndDelete(id);
            res.status(200).json({ message: "Autor deletado com sucesso" })
        } catch (erro) {
            next(erro);
        }
    }
}


export default AutorController;