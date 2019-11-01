$(function () {
    $("#scrape").on("click", () => {
        $.get("/scrape", () => {
            console.log("scraping")
        }).then(data => {
            if (data) {
                console.log(data);
                location.reload();
            }
        })
    });

    $(".note").on("click", function () {
        $(".noteBody").val("");
        let thisId = $(this).attr("data-id");
        $.ajax({
            method: "GET",
            url: "/articles/" + thisId
          }).then(function (data) {
            console.log(data);
            if (data.note) {
                $(".noteBody").val(data.note.body);
            }
            $(".modal").show();
        })
    });
    $(".close").on("click", () => {
        $(".modal").hide();
    });

    $(".subNote").on("click", function () {
        const thisId = $(this).attr("data-id");
        console.log(thisId);
        const noteValue = $(this).parent().prev().children().val();
        console.log(noteValue);        
        console.log($(".noteBody").val());
        $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                body: noteValue
            }
        }).then(function (data) {
                console.log(data);
                $(".modal").hide();
        });
        $(".noteBody").val("");

    });
});