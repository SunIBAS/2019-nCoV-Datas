const fs = require('fs');
const spawn = eval('require')('child_process').spawn;
let allWant = require('./iwant.json');
const basePath = (() => {
    const b = "2019-nCoV-Datas";
    const p = process.cwd();
    return p.substring(0,p.indexOf(b) + b.length);
})();
const pointLength = 3; // 保留小数点几位
const toPersent = true; // 转成百分比
const labels = {
    "确诊"(d) { return d[2] || 0; },
    "疑似"(d) { return d[3] || 0; },
    "治愈"(d) { return d[4] || 0; },
    "死亡"(d) { return d[5] || 0; },
    "死亡率"(d) { return (d[2] || 0) ? ((d[5] || 0) / d[2]  * (toPersent ? 100 : 1)).toFixed(pointLength - (toPersent ? 2 : 0)) : 0 ; },
};
const outLabel = ["确诊"]; //, "死亡率", '死亡', '疑似'];
let code = require(basePath + '/source/others/cityCode.json');

let out = [];
let tmp = ["时间"];
for (let i in allWant) {
    let name = code.code2All[allWant[i]];
    name = name || "中国";
    outLabel.forEach(_ => {
        tmp.push(`${name}-${_}`);
    });
}
out.push(tmp);
let d = new Date();
fs.readdirSync(basePath + "/data_json")
    .filter(_ => _.endsWith('.json'))
    .sort((a,b) => parseInt(a.replace(/[-.json]+/g,'0')) - parseInt(b.replace(/[-.json]+/g,'0')))
    .forEach(file => {
        let content = require(basePath + "/data_json/" + file);
        tmp = [file.split('.json')[0]];
        for (let i in allWant) {
            if (allWant[i] in content) {
                outLabel.forEach(label => {
                    tmp.push(labels[label](content[allWant[i]]));
                });
            } else {
                if (file === "2020-02-01.json") {
                    console.log(`${i}\t${allWant[i]}`);
                }
                outLabel.forEach(() => tmp.push('-'));
            }
        }
        out.push(tmp);
    });
const outFileName = basePath + `\\Iwant\\${d.getYear() + 1900}-${d.getMonth() + 1}-${d.getDate()}.csv`;
fs.writeFileSync(outFileName,out.map(_ => _.join(',')).join('\r\n'),'utf-8');
console.log("write out");
let fn = function(filename) {
    console.log("dear" + filename);
    spawn(`${basePath}\\converter.exe "${filename}"`, {
        shell: true,
    });
};
fn(outFileName);