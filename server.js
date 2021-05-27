const http = require('http');
const fs = require('fs');
const weatherAPIkey='6c3a0a96557c133d4460601a74b481c6';
const port = 3000;
var express = require('express');
var axios = require('axios');
var path = require('path');
var app=express();
app.use(express.static(path.join(__dirname,'/')));
app.use(express.json());
app.get('/',function(req,res){
    req.sendFile('index.html');
});
app.post('/weather',(req,res)=>{
    if(req.body.city!=""){
        var url=`https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&appid=${weatherAPIkey}&units=metric`;
    }
    else{
        var url=`https://api.openweathermap.org/data/2.5/weather?q=Klaipeda&appid=${weatherAPIkey}&units=metric`;;
        console.log("Klaipėda")
    }
    console.log(req.body.city);
    axios({
        url:url,
        responseType:'json'
    }).then(data=>res.json(data.data.main))
})
app.listen(port,function(error){
    if(error){
        console.log("error "+error);
    }
    else{
        console.log("server is listening on port "+port);
    }
})
