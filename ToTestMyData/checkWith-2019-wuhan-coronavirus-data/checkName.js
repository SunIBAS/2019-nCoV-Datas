const fs = require('fs');
const nd = require('./../../test/sources/20200210');
const code = require('./../../source/others/cityCode.json');

nd.forEach(d => {
    let provinceCode = code.province2Code[d.provinceName];
    if (provinceCode) {
        let cityCode = code.name2Code[provinceCode];
        d.cities.forEach(city => {
            let get = false;
            for (let i in cityCode) {
                if (i.indexOf(city.cityName) !== -1) {
                    get = true;
                    break;
                }
            }
            if (!get) {
                console.log(`${city.cityName} unknowed`);
            }
        })
    }
});