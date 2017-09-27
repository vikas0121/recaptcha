const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.post('/subscribe', (req, res) => {
    if(req.body.captcha === undefined || req.body.captcha === null ||
    req.body.captcha === ''){
        return res.json({"success":false, "msg":"please select captcha"});
    }
    const key ='6LeOLDIUAAAAAERmUKr5Gqegph3fDBUAs5ijSTr_';
    const url = `https://google.com/recaptcha/api/siteverify?secret=${key}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;
    //console.log(url);

    request(url, (err, response, body) => {
        body = JSON.parse(body);
        console.log(body);

        if(!body.success){
            return res.json({"success":false, "msg":"failed captcha verification"});
        }

        return res.json({"success":true, "msg":" captcha passed"});
    });
});

app.listen(3000, () => {
    console.log('server started....');
});