const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000;
const server = http.createServer();
const basePath = (() => {
    const b = "2019-nCoV-Datas";
    const p = process.cwd();
    return p.substring(0,p.indexOf(b) + b.length) + '/officalData/';
})();
let mime={
    '.js':'application/javascript',
    '.css':'text/css',
    '.txt':'text/txt',
    '.html': 'text/html;charset=utf-8'
};
const resFile = (res,file) => {
    res.setHeader('Content-Type',mime[file.match(/\.\w+$/)[0]] +';charset=utf-8');
    fs.createReadStream(file).pipe(res);
};

server.on('request',function (req,res) {
    if (req.url === '/') {
        resFile(res,path.join(basePath,"SHOW.html"));
    } else {
        let file = decodeURI(req.url);
        if (fs.existsSync(path.join(basePath,file))) {
            resFile(res,path.join(basePath,file));
        } else {
            res.end(`${path.join(basePath,file)} is not exist`);
        }
    }
});


server.listen(port,function () {
    console.log('server run in port : ' + port);
});