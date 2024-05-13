import { autor } from "../model/Autor.js";

class AutorController {
    static async listarAutores(req, res, next) {

        try {
            const listaAutores = await autor.find({});
            res.status(200).json(listaAutores);
        } catch(erro) {
            next(erro);
        }
    }

    static async listarAutorPorId(req, res, next) {
        try {
            const id = req.params.id;
            const autorBuscado = await autor.findById(id);

            if(autorBuscado !== null) {
                res.status(200).json(autorBuscado);
            } else {
                res.status(404).send({ message: "Id do autor não localizado!" });
            }
        } catch (erro) {
            next(erro);
        }
    }

    static async cadastrarAutor(req, res, next) {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({ message: "Criado com sucesso", autor: novoAutor });
        } catch(erro) {
            next(erro);
        }
    }

    static async atualizaAutor(req, res, next) {
        try {
            const id = req.params.id;
            await autor.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Autor atualizado com sucesso" });
        } catch (erro) {
            next(erro);
        }
    }

    static async deletarAutor(req, res, next) {
        try {
            const id = req.params.id;
            await autor.findByIdAndDelete(id);
            res.status(200).json({ message: "Autor deletado com sucesso" })
        } catch (erro) {
            next(erro);
        }
    }
}


export default AutorController;