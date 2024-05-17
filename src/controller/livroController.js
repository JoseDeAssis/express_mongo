import { autores, livros } from "../model/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class LivroController {
    static async listarLivros(req, res, next) {

        try {
            const listaLivros = await livros.find({});
            res.status(200).json(listaLivros);
        } catch(erro) {
            next(erro);
        }
    }

    static async listarLivroPorId(req, res, next) {
        try {
            const id = req.params.id;
            const livroBuscado = await livros.findById(id);
            res.status(200).json(livroBuscado);
        } catch (erro) {
            next(erro);
        }
    }

    static async listarLivrosPorFiltro(req, res, next) {
        const busca = await processaBusca(req.query);

        try {
            if(busca !== null ) {
                const livrosPorEditora = await livros.find(busca).populate("autor");
                res.status(200).json(livrosPorEditora);
            } else {
                res.status(200).send([]);
            }
        } catch (erro) {
            next(erro);
        }
    }

    static async cadastrarLivro(req, res, next) {
        const novoLivro = req.body;
        
        try {
            const autorLivro = await autores.findById(novoLivro.autor);
            if(autorLivro === null ) {
                next(new NaoEncontrado("Id do autor não localizado!"));
            } else {
                const livroCompleto = { ...novoLivro, autor: { ...autorLivro._doc }};
                const livroCriado = await livros.create(livroCompleto);
                res.status(201).json({ message: "Criado com sucesso", livro: livroCriado });
            }
        } catch(erro) {
            next(erro);
        }
    }

    static async atualizaLivro(req, res, next) {
        try {
            const id = req.params.id;
            await livros.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Livro atualizado com sucesso" });
        } catch (erro) {
            next(erro);
        }
    }

    static async deletarLivro(req, res, next) {
        try {
            const id = req.params.id;
            await livros.findByIdAndDelete(id);
            res.status(200).json({ message: "Livro deletado com sucesso" })
        } catch (erro) {
            next(erro);
        }
    }

}

async function processaBusca(params) {
    const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = params;
    let busca = {};
    // const regex = RegExp(titulo, "i");

    if(editora) busca.editora = editora;
    // if(titulo) busca.titulo = regex;
    if(titulo) busca.titulo = { $regex: titulo, $options: "i" };
    if(minPaginas || maxPaginas) busca.paginas = {};
    if(minPaginas) busca.paginas.$gte = minPaginas;
    if(maxPaginas) busca.paginas.$lte = maxPaginas;
    if(nomeAutor) {
        const buscaAutor = { $regex: nomeAutor, $options: "i"};
        const autor = await autores.findOne({ nome: buscaAutor });
        
        if(autor !== null) {
            const autorId = autor._id;
            busca.autor = autorId;
        } else {
            busca = null;
        }
    }

    return busca;
}

export default LivroController;