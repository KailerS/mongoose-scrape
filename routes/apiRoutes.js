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
    app.get("/articles/:id", function(req, res) {
        db.Article.findOne({_id: req.params.id})
          .populate("note")
          .then(function(result){
            res.json(result);
          })
          .catch(function(err){
            res.json(err);
          });
      });
      app.post("/articles/:id", function(req, res) {
        db.Note.create(req.body)
          .then(function(notedb){
            return db.Article.findOneAndUpdate({_id: req.params.id}, {$set: {note: notedb._id}}, {new: true})
          })
          .then(function(result){
            res.json(result);
          })
          .catch(function(err){
            res.json(err);
          });
      });

      app.delete("/note/:id", function(req, res) {
        db.Note.remove({_id: req.params.id}).then(function(data){
          res.json(data);
        });

      });
};