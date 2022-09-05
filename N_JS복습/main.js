var http = require('http');
var url = require('url');
var fs = require('fs');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url,true).query;
    var pathname = url.parse(_url,true).pathname;
    var title = queryData.id;
    
    if(pathname == '/'){
        fs.readFile(`data/${queryData.id}`,'utf-8',function(err,description){
            var template = `
                <!doctype html>
                <html>
                <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
                </head>
                <body>
                <h1><a href="/">WEB</a></h1>
                <ol>
                    <li><a href="?id=HTML">HTML</a></li>
                    <li><a href="?id=CSS">CSS</a></li>
                    <li><a href="?id=Javascript">JavaScript</a></li>
                </ol>
                <h2>${title}</h2>
                ${description}
                </body>
                </html>
            `
            response.writeHead(200);
            response.end(template);
        });
    } else {
        response.writeHead(404);
        response.end('Not Found');
    }

    
});
app.listen(3000);