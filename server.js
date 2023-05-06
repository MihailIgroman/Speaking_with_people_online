const http = require("http");
const fs = require('fs');
const path = require('path');

const pathToIndex = path.join(__dirname, 'static', 'index.html');
const indexHTMLFile = fs.readFileSync(pathToIndex);
const pathToStyle = path.join(__dirname, 'static', 'style.css');
const styleStyleFile = fs.readFileSync(pathToStyle);
const pathToScript = path.join(__dirname, 'static', 'script.js');
const scriptScriptFile = fs.readFileSync(pathToScript);

const server = http.createServer((req,res) => {
    switch(req.url){
        case'/':return res.end(indexHTMLFile);
        case'/script.js':return res.end(scriptScriptFile);
        case'/style.css':return res.end(styleStyleFile);
    }
    res.statusCode == 404;
    return res.end("Error 404");
});

server.listen(3000);