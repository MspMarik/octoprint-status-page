const express = require("express");
const axios = require("axios");
const app = express();
const configJson = require("./config");
const config = configJson.config;
const path = require("path");
const static = express.static(__dirname + "/public");

app.use("/public", static);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(config.port, () => {
    console.log(`App is running http://localhost${config.port}`);
});
