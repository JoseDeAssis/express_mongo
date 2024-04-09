import livro from "../model/Livro.js";
import { autor } from "../model/Autor.js";

class LivroController {
    static async listarLivros(req, res) {

        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch(erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição` });
        }
    }

    static async listarLivroPorId(req, res) {
        try {
            const id = req.params.id;
            const livroBuscado = await livro.findById(id);
            res.status(200).json(livroBuscado);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição` });
        }
    }

    static async listarLivrosPorEditora(req, res) {
        const editora = req.query.editora;
        try {
            const livrosPorEditora = await livro.find({ editora: editora });
            res.status(200).json(livrosPorEditora);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição` });
        }
    }

    static async cadastrarLivro(req, res) {
        const novoLivro = req.body;
        
        try {
            const autorLivro = await autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: { ...autorLivro._doc }};
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({ message: "Criado com sucesso", livro: livroCriado });
        } catch(erro) {
            res.status(500).json({ message: `${erro.message} - falha ao cadastrar livro`});
        }
    }

    static async atualizaLivro(req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Livro atualizado com sucesso" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao atualizar livro` });
        }
    }

    static async deletarLivro(req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(200).json({ message: "Livro deletado com sucesso" })
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao deletar livro` })
        }
    }
}


export default LivroController;