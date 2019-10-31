const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");

module.exports = app => {
    app.get("/scrape", function (req, res) {
        axios.get("https://www.premierleague.com/news").then(function (response) {
            let $ = cheerio.load(response.data);
            $("figcaption").each(function (i, element) {
                const result = {}
                result.title = $(element).children("span.title").text().trim();               
                result.link = $(element).parents("a").attr("href");
                result.tag = $(element).children("span.tag").text().trim();
                result.summary = $(element).children("span.text").text().trim();

                db.Article.create(result)
                    .then(data =>{
                        console.log(data)
                    })
                .catch(err =>{
                    res.status(500).end();
                });
                
            });
        });
        
        res.end();
    });
};