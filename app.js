const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");


const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});



app.post("/button", function(req,res){

    let url = req.body.url;
    var urlCode = req.body.urlCode;
    // const regex = new RegExp('=(.+)$')

    const response = axios.post(
        'https://yt1s.com/api/ajaxSearch/index',
        new URLSearchParams({
            'q': url,
            'vt': 'home'
        }),
        {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.76',
            }
        }
    );
      
    response.then(function (rsp) {
        // console.log(.links);
        let duration = rsp.data.t;
        const response = axios.post(
            'https://yt1s.com/api/ajaxConvert/convert',
            new URLSearchParams({
                'vid': urlCode,
                'k': rsp.data.links.mp3.mp3128['k']
            }),
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.76',
                }
            }
        )
        response.then(function (rsp) {
          var apiDetails = {
            mp3Url: rsp.data.dlink,
            durationTime: duration,
            videoTitle: rsp.data.title
          };
            res.send(apiDetails);
            

        })
        
    })
    
});


app.listen(process.env.PORT || 3000, function(){
    console.log("Server Started Successfully");
});