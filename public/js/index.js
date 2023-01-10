

function onFormSubmit() {
    event.preventDefault();
};

var mp3 = "";
var duration = "";
var title = ""

$("#js").slideUp();
$("#spin").addClass("js-hide");

    $("#btn").click(function(){
        let value = $("#value-name").val();
        var thumbnailCode = "";
        var validate = "";
        var thumbnailUrl = "";
        var a = "";

        a = document.createElement("a");
        a.setAttribute("href", value)

        if ( a.hostname === "www.youtube.com") {
            a = document.createElement("a");
            a.setAttribute("href", value)

            thumbnailCode = a.search;
            validate = a.hostname;
            thumbnailCode = thumbnailCode.slice(3, thumbnailCode.length);
            thumbnailUrl = "https://i.ytimg.com/vi/" + thumbnailCode + "/0.jpg"
            console.log(thumbnailUrl, validate);
            console.log("done");
        } else if (a.hostname === "youtu.be") {
            a = document.createElement("a");
            a.setAttribute("href", value)
            thumbnailCode = a.pathname;
            validate = a.hostname;
            thumbnailCode = thumbnailCode.slice(1, thumbnailCode.length);
            thumbnailUrl = "https://i.ytimg.com/vi/" + thumbnailCode + "/0.jpg"
            console.log(thumbnailUrl, validate);
            console.log("fuck");
        }
        
        validate = a.hostname;
        

        if (validate === "www.youtube.com" || validate === "youtu.be"){
            $(".error").text("")
            $.ajax({
                type: "POST",
                url: "/button",
                data: {url: value, urlCode: thumbnailCode},
                success: function(res){
                    mp3 = res.mp3Url;
                    duration = res.durationTime;
                    title = res.videoTitle;
    
                    var min = Math.floor(duration / 60);
                    var sec = duration % 60;
    
                    $("#title").text(title);
                    $("#duration").text("Duration: " + min + ":" + sec);
                    $("#download").attr("href", mp3);
                    $("#thumbnail").attr("src", thumbnailUrl);
                    console.log(min + " " + sec);
                }
            });
            
    
    
            if ($("#spin").attr("class") === "hide-spin" || $("#spin").attr("js") === "js-hide" ){
                console.log("Already Aplied");
            } else {
                $("#spin").removeClass("js-hide");
                $("#spin").addClass("progress");
                
                setTimeout(function(){
                    $("#spin").removeClass("progress");
                }, 15000); 
    
    
                setInterval(function(){
                    $("#spin").removeClass("js-hide");
                    $('#js').slideDown();
                },15000);
                
                 
            }
            console.log(validate);
        } else {
            $(".error").text("Please Enter Valid link")
            console.log(validate);
        }

        
        
    });





//  function test(){
    
//     return userUrl;
// }

// exports.userEntereUrl = function(){
//     console.log(userUrl);
// }

// $("document").ready(function(){
//     $("#form").on("submit", function(event){
//         event.preventDefault();
//         let value = $("#value-name").val();

//         $.ajax({
//             type: "POST",
//             url: "/",
//             data: {url: value},
//             success: function(res){
//                 console.log(res);
//             }
//         });
//     });
// });
