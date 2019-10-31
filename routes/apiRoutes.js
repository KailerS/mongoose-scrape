const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");

module.exports = app => {
    app.get("/scrape", function (req, res) {
        axios.get("https://www.premierleague.com/news").then(function (response) {
            let $ = cheerio.load(response.data);
            $("span.title").each(function (i, element) {
                let title = $(element).text().trim();
                let link = $(element).parents("a").attr("href");
                let tag = $(element).attr("span.tag");
                let summary = $(element).attr("span.text");

                db.collections.insert({
                    title,
                    link,
                    tag,
                    summary
                });
            });
            res.end();
        });

    });
};