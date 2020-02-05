const fs = require("fs");
const code = require('./others/cityCode.json');
const cityNameChange = require('./changeName.js').cityNameChange;
const pro = code.province2Code;

// 格式化时间的[月]和[日]
(() => {
    let zeros = [0,0,0,0,0,0,0,0];

    let changeZeroLength = function(deta) {
        if (zeros.length < deta) {
            for (;deta > zeros.length;deta--) {
                zeros.push(0);
            }
        }
    };
    Number.prototype.toLength = function (len) {
        return (len + '').toLength(len);
    };
    String.prototype.toLength = function (len) {
        let n = this;
        if (n.length < len) {
            let deta = len - (n + '').length;
            changeZeroLength(deta);
            return zeros.slice(0,deta).join('') + n;
        } else {
            return n;
        }
    };
})();

let file = {};
fs.readdirSync('csvFile').filter(_ => _.endsWith(".csv")).forEach(_ => {
    file[_] = '2020-' + _.split('.')[0]
        .split('-')
        .map(_ => _.toLength(2)).join('-') + '.txt';
});

const more = {
    "中国": `11791	17988	243	259
14380	19544	328	304
17205	21558	475	361
20438	23214	632	425`.split(/[\r\n]/).map(_ => _.split('\t').filter(_ => _)),
    "香港": `13	0	0	0
14	0	0	0
15	0	0	0
15	0	0	0`.split(/[\r\n]/).map(_ => _.split('\t').filter(_ => _))
};

let ind = 0;
for (let i in file) {
    let out = [
        ["flag","area","confirmed","suspected","cured","dead"]
    ];
    let keys = [];
    more.中国[ind] ? out.push(["000000","中国",more.中国[ind][0],more.中国[ind][1],more.中国[ind][2],more.中国[ind][3]]) : false;
    more.香港[ind] ? out.push(["810000","香港特别行政区",more.香港[ind][0],more.香港[ind][1],more.香港[ind][2],more.香港[ind][3]]) : false;
    ind++;
    console.log(i);
    fs.readFileSync('csvFile\\' + i,'utf-8')
        .split(/[\r\n]/)
        .map(_ => _.split(','))
        .forEach((line,ind) => {
            if (!ind) {
                return;
            }
            if (line[0] in pro && !keys[line[0]]) {
                keys[line[0]] = pro[line[0]];
                out.push([
                    pro[line[0]],
                    line[0],
                    line[2],
                    line[3],
                    line[4],
                    line[5]
                ]);
            }
            if (line[1] && !keys[line[1]]) {
                keys[line[1]] = true;
                let cityCode = -1;
                for (let i in code.name2Code[keys[line[0]]]) {
                    if (i.indexOf(line[1])) {
                        cityCode = code.name2Code[keys[line[0]]][i];
                    }
                }
                if (!(cityCode + 1)) {
                    console.log(line.join('\t'));
                    return;
                }
                out.push([
                    cityCode,
                    cityCode + 1 ? code.code2Name[keys[line[0]]][cityCode] : line[1],
                    line[6],
                    line[7],
                    line[8],
                    line[9]
                ]);
            }
        });
    fs.writeFileSync(`../datas/${file[i]}`,out.map(_ => _.join(',')).join('\r\n'));
}



