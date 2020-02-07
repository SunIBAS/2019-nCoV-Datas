const fs = require('fs');
const spawn = eval('require')('child_process').spawn;
let allWant = {
    "中国": "000000",
    "湖南":"430000",
    "武汉":"420100",
    "北京":"110000",
    "上海":"310000",
    "香港":"810000",
    "澳门":"820000",
    "郑州":"410100",
    "长春":"220100",
    "西安":"610100",
    "成都":"510100",
    "广州":"440100",
    "温州":"330300",
    "深圳":"440300",
    "珠海":"440400",
    "佛山":"440600",
    "惠州":"441300",
    "东莞":"441900",
    "中山":"442000",
    "江门":"440700",
    "肇庆":"441200",
    "南京":"320100",
    "无锡":"320200",
    "常州":"320400",
    "苏州":"320500",
    "南通":"320600",
    "扬州":"321000",
    "镇江":"321100",
    "盐城":"320900",
    "泰州":"321200",
    "杭州":"330100",
    "宁波":"330200",
    "温州":"330300",
    "湖州":"330500",
    "嘉兴":"330400",
    "绍兴":"330600",
    "金华":"330700",
    "舟山":"330900",
    "台州":"331000",
    "合肥":"340100",
    "芜湖":"340221",
    "马鞍山":"340500",
    "铜陵":"340700",
    "安庆":"340800",
    "滁州":"341100",
    "池州":"341700",
    "宣城":"341800",
};
const basePath = (() => {
    const b = "2019-nCoV-Datas";
    const p = process.cwd();
    return p.substring(0,p.indexOf(b) + b.length);
})();

let code = require(basePath + '/source/others/cityCode.json');

let out = [];
let tmp = ["时间"];
for (let i in allWant) {
    let name = code.code2All[allWant[i]];
    name = name || "中国";
    tmp.push(`${name}确诊`);
    tmp.push(`${name}疑似`);
    tmp.push(`${name}治愈`);
    tmp.push(`${name}死亡`);
    tmp.push(`${name}死亡率`);
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
                tmp.push(content[allWant[i]][2]);
                tmp.push(content[allWant[i]][3]);
                tmp.push(content[allWant[i]][4]);
                tmp.push(content[allWant[i]][5]);
                let rat = content[allWant[i]][5] / content[allWant[i]][2];
                tmp.push((rat + '').substring(0,5));
            } else {
                if (file === "2020-02-01.json") {
                    console.log(`${i}\t${allWant[i]}`);
                }
                tmp.push('-');
                tmp.push('-');
                tmp.push('-');
                tmp.push('-');
                tmp.push('-');
            }
        }
        out.push(tmp);
    });
fs.writeFileSync(`${d.getYear() + 1900}-${d.getMonth() + 1}-${d.getDate()}.csv`,out.map(_ => _.join(',')).join('\r\n'),'utf-8');

let fn = function(filename) {
    spawn(`converter.exe ${filename}`, {
        shell: true,
    });
};
fs.readdirSync(basePath + '/Iwant')
    .filter(_ => _.endsWith('.csv'))
    .forEach(_ => fn(basePath + '/Iwant/' + _));