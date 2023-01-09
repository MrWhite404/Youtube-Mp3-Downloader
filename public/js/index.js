

function onFormSubmit() {
    event.preventDefault();
};

$("#js").slideUp();
    $("#spin").addClass("js-hide");

    $("#btn").click(function(){
        let value = $("#value-name").val();
      
        $.ajax({
            type: "POST",
            url: "/",
            data: {url: value},
            success: function(res){
                console.log(res);
            }
        });


        if ($("#spin").attr("class") === "hide-spin" || $("#spin").attr("js") === "js-hide" ){
            console.log("Already Aplied");
        } else {
            $("#spin").removeClass("js-hide");
            $("#spin").addClass("spinner");
        
            setInterval(function(){
                $("#spin").removeClass("js-hide");
                $('#js').slideDown();
            },2000);
        
            setTimeout(function(){
                $("#spin").removeClass("spinner");
            }, 2000);  
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
