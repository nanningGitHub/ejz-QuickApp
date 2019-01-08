(function(){
  
  var createPageHandler = function() {
    return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 42);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var fetch = $app_require$('@app-module/system.fetch');
var storage = $app_require$('@app-module/system.storage');

var API_ROOT = 'http://openapi.ejzhi.com/';
// var API_ROOT = 'http://localtestapi.ejzhi.com/'
var headers = {};

// function getAuth(next) {
//   storage.get({
//     key: 'auth',
//     success: function(data) {
//       headers.Cookie = data
//       next(true)
//     },
//     fail: function(data, code) {
//       next(false)
//     }
//   })
// }

function getAuth() {
    return new Promise(function (resolve, reject) {
        storage.get({
            key: 'auth',
            success: function success(data) {
                headers.Cookie = data;
                resolve(true);
            },
            fail: function fail(data, code) {
                resolve(false);
            }
        });
    });
}

function realFetch(url) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'get';

    console.log('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('┃ url: ', API_ROOT + url);
    console.log('┃ method: ', method);
    console.log('┃ data: ', JSON.stringify(data));
    console.log('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    return new Promise(function (resolve, reject) {
        fetch.fetch({
            url: API_ROOT + url,
            data: data,
            header: headers,
            method: method,
            success: function success(data) {
                resolve(data);
            },
            fail: function fail(data, code) {
                reject(data);
            }
        });
    });
}

function withAuth(url) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'get';
    var canSkip = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    return getAuth().then(function (auth) {
        if (auth || canSkip) {
            return realFetch(url, data, method);
        } else {
            return new Promise(function (resolve, reject) {
                reject('请先登录！');
            });
        }
    });
}

function post(url) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (config.withAuth) {
        return withAuth(url, data, 'post', config.canSkip);
    } else {
        return realFetch(url, data, 'post');
    }
}

function get(url) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (config.withAuth) {
        return withAuth(url, data, 'get', config.canSkip);
    } else {
        return realFetch(url, data, 'get');
    }
}

exports.default = {

    //登录    
    login: function login(params) {
        return get('api/user/login.do', params);
    },


    // 注册获取验证码
    getCode: function getCode(params) {
        return get('api/user/sendRegisterSMS.do', params);
    },


    // 注册
    register: function register(params) {
        return get('api/user/register.do', params);
    },


    // 找回密码验证码
    backCode: function backCode(params) {
        return get('api/user/sendFindBackSMS.do', params);
    },


    // 忘记密码 
    forget: function forget(params) {
        return get('api/user/findPassword.do', params);
    },


    // 线下兼职筛选接口
    getJobList: function getJobList(params) {
        return get('api/job/offline/getList.do', params);
    },


    // 线下兼职详情
    getJobDetails: function getJobDetails(params) {
        return get('api/job/offline/getSingle.do', params);
    },


    //  查询用户是否投递过简历接口
    getisdeliver: function getisdeliver(params) {
        return get('api/job/offline/getisdeliver.do', params);
    },


    // 线下兼职详情 --进行投递接口
    deliver: function deliver(params) {
        return get('api/job/offline/deliverResume.do', params);
    },


    // 线下兼职企业信息
    getEnterprise: function getEnterprise(params) {
        return get('api/enterprise/getEnterprise.do', params);
    },


    // 搜索页面-> 猜你想要
    gethotWords: function gethotWords(params) {
        return get('api/job/offline/getHotWord.do', params);
    },


    // 城市页面-> 热门城市
    gethotCitys: function gethotCitys(params) {
        return get('api/city/getHotCity.do', params);
    },


    // 城市页面-> 所有城市
    getCitys: function getCitys(params) {
        return get('api/city/getCitysForGPS.do', params);
    },


    //   首页获取 定位城市名字   
    getCityName: function getCityName(params) {
        return post('god/map/getCityName.do', params);
    },


    // 我的页面 用户个人简历展示
    showUserResume: function showUserResume(params) {
        return get('api/user/showUserResume.do', params);
    },


    // 我的页面 -实时数据展示
    getData: function getData(params) {
        return get('api/user/getData.do', params);
    },


    // 我的投递 -全部
    getJobOfflineList: function getJobOfflineList(params) {
        return get('api/jobRequest/getJobOfflineList.do', params);
    },


    //我的投递 -待录用
    getDaiLuYongList: function getDaiLuYongList(params) {
        return get('api/jobRequest/getDaiLuYongList.do', params);
    },


    // 我的投递 - 取消投递
    deldeliverResume: function deldeliverResume(params) {
        return post('api/job/offline/deldeliverResume.do', params);
    },


    // 我的投递 ——待上岗
    getDaiShangGangList: function getDaiShangGangList(params) {
        return get('api/jobRequest/getDaiShangGangList.do', params);
    },


    // .我的-我的投递-待结算
    getDaiJieSuanList: function getDaiJieSuanList(params) {
        return get('api/jobRequest/getDaiJieSuanList.do', params);
    },


    // 我的-我的投递-已结算
    getYiJieSuanList: function getYiJieSuanList(params) {
        return get('api/jobRequest/getYiJieSuanList.do', params);
    },


    // 投递信息-投递详情
    getShangGangJiLu: function getShangGangJiLu(params) {
        return get('api/jobRequest/getShangGangJiLu.do', params);
    },


    // 编辑简历 -- 获取阿里上传token接口
    osstoken: function osstoken(params) {
        return get('ali/osstoken.do', params);
    },


    // 编辑简历 -- 获取职位值类型兼职列表接口
    getmainJobType: function getmainJobType(params) {
        return get('api/job/offline/mainJobType.do', params);
    },


    //编辑简历 -- 获取省级城市
    getProvince: function getProvince(params) {
        return get('api/city/getProvince.do', params);
    },


    // 编辑简历 --获取市级城市接口
    getChildrenCity: function getChildrenCity(params) {
        return get('api/city/getChildrenCity.do', params);
    },


    // 编辑简历 -- 获取区域城市接口
    getArea: function getArea(params) {
        return get('api/city/getArea.do', params);
    },


    // 编辑简历 -- app修改用户简历接口 
    editUserInfo: function editUserInfo(params) {
        return post('api/user/editUserInfo.do', params);
    },


    // 上传生活照后修改简历完善度(备:在上传生活照code值为0时调用)
    updateDegree: function updateDegree(params) {
        return post('api/user/updateDegree.do', params);
    },


    /**
     * 获取收藏文章列表
     */
    getCollectArticle: function getCollectArticle(page) {
        return get('lg/collect/list/' + page + '/json', null, {
            withAuth: true
        });
    },

    /**
     * 收藏站内文章
     */
    collectArticle: function collectArticle(id) {
        return post('lg/collect/' + id + '/json', null, {
            withAuth: true
        });
    },

    /**
     * 收藏站外文章
     */
    collectArticleAdd: function collectArticleAdd(params) {
        return post('lg/collect/add/json', params, {
            withAuth: true
        });
    },

    /**
     * 从文章列表取消收藏
     */
    uncollectArticle: function uncollectArticle(id) {
        return post('lg/uncollect_originId/' + id + '/json', null, {
            withAuth: true
        });
    },

    /**
     * 从收藏列表取消收藏
     */
    uncollect: function uncollect(id, originId) {
        return post('lg/uncollect/' + id + '/json', {
            originId: originId
        }, {
            withAuth: true
        });
    },

    /**
     * 获取收藏网站列表
     */
    getCollectWeb: function getCollectWeb() {
        return get('lg/collect/usertools/json', null, {
            withAuth: true
        });
    },

    /**
     * 收藏网站
     */
    collectWeb: function collectWeb(params) {
        return post('lg/collect/addtool/json', params, {
            withAuth: true
        });
    },

    /**
     * 编辑收藏的网址
     */
    editCollectWeb: function editCollectWeb(params) {
        return post('lg/collect/updatetool/json', params, {
            withAuth: true
        });
    },

    /**
     * 删除收藏的网址
     */
    deleteCollectWeb: function deleteCollectWeb(id) {
        return post('lg/collect/deletetool/json', {
            id: id
        }, {
            withAuth: true
        });
    }
};

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.imgLogo = imgLogo;
exports.formatTime = formatTime;
exports.genderLimit = genderLimit;
exports.letterSort = letterSort;
exports.companyLogo = companyLogo;
exports.getUser = getUser;
var storage = $app_require$('@app-module/system.storage');
var PhotoGallery = {
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
};
function imgLogo(jobClass) {
    return PhotoGallery[jobClass] || '';
}

function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
}

function formatTime(number, format) {

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

function genderLimit(genderLimit) {
    return genderLimit === 1 ? "男" : genderLimit === 0 ? "女" : "不限";
}

function letterSort(property) {
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        if (value1 < value2) {
            return -1;
        } else if (value1 < value2) {
            return 1;
        } else {
            return 0;
        }
    };
}

function companyLogo(url) {
    //公司企业logo
    if (url) {
        return url;
    } else {
        return 'img/head_icon.png';
    }
}

function getUser() {
    //获取用户信息
    storage.get({
        key: 'user',
        success: function success(data) {
            if (data) {
                this.isLogin = true;
                this.user = JSON.parse(data).dataMap.user;
                this.token = JSON.parse(data).dataMap.token;
                console.log(data);
            } else {
                this.isLogin = false;
            }
        },
        fail: function fail(data, code) {
            console.log(data);
        }
    });
}

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getJobDetails = getJobDetails;
exports.getEnterprise = getEnterprise;
exports.deliver = deliver;
exports.getisdeliver = getisdeliver;

var _api = __webpack_require__(0);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getJobDetails(JobOfflineId) {
    return _api2.default.getJobDetails({
        JobOfflineId: JobOfflineId
    }).then(function (response) {
        return Promise.resolve(JSON.parse(response.data));
    }).catch(function (err) {
        return Promise.reject(err);
    });
}

function getEnterprise(enterpriseId) {
    return _api2.default.getEnterprise({
        enterpriseId: enterpriseId
    }).then(function (response) {
        return Promise.resolve(JSON.parse(response.data));
    }).catch(function (err) {
        return Promise.reject(err);
    });
}

function deliver(token, jobOfflineId) {
    return _api2.default.deliver({
        token: token,
        jobOfflineId: jobOfflineId
    }).then(function (response) {
        return Promise.resolve(JSON.parse(response.data));
    }).catch(function (err) {
        return Promise.reject(err);
    });
}

function getisdeliver(token, jobOfflineId) {
    //查询用户是否投递了简历接口
    return _api2.default.getisdeliver({
        token: token,
        jobOfflineId: jobOfflineId
    }).then(function (response) {
        return Promise.resolve(JSON.parse(response.data));
    }).catch(function (err) {
        return Promise.reject(err);
    });
}

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

var $app_template$ = __webpack_require__(43)
var $app_style$ = __webpack_require__(44)
var $app_script$ = __webpack_require__(45)

$app_define$('@app-component/index', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})

$app_bootstrap$('@app-component/index',{ packagerVersion: '0.0.5'})


/***/ }),

/***/ 43:
/***/ (function(module, exports) {

module.exports = {
  "type": "div",
  "attr": {},
  "classList": [
    "page"
  ],
  "children": [
    {
      "type": "div",
      "attr": {},
      "classList": [
        "flex_page"
      ],
      "children": [
        {
          "type": "div",
          "attr": {},
          "classList": [
            "header"
          ],
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": [
                "job_item"
              ],
              "children": [
                {
                  "type": "image",
                  "attr": {
                    "src": function () {return '../Common/Component/Joblist/img/offline/' + (this.jobOffline.image)}
                  },
                  "classList": [
                    "job_item_icon"
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "job_itme_box"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return this.jobOffline.title}
                      },
                      "classList": [
                        "job_item_name"
                      ]
                    },
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "job_item_box2"
                      ],
                      "children": [
                        {
                          "type": "div",
                          "attr": {},
                          "classList": [
                            "job_item_address"
                          ],
                          "children": [
                            {
                              "type": "image",
                              "attr": {
                                "src": "../Common/Component/Joblist/img/job_address_icon.png"
                              },
                              "classList": [
                                "job_item_address_icon"
                              ]
                            },
                            {
                              "type": "text",
                              "attr": {
                                "value": function () {return this.jobOffline.address}
                              },
                              "classList": [
                                "job_item_address_text"
                              ]
                            }
                          ]
                        },
                        {
                          "type": "div",
                          "attr": {},
                          "children": [
                            {
                              "type": "text",
                              "attr": {
                                "value": function () {return this.jobOffline.salaryStr}
                              },
                              "classList": [
                                "job_item_wage"
                              ]
                            },
                            {
                              "type": "text",
                              "attr": {
                                "value": function () {return 'RMB/' + (this.jobOffline.salaryUnitStr)}
                              },
                              "classList": [
                                "job_item_unit"
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "job_item_box3"
                      ],
                      "children": [
                        {
                          "type": "div",
                          "attr": {},
                          "classList": [
                            "job_item_time"
                          ],
                          "children": [
                            {
                              "type": "image",
                              "attr": {
                                "src": "../Common/Component/Joblist/img/job_time_icon.png"
                              },
                              "classList": [
                                "job_item_time_icon"
                              ]
                            },
                            {
                              "type": "text",
                              "attr": {
                                "value": function () {return (this.jobOffline.startDate) + '~' + (this.jobOffline.endDate)}
                              },
                              "classList": [
                                "job_item_time_text"
                              ]
                            }
                          ]
                        },
                        {
                          "type": "div",
                          "attr": {},
                          "classList": [
                            "position"
                          ],
                          "children": [
                            {
                              "type": "text",
                              "attr": {
                                "value": function () {return (this.jobOffline.jobTypeStr) + '-' + (this.jobOffline.settlementTypeStr) + '结'}
                              },
                              "classList": [
                                "position_text"
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "type": "text",
              "attr": {
                "value": function () {return this.enterprise.name}
              },
              "classList": [
                "companyname"
              ]
            }
          ]
        },
        {
          "type": "div",
          "attr": {},
          "classList": [
            "content"
          ],
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": [
                "record"
              ],
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "record_head"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "兼职轨迹"
                      },
                      "classList": [
                        "record_head_text"
                      ]
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "record_content"
                  ],
                  "children": [
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "record_icon_box"
                      ],
                      "children": [
                        {
                          "type": "image",
                          "attr": {
                            "src": "img/accomplish_icon.png"
                          },
                          "classList": [
                            "record_icon"
                          ]
                        },
                        {
                          "type": "div",
                          "attr": {},
                          "classList": [
                            "line"
                          ]
                        },
                        {
                          "type": "image",
                          "attr": {
                            "src": function () {return this.statusNum==2||this.statusNum==3||this.statusNum==4||this.statusNum==5?'img/accomplish_icon.png':this.statusNum==-1||this.statusNum==0?'img/cancel_icon.png':this.statusNum==1?'img/record_icon.png':'img/record_icon.png'}
                          },
                          "classList": [
                            "record_icon"
                          ]
                        },
                        {
                          "type": "div",
                          "attr": {},
                          "classList": [
                            "line"
                          ]
                        },
                        {
                          "type": "image",
                          "attr": {
                            "src": function () {return this.statusNum==-1||this.statusNum==0||this.statusNum==1||this.statusNum==2?'img/record_icon.png':this.statusNum==3||this.statusNum==4||this.statusNum==5?'img/accomplish_icon.png':'img/record_icon.png'}
                          },
                          "classList": [
                            "record_icon"
                          ]
                        },
                        {
                          "type": "div",
                          "attr": {},
                          "classList": [
                            "line"
                          ]
                        },
                        {
                          "type": "image",
                          "attr": {
                            "src": function () {return this.statusNum==5?'img/accomplish_icon.png':'img/record_icon.png'}
                          },
                          "classList": [
                            "record_icon"
                          ]
                        }
                      ]
                    },
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "record_text_box"
                      ],
                      "children": [
                        {
                          "type": "text",
                          "attr": {
                            "value": "待录用"
                          },
                          "classList": [
                            "record_text"
                          ]
                        },
                        {
                          "type": "text",
                          "attr": {
                            "value": function () {return this.statusNum==1||this.statusNum==2||this.statusNum==3||this.statusNum==4||this.statusNum==5?'待上岗':this.statusNum==-1?'已拒绝':this.statusNum==0?'已取消':''}
                          },
                          "classList": [
                            "record_text"
                          ]
                        },
                        {
                          "type": "text",
                          "attr": {
                            "value": function () {return this.statusNum==-1||this.statusNum==0||this.statusNum==1||this.statusNum==2||this.statusNum==5?'待结算':this.statusNum==3?'已上岗':this.statusNum==4?'待结算':''}
                          },
                          "classList": [
                            "record_text"
                          ]
                        },
                        {
                          "type": "text",
                          "attr": {
                            "value": "已结算"
                          },
                          "classList": [
                            "record_text"
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "line"
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "workflow"
                  ],
                  "children": [
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "workflow_box"
                      ],
                      "children": [
                        {
                          "type": "div",
                          "attr": {},
                          "classList": [
                            "step"
                          ],
                          "children": [
                            {
                              "type": "div",
                              "attr": {},
                              "classList": [
                                "step_time"
                              ],
                              "shown": function () {return this.isgetShangGangJiLu},
                              "children": [
                                {
                                  "type": "image",
                                  "attr": {
                                    "src": "img/dot_icon.png"
                                  },
                                  "classList": [
                                    "step_icon"
                                  ]
                                },
                                {
                                  "type": "text",
                                  "attr": {
                                    "value": "您有签到签退记录了"
                                  },
                                  "classList": [
                                    "step_time_text_top"
                                  ]
                                }
                              ]
                            },
                            {
                              "type": "div",
                              "attr": {},
                              "classList": [
                                "record_box"
                              ],
                              "children": [
                                {
                                  "type": "div",
                                  "attr": {},
                                  "classList": [
                                    "record_item"
                                  ],
                                  "repeat": function () {return this.getShangGangJiLu},
                                  "children": [
                                    {
                                      "type": "text",
                                      "attr": {
                                        "value": function () {return this.getShangGangJiLu}
                                      }
                                    },
                                    {
                                      "type": "text",
                                      "attr": {
                                        "value": function () {return '签到地址：' + (this.$item.clockinAddress)}
                                      },
                                      "classList": [
                                        "record_text"
                                      ]
                                    },
                                    {
                                      "type": "text",
                                      "attr": {
                                        "value": function () {return '签到时间：' + (this.$item.createdDate)}
                                      },
                                      "classList": [
                                        "record_text"
                                      ]
                                    },
                                    {
                                      "type": "text",
                                      "attr": {
                                        "value": function () {return '签退地址：' + (this.$item.clockoutAddress||'未签退')}
                                      },
                                      "classList": [
                                        "record_text"
                                      ]
                                    },
                                    {
                                      "type": "text",
                                      "attr": {
                                        "value": function () {return '签退时间：' + (this.$item.endDate||'未签退')}
                                      },
                                      "classList": [
                                        "record_text"
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        },
                        {
                          "type": "div",
                          "attr": {},
                          "classList": [
                            "step"
                          ],
                          "children": [
                            {
                              "type": "div",
                              "attr": {},
                              "classList": [
                                "step_time"
                              ],
                              "children": [
                                {
                                  "type": "image",
                                  "attr": {
                                    "src": "img/dot_icon.png"
                                  },
                                  "classList": [
                                    "step_icon"
                                  ]
                                },
                                {
                                  "type": "text",
                                  "attr": {
                                    "value": function () {return this.workFlow.step1?this.workFlow.step1.date:''}
                                  },
                                  "classList": [
                                    "step_time_text"
                                  ]
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "attr": {
                                "value": function () {return this.workFlow.step1?this.workFlow.step1.info:''}
                              },
                              "classList": [
                                "step_text"
                              ]
                            }
                          ]
                        },
                        {
                          "type": "div",
                          "attr": {},
                          "classList": [
                            "step"
                          ],
                          "shown": function () {return this.workFlow.step2},
                          "children": [
                            {
                              "type": "div",
                              "attr": {},
                              "classList": [
                                "step_time"
                              ],
                              "children": [
                                {
                                  "type": "image",
                                  "attr": {
                                    "src": "img/dot_icon.png"
                                  },
                                  "classList": [
                                    "step_icon"
                                  ]
                                },
                                {
                                  "type": "text",
                                  "attr": {
                                    "value": function () {return this.workFlow.step2?this.workFlow.step1.date:''}
                                  },
                                  "classList": [
                                    "step_time_text"
                                  ]
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "attr": {
                                "value": function () {return this.workFlow.step2?this.workFlow.step2.info:''}
                              },
                              "classList": [
                                "step_text"
                              ]
                            }
                          ]
                        },
                        {
                          "type": "div",
                          "attr": {},
                          "classList": [
                            "step"
                          ],
                          "shown": function () {return this.workFlow.step3},
                          "children": [
                            {
                              "type": "div",
                              "attr": {},
                              "classList": [
                                "step_time"
                              ],
                              "children": [
                                {
                                  "type": "image",
                                  "attr": {
                                    "src": "img/dot_icon.png"
                                  },
                                  "classList": [
                                    "step_icon"
                                  ]
                                },
                                {
                                  "type": "text",
                                  "attr": {
                                    "value": function () {return this.workFlow.step2?this.workFlow.step1.date:''}
                                  },
                                  "classList": [
                                    "step_time_text"
                                  ]
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "attr": {
                                "value": function () {return this.workFlow.step3?this.workFlow.step3.info:''}
                              },
                              "classList": [
                                "step_text"
                              ]
                            }
                          ]
                        },
                        {
                          "type": "div",
                          "attr": {},
                          "classList": [
                            "step"
                          ],
                          "shown": function () {return this.workFlow.step4},
                          "children": [
                            {
                              "type": "div",
                              "attr": {},
                              "classList": [
                                "step_time"
                              ],
                              "children": [
                                {
                                  "type": "image",
                                  "attr": {
                                    "src": "img/dot_icon.png"
                                  },
                                  "classList": [
                                    "step_icon"
                                  ]
                                },
                                {
                                  "type": "text",
                                  "attr": {
                                    "value": function () {return this.workFlow.step4?this.workFlow.step1.date:''}
                                  },
                                  "classList": [
                                    "step_time_text"
                                  ]
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "attr": {
                                "value": function () {return this.workFlow.step4?this.workFlow.step4.info:''}
                              },
                              "classList": [
                                "step_text"
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

/***/ }),

/***/ 44:
/***/ (function(module, exports) {

module.exports = {
  ".page .flex_page": {
    "width": "100%",
    "flexDirection": "column",
    "paddingTop": "16px",
    "paddingRight": "12px",
    "paddingBottom": "0px",
    "paddingLeft": "12px",
    "backgroundColor": "#f2f2f2",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "flex_page"
        }
      ]
    }
  },
  ".header": {
    "height": "230px",
    "borderRadius": "10px",
    "backgroundColor": "#ffffff",
    "flexDirection": "column",
    "marginBottom": "16px"
  },
  ".header .job_item": {
    "backgroundColor": "#ffffff",
    "height": "160px",
    "borderBottomColor": "#eeeeee",
    "borderBottomWidth": "1px",
    "justifyContent": "flex-start",
    "alignItems": "center",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "header"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item"
        }
      ]
    }
  },
  ".header .job_item .job_item_icon": {
    "width": "80px",
    "height": "80px",
    "marginLeft": "50px",
    "marginRight": "50px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "header"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item_icon"
        }
      ]
    }
  },
  ".header .job_item .job_itme_box": {
    "width": "520px",
    "height": "110px",
    "flexDirection": "column",
    "alignSelf": "center",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "header"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_itme_box"
        }
      ]
    }
  },
  ".header .job_item .job_itme_box .job_item_name": {
    "color": "#333333",
    "fontSize": "28px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "header"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_itme_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item_name"
        }
      ]
    }
  },
  ".header .job_item .job_itme_box .job_item_box2": {
    "justifyContent": "space-between",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "header"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_itme_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item_box2"
        }
      ]
    }
  },
  ".header .job_item .job_itme_box .job_item_box2 .job_item_address": {
    "justifyContent": "flex-start",
    "alignItems": "center",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "header"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_itme_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item_box2"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item_address"
        }
      ]
    }
  },
  ".header .job_item .job_itme_box .job_item_box2 .job_item_address .job_item_address_icon": {
    "width": "18px",
    "marginRight": "14px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "header"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_itme_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item_box2"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item_address"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item_address_icon"
        }
      ]
    }
  },
  ".header .job_item .job_itme_box .job_item_box2 .job_item_address .job_item_address_text": {
    "width": "200px",
    "lines": 1,
    "textOverflow": "ellipsis",
    "color": "#888888",
    "fontSize": "22px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "header"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_itme_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item_box2"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item_address"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item_address_text"
        }
      ]
    }
  },
  ".header .job_item .job_itme_box .job_item_box2 .job_item_wage": {
    "color": "#37d3cb",
    "fontSize": "40px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "header"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_itme_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item_box2"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item_wage"
        }
      ]
    }
  },
  ".header .job_item .job_itme_box .job_item_box2 .job_item_unit": {
    "marginLeft": "12px",
    "fontSize": "28px",
    "color": "#37d3cb",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "header"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_itme_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item_box2"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item_unit"
        }
      ]
    }
  },
  ".header .job_item .job_itme_box .job_item_box3": {
    "justifyContent": "space-between",
    "alignItems": "center",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "header"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_itme_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item_box3"
        }
      ]
    }
  },
  ".header .job_item .job_itme_box .job_item_box3 .job_item_time": {
    "justifyContent": "flex-start",
    "alignItems": "center",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "header"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_itme_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item_box3"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item_time"
        }
      ]
    }
  },
  ".header .job_item .job_itme_box .job_item_box3 .job_item_time .job_item_time_icon": {
    "width": "18px",
    "marginRight": "12px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "header"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_itme_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item_box3"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item_time"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item_time_icon"
        }
      ]
    }
  },
  ".header .job_item .job_itme_box .job_item_box3 .job_item_time .job_item_time_text": {
    "fontSize": "22px",
    "color": "#888888",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "header"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_itme_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item_box3"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item_time"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item_time_text"
        }
      ]
    }
  },
  ".header .job_item .job_itme_box .job_item_box3 .position": {
    "justifyContent": "flex-start",
    "alignItems": "center",
    "backgroundColor": "#eeeeee",
    "height": "32px",
    "borderRadius": "32px",
    "paddingTop": "0px",
    "paddingRight": "10px",
    "paddingBottom": "0px",
    "paddingLeft": "10px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "header"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_itme_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item_box3"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "position"
        }
      ]
    }
  },
  ".header .job_item .job_itme_box .job_item_box3 .position .position_text": {
    "color": "#888888",
    "fontSize": "20px",
    "backgroundColor": "rgba(0,0,0,0)",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "header"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_itme_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "job_item_box3"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "position"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "position_text"
        }
      ]
    }
  },
  ".header .companyname": {
    "paddingLeft": "44px",
    "fontSize": "26px",
    "color": "#333333",
    "height": "70px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "header"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "companyname"
        }
      ]
    }
  },
  ".content": {
    "borderRadius": "10px",
    "backgroundColor": "#ffffff",
    "flexDirection": "column"
  },
  ".content .record": {
    "flexDirection": "column",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record"
        }
      ]
    }
  },
  ".content .record .record_head": {
    "height": "80px",
    "paddingLeft": "44px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record_head"
        }
      ]
    }
  },
  ".content .record .record_head .record_head_text": {
    "fontSize": "28px",
    "color": "#333333",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record_head"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record_head_text"
        }
      ]
    }
  },
  ".content .record .record_content": {
    "height": "186px",
    "flexDirection": "column",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record_content"
        }
      ]
    }
  },
  ".content .record .record_content .record_icon_box": {
    "height": "90px",
    "justifyContent": "center",
    "alignItems": "center",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record_content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record_icon_box"
        }
      ]
    }
  },
  ".content .record .record_content .record_icon_box .record_icon": {
    "height": "50px",
    "width": "50px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record_content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record_icon_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record_icon"
        }
      ]
    }
  },
  ".content .record .record_content .record_icon_box .line": {
    "width": "98px",
    "height": "2px",
    "backgroundColor": "#e6e6e6",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record_content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record_icon_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "line"
        }
      ]
    }
  },
  ".content .record .record_content .record_text_box": {
    "marginTop": "10px",
    "justifyContent": "center",
    "alignItems": "center",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record_content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record_text_box"
        }
      ]
    }
  },
  ".content .record .record_content .record_text_box .record_text": {
    "marginTop": "0px",
    "marginRight": "32px",
    "marginBottom": "0px",
    "marginLeft": "32px",
    "fontSize": "28px",
    "color": "#333333",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record_content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record_text_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record_text"
        }
      ]
    }
  },
  ".content .record .line": {
    "height": "2px",
    "backgroundColor": "#e6e6e6",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "line"
        }
      ]
    }
  },
  ".content .record .workflow": {
    "flexDirection": "column",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "workflow"
        }
      ]
    }
  },
  ".content .record .workflow .workflow_box": {
    "flexDirection": "column",
    "paddingTop": "36px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "workflow"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "workflow_box"
        }
      ]
    }
  },
  ".content .record .workflow .workflow_box .step": {
    "flexDirection": "column",
    "marginBottom": "36px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "workflow"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "workflow_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "step"
        }
      ]
    }
  },
  ".content .record .workflow .workflow_box .step .record_box": {
    "flexDirection": "column",
    "paddingLeft": "86px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "workflow"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "workflow_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "step"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record_box"
        }
      ]
    }
  },
  ".content .record .workflow .workflow_box .step .record_box .record_item": {
    "marginTop": "16px",
    "flexDirection": "column",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "workflow"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "workflow_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "step"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record_item"
        }
      ]
    }
  },
  ".content .record .workflow .workflow_box .step .record_box .record_item .record_text": {
    "fontSize": "26px",
    "color": "#888888",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "workflow"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "workflow_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "step"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record_item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record_text"
        }
      ]
    }
  },
  ".content .record .workflow .workflow_box .step .step_time": {
    "justifyContent": "flex-start",
    "alignItems": "center",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "workflow"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "workflow_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "step"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "step_time"
        }
      ]
    }
  },
  ".content .record .workflow .workflow_box .step .step_time .step_icon": {
    "width": "26px",
    "height": "26px",
    "marginLeft": "42px",
    "marginRight": "18px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "workflow"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "workflow_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "step"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "step_time"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "step_icon"
        }
      ]
    }
  },
  ".content .record .workflow .workflow_box .step .step_time .step_time_text_top": {
    "fontSize": "28px",
    "color": "#37d3cb",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "workflow"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "workflow_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "step"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "step_time"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "step_time_text_top"
        }
      ]
    }
  },
  ".content .record .workflow .workflow_box .step .step_time .step_time_text": {
    "fontSize": "26px",
    "color": "#333333",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "workflow"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "workflow_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "step"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "step_time"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "step_time_text"
        }
      ]
    }
  },
  ".content .record .workflow .workflow_box .step .step_text": {
    "marginTop": "16px",
    "marginLeft": "86px",
    "fontSize": "26px",
    "color": "#333333",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "record"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "workflow"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "workflow_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "step"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "step_text"
        }
      ]
    }
  }
}

/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(module, exports, $app_require$){'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _JobDetails = __webpack_require__(3);

var _applyDetails = __webpack_require__(46);

var _utils = __webpack_require__(1);

exports.default = {
    data: {
        jobId: '',
        token: '',
        jobOffline: {},
        enterprise: {},
        isgetShangGangJiLu: false,
        getShangGangJiLu: [{
            clockinAddress: "中国北京市海淀区上地街道马连洼北路",
            clockoutAddress: "中国北京市海淀区上地街道马连洼北路",
            createdDate: 1481078682000,
            endDate: 1481078686000,
            enterpriseId: 1,
            id: 4,
            isClockin: 1,
            isClockout: 1,
            isConfirmClockinOk: 0,
            isConfirmClockoutOk: 0,
            jobId: 2,
            jobOfflineRequestId: 0,
            modifyDate: 1481078686000,
            startDate: 1481078682000,
            temObjectId: "5847779a79bc44d497e644eb",
            userId: 19
        }],
        statusNum: '',
        workFlow: {}
    },
    onReady: function onReady() {
        var that = this;
        this.$app.$def.storage.get({
            key: 'user',
            success: function success(data) {
                that.token = JSON.parse(data).dataMap.token;
                that.getShangGangJiLu();
            },
            fail: function fail(data, code) {
                console.log(data);
            }
        });
    },
    getShangGangJiLu: function getShangGangJiLu() {
        var _this = this;

        (0, _applyDetails.getShangGangJiLu)(this.token, this.jobId).then(function (data) {
            if (data.code !== 0) {
                _this.$app.$def.prompt.showToast({
                    message: data.msg
                });
            } else {
                console.log(data);
                var jobOffline = data.dataMap.jobOffline;
                var statusNum = data.dataMap.statusNum;
                var workFlow = data.dataMap.workFlow;
                jobOffline.image = (0, _utils.imgLogo)(jobOffline.jobSubtypeId);
                jobOffline.startDate = (0, _utils.formatTime)(jobOffline.startDate, 'Y.M.D');
                jobOffline.endDate = (0, _utils.formatTime)(jobOffline.endDate, 'Y.M.D');
                jobOffline.genderLimit = (0, _utils.genderLimit)(jobOffline.genderLimit);
                jobOffline.jobTypeStr = jobOffline.jobTypeStr.split(',')[0];
                _this.jobOffline = jobOffline;
                _this.statusNum = data.dataMap.statusNum;
                if (statusNum === 0 || statusNum === '-1') {
                    workFlow.step1.date = (0, _utils.formatTime)(workFlow.step1.date, 'Y-M-D h:m:s');
                    workFlow.step4.date = (0, _utils.formatTime)(workFlow.step4.date, 'Y-M-D h:m:s');
                } else if (statusNum === 2 || statusNum === 3 || statusNum === 4) {
                    workFlow.step1.date = (0, _utils.formatTime)(workFlow.step1.date, 'Y-M-D h:m:s');
                    workFlow.step2.date = (0, _utils.formatTime)(workFlow.step2.date, 'Y-M-D h:m:s');
                } else if (statusNum === 1) {
                    workFlow.step1.date = (0, _utils.formatTime)(workFlow.step1.date, 'Y-M-D h:m:s');
                } else {
                    workFlow.step1.date = (0, _utils.formatTime)(workFlow.step1.date, 'Y-M-D h:m:s');
                    workFlow.step2.date = (0, _utils.formatTime)(workFlow.step2.date, 'Y-M-D h:m:s');
                    workFlow.step3.date = (0, _utils.formatTime)(workFlow.step3.date, 'Y-M-D h:m:s');
                    workFlow.step4.date = (0, _utils.formatTime)(workFlow.step4.date, 'Y-M-D h:m:s');
                }
                console.log(data.dataMap.getShangGangJiLu);
                if (data.dataMap.getShangGangJiLu) {
                    _this.isgetShangGangJiLu = true;
                    var getShangGangJiLu = data.dataMap.getShangGangJiLu;
                    getShangGangJiLu.map(function (item) {
                        item.createdDate = (0, _utils.formatTime)(item.createdDate, 'Y-M-D h:m:s');
                        if (item.endDate) {
                            item.endDate = (0, _utils.formatTime)(item.endDate, 'Y-M-D h:m:s');
                        }
                    });

                    _this.getShangGangJiLu = getShangGangJiLu;
                }
                _this.workFlow = workFlow;
                _this.getEnterprise(jobOffline.enterpriseId);
            }
        }).catch(function (err) {
            _this.$app.$def.prompt.showToast({
                message: "请检查您的网络"
            });
        });
    },
    getEnterprise: function getEnterprise(enterpriseId) {
        var _this2 = this;

        (0, _JobDetails.getEnterprise)(enterpriseId).then(function (data) {
            if (data.code !== 0) {
                _this2.$app.$def.prompt.showToast({
                    message: data.msg
                });
            } else {
                _this2.enterprise = data.dataMap.enterprise;
            }
        }).catch(function (err) {
            _this2.$app.$def.prompt.showToast({
                message: "请检查您的网络"
            });
        });
    }
};


var moduleOwn = exports.default || module.exports;
var accessors = ['public', 'protected', 'private'];

if (moduleOwn.data && accessors.some(function (acc) {
    return moduleOwn[acc];
})) {
    throw new Error('页面VM对象中的属性data不可与"' + accessors.join(',') + '"同时存在，请使用private替换data名称');
} else if (!moduleOwn.data) {
    moduleOwn.data = {};
    moduleOwn._descriptor = {};
    accessors.forEach(function (acc) {
        var accType = _typeof(moduleOwn[acc]);
        if (accType === 'object') {
            moduleOwn.data = Object.assign(moduleOwn.data, moduleOwn[acc]);
            for (var name in moduleOwn[acc]) {
                moduleOwn._descriptor[name] = { access: acc };
            }
        } else if (accType === 'function') {
            console.warn('页面VM对象中的属性' + acc + '的值不能是函数，请使用对象');
        }
    });
}}

/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getShangGangJiLu = getShangGangJiLu;

var _api = __webpack_require__(0);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getShangGangJiLu(token, jobId) {
    //全部
    return _api2.default.getShangGangJiLu({
        token: token,
        jobId: jobId
    }).then(function (response) {
        return Promise.resolve(JSON.parse(response.data));
    }).catch(function (err) {
        return Promise.reject(err);
    });
}

/***/ })

/******/ });
  };
  if (typeof window === "undefined") {
    return createPageHandler();
  }
  else {
    window.createPageHandler = createPageHandler
  }
})();
//# sourceMappingURL=index.js.map