$("#scrape").on("click", () => {
    $.get("/scrape", () => {
        console.log("scraping")
    }).then(data =>{
        if (data){
            console.log(data);
            location.reload();
        }
    })
})