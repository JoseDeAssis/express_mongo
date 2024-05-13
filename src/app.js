import express  from "express";
import connectDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js"
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";

const connection = await connectDatabase();

connection.on("error", (erro) => {
    console.error("erro de conexão", erro);
});

connection.once("open", () => {
    console.log("Conexão com o banco feita com sucesso!");
})

const app = express();
routes(app);

// app.get("/livros/:id", async (req, res) => {
//     const livroBuscado = await livro.findById(req.params.id);
//     res.status(200).json(livroBuscado);
// }); 

// app.put("/livros/:id", (req, res) => {
//     const index = buscaLivro(req.params.id);
//     livros[index].titulo = req.body.titulo;

//     res.status(201).json(livros);
// });

// app.delete("/livros/:id", (req, res) => {
//     const index = buscaLivro(req.params.id);
//     livros.splice(index, 1);

//     res.status(200).send("Livro removido com sucesso!");
// });

app.use(manipuladorDeErros);

export default app;