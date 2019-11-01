const db = require("../models");

module.exports = app => {
    app.get("/", function (req,res){
        db.Article.find().then(function(article){
            const hbsObject = {
                article
            };
            res.render("index", hbsObject);
        });
    });
};