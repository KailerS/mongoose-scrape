const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");

module.exports = app => {
    app.get("/scrape", function (req, res) {
        axios.get("https://www.premierleague.com/news").then(function (response) {
            let $ = cheerio.load(response.data);
            const result = {}
            $("figcaption").each(function (i, element) {
                result.title = $(element).children("span.title").text().trim();               
                result.link = "https://www.premierleague.com" + $(element).parents("a").attr("href");
                result.tag = $(element).children("span.tag").text().trim();
                result.summary = $(element).children("span.text").text().trim();

                db.Article.create(result)
                    .then(data =>{
                        console.log(data)
                    })
                .catch(err => {
                    res.status(500).end();
                });                
            });
            res.json(result);
        });
        
    });

    app.get("/articles", function(req, res) {
        db.Article.find({})
          .then(function(articles){
            res.json(articles);
          })
          .catch(function(err){
            res.json(err);
          });
    });
};