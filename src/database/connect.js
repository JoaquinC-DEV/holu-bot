import dotenv from "dotenv";
import mongoose from 'mongoose';

dotenv.config();

export default function () {
    mongoose.connect(process.env.MDB_PATH, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to the database"))
    .catch((err) => console.log("Ocurrió un error al conectarse a la DB: " + err))
}