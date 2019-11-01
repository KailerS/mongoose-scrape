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
        var thisId = $(this).attr("data-id");
        console.log($(".noteBody").val());
        $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                body: $(".noteBody").val()
            }
        }).then(function (data) {
                console.log(data);
                $(".modal").hide();
        });
        $(".noteBody").val("");

    });
});