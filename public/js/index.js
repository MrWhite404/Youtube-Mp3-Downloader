

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
        
        let a = document.createElement("a");
        a.setAttribute("href", value)
        var thumbnailCode = a.search;
        var validate = a.pathname;
        thumbnailCode = thumbnailCode.slice(3, thumbnailCode.length);
        var thumbnailUrl = "https://i.ytimg.com/vi/" + thumbnailCode + "/0.jpg"
        console.log(thumbnailUrl, validate);

        if (validate === "/watch"){
            $(".error").text("")
            $.ajax({
                type: "POST",
                url: "/button",
                data: {url: value},
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
            console.log("fuck" + validate);
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
