var storage = require('@system.storage')
export function imgLogo(jobClass) {
    switch (jobClass) {
        case 2:
            return "offline_practice.png";
            break;
        case 3:
            return "offline_in_school.png";
            break;
        case 5:
            return "offline_show.png";
            break;
        case 6:
            return "offline_ceremony.png";
            break;
        case 7:
            return "offline_model.png";
            break;
        case 8:
            return "offline_host.png";
            break;
        case 9:
            return "offline_security.png";
            break;
        case 11:
            return "offline_tutor.png";
            break;
        case 12:
            return "offline_assistant.png";
            break;
        case 14:
            return "offline_dispatch.png";
            break;
        case 15:
            return "offline_scan_code.png";
            break;
        case 16:
            return "offline_promotion.png";
            break;
        case 17:
            return "offline_sale.png";
            break;
        case 19:
            return "offline_waiter.png";
            break;
        case 20:
            return "offline_custom_service.png";
            break;
        case 21:
            return "offline_room_service.png";
            break;
        case 22:
            return "offline_express.png";
            break;
        case 24:
            return "offline_translate.png";
            break;
        case 25:
            return "offline_clerk.png";
            break;
        case 26:
            return "offline_plan.png";
            break;
        case 27:
            return "offline_editor.png";
            break;
        case 29:
            return "offline_technology.png";
            break;
        case 30:
            return "offline_product.png";
            break;
        case 31:
            return "offline_operate.png";
            break;
        case 32:
            return "offline_design.png";
            break;
        case 34:
            return "offline_volunteer.png";
            break;
        case 35:
            return "offline_casual.png";
            break;
        case 36:
            return "offline_accounting.png";
            break;
        case 37:
            return "offline_other.png";
            break;
    }
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
    return genderLimit == 1 ? "男" : genderLimit == 0 ? "女" : "不限"
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