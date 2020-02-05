function cityNameChange(name) {
    let nameChange = {
        "东城区": "东城区",
        "丰台区": "丰台区",
        "大兴区": "大兴区",
        "密云区": "密云区",
        "平谷区": "平谷区",
        "延庆区": "延庆区",
        "怀柔区": "怀柔区",
        "房山区": "房山区",
        "昌平区": "昌平区",
        "朝阳区": "朝阳区",
        "海淀区": "海淀区",
        "石景山区": "石景山区",
        "西城区": "西城区",
        "通州区": "通州区",
        "门头沟区": "门头沟区",
        "顺义区": "顺义区",
        "临夏州": "临夏回族自治州",
        "甘南州": "甘南藏族自治州",
        "东沙群岛": "东沙群岛",
        "黔西南州": "黔西南布依族苗族自治州",
        "黔东南州": "黔东南苗族侗族自治州",
        "黔南州": "黔南布依族苗族自治州",
        "乐东县": "乐东黎族自治县",
        "保亭县":"保亭黎族苗族自治县",
        "昌江县":"昌江黎族自治县",
        "琼中县":"琼中黎族苗族自治县",
        "白沙县":"白沙黎族自治县",
        "陵水县":"陵水黎族自治县",
        "大兴安岭":"大兴安岭地区",
        "恩施": "恩施土家族苗族自治州",
        "神农架林区":"神农架林区",
        "湘西自治州":"湘西土家族苗族自治州",
        "延边州": "延边朝鲜族自治州",
        "兴安盟": "兴安盟",
        "锡林郭勒盟":"锡林郭勒盟",
        "阿拉善盟":"阿拉善盟",
        "果洛州": "果洛藏族自治州",
        "海北州": "海北藏族自治州",
        "海南州": "海南藏族自治州",
        "海西州": "海西蒙古族藏族自治州",
        "玉树州": "玉树藏族自治州",
        "黄南州": "黄南藏族自治州",
        "凉山州": "凉山彝族自治州",
        "甘孜州":"甘孜藏族自治州",
        "阿坝州":"阿坝藏族羌族自治州",
        "伊犁州": "伊犁哈萨克自治州",
        "克孜勒苏柯尔克孜自治州": "克孜勒苏柯尔克孜自治州",
        "和田地区": "和田地区",
        "喀什地区": "喀什地区",
        "塔城地区": "塔城地区",
        "昌吉州": "昌吉回族自治州",
        "阿克苏地区": "阿克苏地区",
        "阿勒泰地区": "阿勒泰地区",
        "那曲地区": "那曲地区",
        "阿里地区": "阿里地区",
        "大理州": "大理白族自治州",
        "德宏州": "德宏傣族景颇族自治州",
        "怒江州": "怒江傈僳族自治州",
        "文山州": "文山壮族苗族自治州",
        "楚雄州": "楚雄彝族自治州",
        "红河州": "红河哈尼族彝族自治州",
        "西双版纳州": "西双版纳傣族自治州",
        "迪庆州": "迪庆藏族自治州",

        "巴音郭楞州": "巴音郭楞蒙古自治州",
        "博尔塔拉州": "博尔塔拉蒙古自治州",
    };

    if (name[name.length - 1] === "市") {
        return name;
    } else if (name[name.length - 1] === "区") {
        return name;
    } else {
        for (let i in nameChange) {
            if (nameChange[i].indexOf(name) + 1) {
                return nameChange[i];
            }
        }
        return name + '市';
    }
}
function provinceNameChange(name) {
    let changeList = {
        "香港": "香港特别行政区",
        "台湾":"台湾省",
        "澳门":"澳门特别行政区",
        "上海": "上海市",
        "云南": "云南省",
        "内蒙古": "内蒙古自治区",
        "宁夏": "宁夏回族自治区",
        "广西": "广西壮族自治区",
        "新疆": "新疆维吾尔自治区",
        "西藏": "西藏自治区",
        "重庆": "重庆市",
        "北京": "北京市",
        "天津": "天津市",
        "青海": "青海省",
        "贵州": "贵州省",
        "吉林": "吉林省",
        "甘肃": "甘肃省",
        "山西": "山西省",
        "辽宁": "辽宁省",
        "黑龙江": "黑龙江省",
        "海南": "海南省",
        "河北": "河北省",
        "陕西": "陕西省",
        "福建": "福建省",
        "江苏": "江苏省",
        "四川": "四川省",
        "山东": "山东省",
        "江西": "江西省",
        "安徽": "安徽省",
        "湖南": "湖南省",
        "河南": "河南省",
        "广东": "广东省",
        "浙江": "浙江省",
        "湖北": "湖北省"
    };
    if (name in changeList) {
        return changeList[name];
    } else {
        return name;
    }
}

module.exports = {
    cityNameChange,
    provinceNameChange
};