import mongoose from "mongoose";

function manipuladorDeErros(erro, req, res, next) {
    if(erro instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: "Um ou mais dados fornecidos estão incorretos!" })
    } else {
        res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
}

export default manipuladorDeErros;