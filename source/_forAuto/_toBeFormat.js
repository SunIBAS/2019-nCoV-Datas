// 目的是让每个文件都有省的信息
const fs = require("fs");
const pro = require('./../others/cityCode.json').code2Province;
function toBeFormat(basePath,cb) {
    const dir = basePath + "/datas";
    cb = cb || (() => {});
    fs.readdirSync(dir)
        .filter(_ => _.endsWith(".txt"))
        .forEach(file => {
            let json = [];
            let curLine = [];
            let curSub = "";
            let toKeep = false;
            fs.readFileSync(dir + "/" + file,'utf-8')
                .split(/[\r\n]/)
                .map(_ => _.split(','))
                .filter(_ => _.length > 1)
                .forEach((line,ind) => {
                    if (!ind) {
                        json.push(line);
                    } else {
                        if (line[0] === '-1' || line[0] === "999999") {
                            line[0] = '-1';
                            json.push(line);
                        } else if (line[0].substring(2) === "0000") {
                            curSub = line[0].substring(0,2);
                            if (toKeep) {
                                json.push(curLine);
                            }
                            json.push(line);
                            toKeep = false;
                        } else {
                            if (line[0].substring(0,2) === curSub) {
                                json.push(line);
                                if (toKeep) {
                                    curLine[2] += parseInt(line[2]);
                                    curLine[2] += parseInt(line[3]);
                                    curLine[2] += parseInt(line[4]);
                                    curLine[2] += parseInt(line[5]);
                                }
                            } else {
                                if (toKeep) {
                                    json.push(curLine);
                                }
                                toKeep = true;
                                json.push(line);
                                curLine[0] = line[0].substring(0,2) + "0000";
                                curLine[1] = pro[curLine[0]];
                                curLine[2] = parseInt(line[2]);
                                curLine[2] = parseInt(line[3]);
                                curLine[2] = parseInt(line[4]);
                                curLine[2] = parseInt(line[5]);
                                curSub = line[0].substring(0,2);
                            }
                        }
                    }
                });
            json.sort((a,b) => parseInt(a) - parseInt(b));
            fs.writeFileSync(basePath + '/datas/' + file,
                json.map(_=>_.join(',')).join('\r\n'),'utf-8');
        });
    cb();
}

module.exports = toBeFormat;
