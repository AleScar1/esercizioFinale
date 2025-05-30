//schema
import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cognome: { type: String, required: true },
    email: { type: String, required: true},
    dataDiNascita: { type: String, required: true},
    avatar: { type: String, required: true}
  });

const Author = mongoose.model('Author', authorSchema);
export default Author;