import dotenv from "dotenv";
import mongoose from 'mongoose';

dotenv.config();

export default function (logs) {
    mongoose.connect(process.env.MDB_PATH, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database");
        logs("Connected to DB", {
            type: "correct",
            category: "db"
        });
    })
    .catch((err) => {
        console.log("Ocurrió un error al conectarse a la DB: " + err);
        logs(`Ocurrió un error al conectarse a la DB:\n \`\`\`${err}\`\`\``, {
            type: "error",
            category: "db"
        });
    });
}