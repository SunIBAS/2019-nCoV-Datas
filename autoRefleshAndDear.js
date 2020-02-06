const http = require('http');
const fs = require("fs");
const _json = require('./source/_forAuto/_json');
const _dcsv = require('./source/_forAuto/_dearCsv');
const _djson = require('./source/_forAuto/_dearJson');

// 不重复下载也不重复处理
const norepeat = true;
const url = {
    info : "http://www.sunibas.cn/ill/info",
    down: "http://www.sunibas.cn/ill/down?filename="
};

const downDir = {
    csv: 'source\\csvFile\\',
    json: 'source\\jsonFile\\'
};
const myFetch = (url) => {
    return new Promise(function (succ,fail) {
        http.get(url,(resp) => {
            let data = '';
            resp.on('data',(chunk) => data += chunk);
            resp.on('end',() => {
                succ(data);
            });
            resp.on("error",err => {
                fail(err);
            });
        });
    });
};
function toDownFile(fileName,type,cb) {
    myFetch(url.down + fileName)
        .then(data => {
            fs.writeFileSync(downDir[type] + fileName,data,'utf-8');
        }).then(cb);
}

const toUpdateFile = () => {
    let allTask = (function () {
        let task = 0;
        return {
            add() {
                task++;
            },
            cut() {
                task--;
            },
            check(cb) {
                let id = setInterval(() => {
                    if (task) {
                    } else {
                        clearInterval(id);
                        cb();
                    }
                },200);
            }
        };
    })();
    myFetch(url.info)
        .then(JSON.parse)
        .then(data => {
            let toDown = true;
            for (let i in data.csv) {
                toDown = true;
                if (norepeat && fs.existsSync(downDir.csv + data.csv[i])) {
                    toDown = false;
                }
                if (toDown) {
                    allTask.add();
                    toDownFile.bind(null,data.csv[i])('csv',allTask.cut.bind(allTask));
                }
            }
            for (let i in data.json) {
                toDown = true;
                if (norepeat && fs.existsSync(downDir.json + data.json[i])) {
                    toDown = false;
                }
                if (toDown) {
                    allTask.add();
                    toDownFile.bind(null,data.json[i])('json',allTask.cut.bind(allTask));
                }
            }
            allTask.check(dearFiles);
        });
};

const basePath = process.cwd();

const dearFiles = () => {
    _djson(basePath,norepeat,function () {
        _json(basePath,norepeat,function () {
            console.log("完成");
        });
    })
};

toUpdateFile();