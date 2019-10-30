const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./models");


const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
const MONGOD_URI = process.env.MONGOD_URI || "mongod://localhost/mongoHeadlines";

mongoose.connect(MONGOD_URI, { useNewUrlParser: true });


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});