const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");


const app = express();

// app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

// var userUrl = "";

// var mp3 = "";
// // var thumbnail = "";
// var duration = "";
// var title = "";

app.post("/button", function(req,res){
    // var userUrl = req.body.url;
    
    let url = req.body.url;
    const regex = new RegExp('=(.+)$')

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
                'vid': regex.exec(url)[1],
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
            // thumbnailUrl: thumbnail,
            durationTime: duration,
            videoTitle: rsp.data.title
          };
            res.send(apiDetails);
            console.log(apiDetails);
            

        })
        
    })
    
});

// const options = {
//     method: 'GET',
//     url: 'https://t-one-youtube-converter.p.rapidapi.com/api/v1/createProcess',
//     params: {
//       url: userUrl,
//       format: 'mp3',
//       responseFormat: 'json',
//       lang: 'en'
//     },
//     headers: {
//       'X-RapidAPI-Key': '3bb4058cccmsh4c39876ee145b04p124dcajsn6698ba300f28',
//       'X-RapidAPI-Host': 't-one-youtube-converter.p.rapidapi.com'
//     }
//   };
  
//   axios.request(options).then(function (response) {
//         mp3 = response.data.YoutubeAPI.urlMp3;
//         thumbnail = response.data.YoutubeAPI.thumbUrl;
//         duration = response.data.YoutubeAPI.durata_video;
//         title = response.data.YoutubeAPI.titolo;
//   }).catch(function (error) {
//         console.error(error);
//   });

app.listen(3000, function(){
    console.log("Server Started on Successfully");
});