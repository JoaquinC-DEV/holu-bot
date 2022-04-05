const express = require("express");

module.exports = (sharder) => {
    const app = express();

    app.get("/ping", (req, res) => {
        res.send("Aquí está todo bien...");
    });

    app.get("/hi", (req, res) => {
        res.send("Hi!");
    });

    const listener = app.listen(process.env.PORT, () => {
        console.log("Express server listening in port " + listener.address().port);
    });
}