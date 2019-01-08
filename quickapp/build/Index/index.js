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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
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
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var $app_template$ = __webpack_require__(8)
var $app_style$ = __webpack_require__(9)
var $app_script$ = __webpack_require__(10)

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
/* 8 */
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
            "search"
          ],
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": [
                "search_box"
              ],
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "city"
                  ],
                  "events": {
                    "click": "intoCity"
                  },
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return this.value}
                      },
                      "classList": [
                        "city_name"
                      ]
                    },
                    {
                      "type": "image",
                      "attr": {
                        "src": function () {return this.cityicon}
                      },
                      "classList": [
                        "city_more"
                      ]
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "search_btn"
                  ],
                  "events": {
                    "click": "intoSearch"
                  },
                  "children": [
                    {
                      "type": "image",
                      "attr": {
                        "src": function () {return this.searchicon}
                      },
                      "classList": [
                        "search_icon"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return this.searchkey}
                      },
                      "classList": [
                        "search_text"
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "list",
          "attr": {},
          "classList": [
            "content"
          ],
          "style": {
            "flex": 1
          },
          "events": {
            "scrollbottom": "loadMoreData"
          },
          "children": [
            {
              "type": "block",
              "attr": {},
              "repeat": function () {return this.jobOfflinePage.dataList},
              "children": [
                {
                  "type": "list-item",
                  "attr": {
                    "type": "product"
                  },
                  "classList": [
                    "job_item"
                  ],
                  "events": {
                    "click": function (evt) {this.openJobDetails(this.$item.id,evt)}
                  },
                  "children": [
                    {
                      "type": "image",
                      "attr": {
                        "src": function () {return '../Common/Component/Joblist/img/offline/' + (this.$item.image)}
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
                            "value": function () {return this.$item.title}
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
                                    "value": function () {return this.$item.address}
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
                                    "value": function () {return this.$item.salaryStr}
                                  },
                                  "classList": [
                                    "job_item_wage"
                                  ]
                                },
                                {
                                  "type": "text",
                                  "attr": {
                                    "value": function () {return 'RMB/' + (this.$item.salaryUnitStr)}
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
                                    "value": function () {return (this.$item.startDate) + '~' + (this.$item.endDate)}
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
                                    "value": function () {return (this.$item.jobTypeStr.split(',')[0]) + '-' + (this.$item.settlementTypeStr) + '结'}
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
                }
              ]
            },
            {
              "type": "list-item",
              "attr": {
                "type": "loadMore"
              },
              "classList": [
                "load-more"
              ],
              "children": [
                {
                  "type": "progress",
                  "attr": {
                    "show": function () {return this.hasMoreData},
                    "type": "circular"
                  }
                },
                {
                  "type": "text",
                  "attr": {
                    "show": function () {return this.hasMoreData},
                    "value": "加载更多"
                  }
                },
                {
                  "type": "text",
                  "attr": {
                    "show": function () {return !this.hasMoreData},
                    "value": "没有更多了~"
                  }
                }
              ]
            }
          ]
        },
        {
          "type": "div",
          "attr": {},
          "classList": [
            "tabbar_box"
          ],
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": [
                "tabbar_index"
              ],
              "children": [
                {
                  "type": "image",
                  "attr": {
                    "src": function () {return this.indexicon}
                  },
                  "classList": [
                    "index_icon"
                  ]
                },
                {
                  "type": "text",
                  "attr": {
                    "value": "首页"
                  },
                  "classList": [
                    "index_text"
                  ]
                }
              ]
            },
            {
              "type": "div",
              "attr": {},
              "classList": [
                "tabbar_my"
              ],
              "events": {
                "click": function (evt) {this.clickMy(evt)}
              },
              "children": [
                {
                  "type": "image",
                  "attr": {
                    "src": function () {return this.myicon}
                  },
                  "classList": [
                    "my_icon"
                  ]
                },
                {
                  "type": "text",
                  "attr": {
                    "value": "我的"
                  },
                  "classList": [
                    "my_text"
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
/* 9 */
/***/ (function(module, exports) {

module.exports = {
  ".page .flex_page": {
    "width": "100%",
    "display": "flex",
    "flexDirection": "column",
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
  ".search": {
    "height": "108px",
    "width": "100%",
    "borderBottomColor": "#eeeeee",
    "borderBottomWidth": "2px",
    "display": "flex",
    "justifyContent": "center",
    "alignItems": "center"
  },
  ".search .search_box": {
    "width": "634px",
    "height": "56px",
    "borderTopColor": "#eeeeee",
    "borderRightColor": "#eeeeee",
    "borderBottomColor": "#eeeeee",
    "borderLeftColor": "#eeeeee",
    "borderTopWidth": "1px",
    "borderRightWidth": "1px",
    "borderBottomWidth": "1px",
    "borderLeftWidth": "1px",
    "borderRadius": "56px",
    "display": "flex",
    "justifyContent": "center",
    "alignItems": "center",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "search"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "search_box"
        }
      ]
    }
  },
  ".search .search_box .city": {
    "width": "130px",
    "height": "30px",
    "borderRightColor": "#aaaaaa",
    "borderRightWidth": "2px",
    "display": "flex",
    "justifyContent": "flex-start",
    "alignItems": "center",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "search"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "search_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "city"
        }
      ]
    }
  },
  ".search .search_box .city .city_name": {
    "color": "#333333",
    "fontSize": "26px",
    "height": "30px",
    "lines": 1,
    "textOverflow": "ellipsis",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "search"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "search_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "city"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "city_name"
        }
      ]
    }
  },
  ".search .search_box .city .city_more": {
    "marginLeft": "12px",
    "width": "14px",
    "height": "14px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "search"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "search_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "city"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "city_more"
        }
      ]
    }
  },
  ".search .search_box .search_btn": {
    "width": "400px",
    "height": "30px",
    "display": "flex",
    "justifyContent": "flex-start",
    "alignItems": "center",
    "paddingLeft": "72px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "search"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "search_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "search_btn"
        }
      ]
    }
  },
  ".search .search_box .search_btn .search_icon": {
    "width": "24px",
    "height": "24px",
    "marginRight": "12px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "search"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "search_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "search_btn"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "search_icon"
        }
      ]
    }
  },
  ".search .search_box .search_btn .search_text": {
    "fontSize": "24px",
    "color": "#aaaaaa",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "search"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "search_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "search_btn"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "search_text"
        }
      ]
    }
  },
  ".tabbar_box": {
    "display": "flex",
    "justifyContent": "space-between",
    "alignItems": "center",
    "borderTopWidth": "1px",
    "borderTopColor": "#eeeeee",
    "height": "98px",
    "width": "100%"
  },
  ".tabbar_box .tabbar_index": {
    "marginLeft": "146px",
    "width": "44px",
    "height": "70px",
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "center",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tabbar_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tabbar_index"
        }
      ]
    }
  },
  ".tabbar_box .tabbar_index .index_icon": {
    "width": "44px",
    "height": "44px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tabbar_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tabbar_index"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "index_icon"
        }
      ]
    }
  },
  ".tabbar_box .tabbar_index .index_text": {
    "fontSize": "20px",
    "color": "#888888",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tabbar_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tabbar_index"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "index_text"
        }
      ]
    }
  },
  ".tabbar_box .tabbar_my": {
    "marginRight": "146px",
    "width": "44px",
    "height": "70px",
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "center",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tabbar_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tabbar_my"
        }
      ]
    }
  },
  ".tabbar_box .tabbar_my .my_icon": {
    "width": "44px",
    "height": "44px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tabbar_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tabbar_my"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "my_icon"
        }
      ]
    }
  },
  ".tabbar_box .tabbar_my .my_text": {
    "fontSize": "20px",
    "color": "#888888",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tabbar_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tabbar_my"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "my_text"
        }
      ]
    }
  },
  ".content": {
    "flex": 1
  },
  ".job_item": {
    "backgroundColor": "#ffffff",
    "height": "160px",
    "borderBottomColor": "#eeeeee",
    "borderBottomWidth": "1px",
    "display": "flex",
    "justifyContent": "flex-start",
    "alignItems": "center"
  },
  ".job_item .job_item_icon": {
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
  ".job_item .job_itme_box": {
    "width": "520px",
    "height": "110px",
    "display": "flex",
    "flexDirection": "column",
    "alignSelf": "center",
    "_meta": {
      "ruleDef": [
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
  ".job_item .job_itme_box .job_item_name": {
    "color": "#333333",
    "fontSize": "28px",
    "textAlign": "left",
    "_meta": {
      "ruleDef": [
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
  ".job_item .job_itme_box .job_item_box2": {
    "display": "flex",
    "justifyContent": "space-between",
    "_meta": {
      "ruleDef": [
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
  ".job_item .job_itme_box .job_item_box2 .job_item_address": {
    "display": "flex",
    "justifyContent": "flex-start",
    "alignItems": "center",
    "_meta": {
      "ruleDef": [
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
  ".job_item .job_itme_box .job_item_box2 .job_item_address .job_item_address_icon": {
    "width": "18px",
    "marginRight": "14px",
    "_meta": {
      "ruleDef": [
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
  ".job_item .job_itme_box .job_item_box2 .job_item_address .job_item_address_text": {
    "width": "200px",
    "color": "#888888",
    "fontSize": "22px",
    "lines": 1,
    "textOverflow": "ellipsis",
    "_meta": {
      "ruleDef": [
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
  ".job_item .job_itme_box .job_item_box2 .job_item_wage": {
    "color": "#37d3cb",
    "fontSize": "40px",
    "_meta": {
      "ruleDef": [
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
  ".job_item .job_itme_box .job_item_box2 .job_item_unit": {
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
  ".job_item .job_itme_box .job_item_box3": {
    "display": "flex",
    "justifyContent": "space-between",
    "alignItems": "center",
    "_meta": {
      "ruleDef": [
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
  ".job_item .job_itme_box .job_item_box3 .job_item_time": {
    "display": "flex",
    "justifyContent": "flex-start",
    "alignItems": "center",
    "_meta": {
      "ruleDef": [
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
  ".job_item .job_itme_box .job_item_box3 .job_item_time .job_item_time_icon": {
    "width": "18px",
    "marginRight": "12px",
    "_meta": {
      "ruleDef": [
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
  ".job_item .job_itme_box .job_item_box3 .job_item_time .job_item_time_text": {
    "fontSize": "22px",
    "color": "#888888",
    "_meta": {
      "ruleDef": [
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
  ".job_item .job_itme_box .job_item_box3 .position": {
    "display": "flex",
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
  ".job_item .job_itme_box .job_item_box3 .position .position_text": {
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
  ".load-more": {
    "display": "flex",
    "justifyContent": "center"
  }
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(module, exports, $app_require$){'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _index = __webpack_require__(11);

var _joblist = __webpack_require__(12);

var _utils = __webpack_require__(1);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = {
  data: function data() {
    return {
      cityicon: 'img/down_icon.png',
      searchicon: 'img/search_icon.png',
      indexicon: 'img/index_active_icon.png',
      myicon: 'img/my_icon.png',
      searchkey: '',
      cityId: '',
      value: "北京",
      key: '',
      LngitudeAndLatitude: '',
      pageNo: 1,
      jobOfflinePage: {
        dataList: []
      },
      hasMoreData: 'true',
      refresh: true,
      hasDownData: false };
  },
  onShow: function onShow() {
    this.refresh = this.$app.$def.refresh;
    if (this.refresh) {
      var that = this;
      this.jobOfflinePage.dataList = [];
      this.pageNo = 1;
      this.hasMoreData = true;
      this.$app.$def.storage.get({
        key: 'searchkey',
        success: function success(data) {
          if (!data) {
            return;
          } else {
            that.searchkey = JSON.parse(data).searchkey;
          }
        },
        fail: function fail(data, code) {
          console.log('handling fail, code = ' + code);
        }
      });

      this.$app.$def.storage.get({
        key: 'city',
        success: function success(data) {
          if (!data) {
            that.getJobList();
            that.getgeolocation();
          } else {
            that.value = JSON.parse(data).cityname;
            that.key = JSON.parse(data).cityid;
            that.getJobList();
          }
        },
        fail: function fail(data, code) {
          console.log('handling fail, code = ' + code);
        }
      });
    }
  },
  getgeolocation: function getgeolocation() {
    var that = this;
    this.$app.$def.geolocation.getLocation({
      success: function success(data) {
        that.LngitudeAndLatitude = data.longitude + ',' + data.latitude;
        that.getCityName();
      },
      fail: function fail(data, code) {
        console.log('handling fail, code = ' + code);
      }
    });
  },
  getCityName: function getCityName() {
    var _this = this;

    (0, _index.getCityName)(this.LngitudeAndLatitude).then(function (data) {
      if (data.code !== 0) {
        return;
      } else {
        _this.$app.$def.storage.set({
          key: 'city',
          value: {
            cityid: data.dataMap.cityId,
            cityname: data.dataMap.cityName
          },
          success: function success(data) {
            console.log(data);
          },
          fail: function fail(data, code) {
            console.log('handling fail, code = ' + code);
          }
        });
        _this.value = data.dataMap.cityName;
        _this.key = data.dataMap.cityId;
        _this.getJobList();
      }
    }).catch(function (err) {
      _this.$app.$def.prompt.showToast({
        message: "请检查您的网络"
      });
    });
  },
  getJobList: function getJobList() {
    var _this2 = this;

    (0, _joblist.getJobList)(this.key, this.pageNo, this.searchkey).then(function (data) {
      if (data.code !== 0) {
        _this2.$app.$def.prompt.showToast({
          message: data.msg
        });
      } else {
        var jobOfflinePage = data.dataMap.jobOfflinePage;
        var BeforeJobOfflinePage = _this2.jobOfflinePage;
        if (jobOfflinePage.dataList.length < 15) {
          _this2.hasMoreData = false;
        }

        jobOfflinePage.dataList.map(function (item) {
          item.image = (0, _utils.imgLogo)(item.jobSubtypeId);
          item.startDate = (0, _utils.formatTime)(item.startDate, 'Y.M.D');
          item.endDate = (0, _utils.formatTime)(item.endDate, 'Y.M.D');
        });
        jobOfflinePage.dataList = [].concat(_toConsumableArray(BeforeJobOfflinePage.dataList), _toConsumableArray(jobOfflinePage.dataList));

        _this2.jobOfflinePage = jobOfflinePage;
        _this2.hasDownData = false;
      }
    }).catch(function (err) {
      _this2.$app.$def.prompt.showToast({
        message: "请检查您的网络"
      });
    });
  },
  loadMoreData: function loadMoreData() {
    this.pageNo++;
    this.getJobList();
  },
  pullDownData: function pullDownData() {
    console.log(this.hasDownData);
    this.hasDownData = true;
    this.pageNo = 0;
    this.getJobList();
  },
  openJobDetails: function openJobDetails(JobOfflineId) {
    this.$app.$def.router.push({
      uri: 'JobDetails',
      params: {
        JobOfflineId: JobOfflineId
      }
    });
  },
  intoCity: function intoCity() {
    this.$app.$def.router.push({
      uri: '/City',
      params: {
        cityname: this.value
      }
    });
  },
  intoSearch: function intoSearch() {
    this.$app.$def.router.push({
      uri: '/Search'
    });
  },
  clickMy: function clickMy() {
    this.$app.$def.router.replace({
      uri: '/My'
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCityName = getCityName;

var _api = __webpack_require__(0);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export function getJobList() {
//     return api.getJobList()
//         .then((response) => {
//             return Promise.resolve(JSON.parse(response.data).data)
//         }).catch((err) => {
//             return Promise.reject(err)
//         })
// }

function getCityName(LngitudeAndLatitude) {
    return _api2.default.getCityName({
        point: LngitudeAndLatitude
    }).then(function (response) {
        return Promise.resolve(JSON.parse(response.data));
    }).catch(function (err) {
        return Promise.reject(err);
    });
}
// export function getArticleByClassify(page = 0, cid) {
//     return api.getArticleByClassify(page, cid)
//         .then((response) => {
//             return Promise.resolve(JSON.parse(response.data).data)
//         }).catch((err) => {
//             return Promise.reject(err)
//         })
// }

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getJobList = getJobList;

var _api = __webpack_require__(0);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getJobList(cityId, pageNo, searchkey) {
    return _api2.default.getJobList({
        cityId: cityId,
        pageNo: pageNo,
        searchkey: searchkey
    }).then(function (response) {
        return Promise.resolve(JSON.parse(response.data));
    }).catch(function (err) {
        return Promise.reject(err);
    });
}

// export function getArticleByClassify(page = 0, cid) {
//     return api.getArticleByClassify(page, cid)
//         .then((response) => {
//             return Promise.resolve(JSON.parse(response.data).data)
//         }).catch((err) => {
//             return Promise.reject(err)
//         })
// }

/***/ })
/******/ ]);
  };
  if (typeof window === "undefined") {
    return createPageHandler();
  }
  else {
    window.createPageHandler = createPageHandler
  }
})();
//# sourceMappingURL=index.js.map