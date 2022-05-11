import express from "express";
import profiles from "./database/models/profile.js";

export default function (sharder) {
    const app = express();

    app.get("/", (req, res) => {
        res.send("Aquí está todo bien...");
    });

    app.get("/ping", (req, res) => {
        res.send("Hi!");
    });

    app.get("/profiles/:profileID", (req, res) => {
        if (isNaN(req.params.profileID) && req.params.profileID.length !== 18) {
            res.status(400).send("La sintaxis de la ID está mal...");
        } else {
            const profile = profiles.findOne({ user_id: req.params.profileID });
            if (profile) {
                res.send({
                    user_id: profile.user_id,
                    profile_description: profile.description
                });
            } else {
                res.status(404).send("Perfil no encontrado...");
            }
        }
    });

    const listener = app.listen(process.env.PORT, () => {
        console.log("Express server listening in port " + listener.address().port);
    });
}