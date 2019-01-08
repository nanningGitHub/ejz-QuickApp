var storage = require('@system.storage')
const PhotoGallery = {
    2: 'offline_practice.png',
    3: 'offline_in_school.png',
    5: 'offline_show.png',
    6: 'offline_ceremony.png',
    7: 'offline_model.png',
    8: 'offline_host.png',
    9: 'offline_security.png',
    11: 'offline_tutor.png',
    12: 'offline_assistant.png',
    14: 'offline_dispatch.png',
    15: 'offline_scan_code.png',
    16: 'offline_promotion.png',
    17: 'offline_sale.png',
    19: 'offline_waiter.png',
    20: 'offline_custom_service.png',
    21: 'offline_room_service.png',
    22: 'offline_express.png',
    24: 'offline_translate.png',
    25: 'offline_clerk.png',
    26: 'offline_plan.png',
    27: 'offline_editor.png',
    29: 'offline_technology.png',
    30: 'offline_product.png',
    31: 'offline_operate.png',
    32: 'offline_design.png',
    34: 'offline_volunteer.png',
    35: 'offline_casual.png',
    36: 'offline_accounting.png',
    37: 'offline_other.png'
}
export function imgLogo(jobClass) {
    return PhotoGallery[jobClass] || ''
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

export function formatTime(number, format) {

    var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    var returnArr = [];
    var date = new Date(number);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));
    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));
    for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
}

export function genderLimit(genderLimit) {
    return genderLimit === 1 ? "男" : genderLimit === 0 ? "女" : "不限"
}


export function letterSort(property) {
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        if (value1 < value2) {
            return -1;
        } else if (value1 < value2) {
            return 1;
        } else {
            return 0
        }
    }
}

export function companyLogo(url) {   //公司企业logo
    if (url) {
        return url
    } else {
        return 'img/head_icon.png'
    }
}

export function getUser() {   //获取用户信息
    storage.get({
        key: 'user',
        success: function (data) {
            if (data) {
                this.isLogin = true;
                this.user = JSON.parse(data).dataMap.user;
                this.token = JSON.parse(data).dataMap.token;
                console.log(data)
            } else {
                this.isLogin = false;
            }
        },
        fail: function (data, code) {
            console.log(data)
        }
    })
}