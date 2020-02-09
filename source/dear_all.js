const fs = require('fs');
const codes = require('./others/cityCode.json');
const cityNameChange = require('./changeName.js').cityNameChange;

let data = {};
fs.readFileSync("all.txt","utf-8")
    .split(/[\r\n]/).map(_ => _.split(','))
    .filter(_ => _[1] === "中国")
    .forEach(_ => {
        if (_[0] in data) {} else {
            data[_[0]] = [];
        }
        data[_[0]].push(_);
    });

let out = [];
for (let i in data) {
    out = [
        ["flag","area","confirmed","suspected","cured","dead"]
    ];
    data[i].forEach(d => {
        if (d[5]) {
            let name = codes.code2Name[d[4]][d[6]];
            if (!name) {
                // 注意他的东宁市 宁夏的，但是cityCode中的东宁市是黑龙江的
                switch (d[5]) {
                    case "第七师":
                        d[6] = 654003;
                        name = codes.code2Name[d[4]][d[6]];
                        break;
                    case "第八师石河子市":
                        d[6] = 659001;
                        name = codes.code2Name[d[4]][d[6]];
                        break;
                    case "兴安盟乌兰浩特":
                        d[6] = 152200;
                        name = codes.code2Name[d[4]][d[6]];
                        break;
                    case "长垣市":
                        d[6] = 410728;
                        name = codes.code2Name[d[4]][d[6]];
                        break;
                    default:
                        console.log(d.join('\t'));
                }
            }
            out.push([
                d[6] || "-1",name || d[5],
                d[7],d[8],d[9],d[10]
            ]);
        } else if (d[3]) {
            out.push([
                d[4],d[3],
                d[7],d[8],d[9],d[10]
            ]);
        } else {
            out.push([
                "000000",d[1],
                d[7],d[8],d[9],d[10]
            ]);
        }
    });
    if (i === '2020-01-20') {
        `420100,武汉市,258,0,27,3
421100,黄冈市,12,0,0,0`.split(/[\r\n]/).filter(_ => _)
            .forEach(line => {
                let o = [];
                line.split(',').forEach(_ => o.push(_));
                out.push(o);
            });
    } else if (i === "2020-01-21") {
        `420100,武汉市,343,0,27,3
421100,黄冈市,12,0,0,0`.split(/[\r\n]/).filter(_ => _)
            .forEach(line => {
                let o = [];
                line.split(',').forEach(_ => o.push(_));
                out.push(o);
            });
    } else if (i === "2020-01-22") {
        `420100,武汉市,405,0,27,11
421100,黄冈市,12,0,0,0
420800,荆门市,1,0,0,0
421000,荆州市,6,0,0,0`.split(/[\r\n]/).filter(_ => _)
            .forEach(line => {
                let o = [];
                line.split(',').forEach(_ => o.push(_));
                out.push(o);
            });
    }
    out.sort((a,b) => parseInt(a) - parseInt(b));
    fs.writeFileSync(`../datas/${i}.txt`,out.filter(_ => _.length > 2).map(_ => {
        if (!_.join) {
            return '';
        }
        return _.join(',');
    }).join('\r\n'));
}

