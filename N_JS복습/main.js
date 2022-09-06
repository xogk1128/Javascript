var http = require('http');
var url = require('url');
var fs = require('fs');

function templateHTML(title, list, body){
    return `
        <!doctype html>
            <html>
            <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
            </head>
            <body>
                <h1><a href="/">WEB</a></h1>
                <ol>
                    ${list}
                </ol>
                ${body}
            </body>
        </html>
    `
}

function templateList(filelist){
    var i=0;
    var list ='';
    while(filelist.length > i){
        list += `<li><a href="?id=${filelist[i]}">${filelist[i]}</a></li>`;
        i++;
    }
    return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url,true).query;
    var pathname = url.parse(_url,true).pathname;
    

    if(pathname == '/'){
        if(queryData.id === undefined){
            fs.readdir('./data','utf-8',function(err, filelist){
                var title = 'Welcome';
                var description = 'Hello NodeJS...';
                var list = templateList(filelist);
                var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);

                response.writeHead(200);
                response.end(template);
            });
        } else {
            fs.readdir(`./data`,'utf-8',function(err2, filelist){
                fs.readFile(`data/${queryData.id}`,'utf-8',function(err, description){
                    var title = queryData.id;
                    var list = templateList(filelist);
                    var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);

                    response.writeHead(200);
                    response.end(template);
                });
            });
        }
    } else {
        response.writeHead(404);
        response.end('Not Found');
    }

    
});
app.listen(3000);