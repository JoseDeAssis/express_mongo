import livro from "../model/Livro.js";
import { autor } from "../model/Autor.js";

class LivroController {
    static async listarLivros(req, res, next) {

        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch(erro) {
            next(erro);
        }
    }

    static async listarLivroPorId(req, res, next) {
        try {
            const id = req.params.id;
            const livroBuscado = await livro.findById(id);
            res.status(200).json(livroBuscado);
        } catch (erro) {
            next(erro);
        }
    }

    static async listarLivrosPorEditora(req, res, next) {
        const editora = req.query.editora;
        try {
            const livrosPorEditora = await livro.find({ editora: editora });
            res.status(200).json(livrosPorEditora);
        } catch (erro) {
            next(erro);
        }
    }

    static async cadastrarLivro(req, res, next) {
        const novoLivro = req.body;
        
        try {
            const autorLivro = await autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: { ...autorLivro._doc }};
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({ message: "Criado com sucesso", livro: livroCriado });
        } catch(erro) {
            next(erro);
        }
    }

    static async atualizaLivro(req, res, next) {
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Livro atualizado com sucesso" });
        } catch (erro) {
            next(erro);
        }
    }

    static async deletarLivro(req, res, next) {
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(200).json({ message: "Livro deletado com sucesso" })
        } catch (erro) {
            next(erro);
        }
    }
}


export default LivroController;