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
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
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

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

var $app_template$ = __webpack_require__(23)
var $app_style$ = __webpack_require__(24)
var $app_script$ = __webpack_require__(25)

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

/***/ 23:
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
            "flex_page_top"
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
                    "head_box"
                  ],
                  "events": {
                    "click": "intoResume"
                  },
                  "children": [
                    {
                      "type": "image",
                      "attr": {
                        "src": function () {return this.userResume.headerFile?this.userResume.headerFile:'img/head_icon.png'}
                      },
                      "classList": [
                        "headerurl"
                      ]
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "user_box"
                  ],
                  "shown": function () {return this.isLogin},
                  "children": [
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "user_name_box"
                      ],
                      "children": [
                        {
                          "type": "text",
                          "attr": {
                            "value": function () {return this.userResume.realName?this.userResume.realName:this.userResume.phoneNumber}
                          },
                          "classList": [
                            "user_name"
                          ]
                        }
                      ]
                    },
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "user_data"
                      ],
                      "children": [
                        {
                          "type": "div",
                          "attr": {},
                          "classList": [
                            "resume"
                          ],
                          "children": [
                            {
                              "type": "text",
                              "attr": {
                                "value": function () {return (this.userdata.resumedata) + '%'}
                              },
                              "classList": [
                                "resume_nub"
                              ]
                            },
                            {
                              "type": "text",
                              "attr": {
                                "value": "完善简历"
                              },
                              "classList": [
                                "resume_text"
                              ],
                              "events": {
                                "click": "intoResume"
                              }
                            }
                          ]
                        },
                        {
                          "type": "div",
                          "attr": {},
                          "classList": [
                            "wallet"
                          ],
                          "children": [
                            {
                              "type": "div",
                              "attr": {},
                              "classList": [
                                "wallet_nub"
                              ],
                              "children": [
                                {
                                  "type": "text",
                                  "attr": {
                                    "value": function () {return this.userdata.wallet}
                                  },
                                  "classList": [
                                    "wallet_nub_text"
                                  ]
                                },
                                {
                                  "type": "text",
                                  "attr": {
                                    "value": "元"
                                  },
                                  "classList": [
                                    "yuan"
                                  ]
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "attr": {
                                "value": "钱包余额"
                              }
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
                    "notLogin"
                  ],
                  "shown": function () {return !(this.isLogin)},
                  "events": {
                    "click": "intoLogin"
                  },
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "未登录"
                      },
                      "classList": [
                        "login_text"
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
                "deliver_box"
              ],
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "deliver_top"
                  ],
                  "events": {
                    "click": function (evt) {this.intoDeliver(0,evt)}
                  },
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "我的投递"
                      },
                      "classList": [
                        "deliver_top_text"
                      ]
                    },
                    {
                      "type": "image",
                      "attr": {
                        "src": function () {return this.entrance}
                      }
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "deliver_bottom"
                  ],
                  "children": [
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "deliver_item"
                      ],
                      "repeat": function () {return this.deliverlist},
                      "events": {
                        "click": function (evt) {this.intoDeliver(this.$item.index,evt)}
                      },
                      "children": [
                        {
                          "type": "div",
                          "attr": {},
                          "children": [
                            {
                              "type": "image",
                              "attr": {
                                "src": function () {return this.$item.delivericon}
                              },
                              "classList": [
                                "deliver_item_icon"
                              ]
                            }
                          ]
                        },
                        {
                          "type": "text",
                          "attr": {
                            "value": function () {return this.$item.delivertext}
                          },
                          "classList": [
                            "deliver_item_text"
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
              "events": {
                "click": function (evt) {this.clickTabBar(evt)}
              },
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

/***/ 24:
/***/ (function(module, exports) {

module.exports = {
  ".page .flex_page": {
    "width": "100%",
    "flexDirection": "column",
    "justifyContent": "space-between",
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
  ".flex_page_top": {
    "width": "100%",
    "flexDirection": "column"
  },
  ".header": {
    "width": "100%",
    "height": "232px",
    "justifyContent": "flex-start",
    "paddingTop": "26px",
    "paddingRight": "0px",
    "paddingBottom": "26px",
    "paddingLeft": "48px",
    "borderBottomWidth": "1px",
    "borderBottomColor": "#eeeeee"
  },
  ".header .head_box": {
    "width": "180px",
    "height": "180px",
    "marginRight": "48px",
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
          "v": "head_box"
        }
      ]
    }
  },
  ".header .head_box .headerurl": {
    "width": "180px",
    "height": "180px",
    "borderRadius": "90px",
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
          "v": "head_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "headerurl"
        }
      ]
    }
  },
  ".header .user_box": {
    "width": "436px",
    "height": "180px",
    "flexDirection": "column",
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
          "v": "user_box"
        }
      ]
    }
  },
  ".header .user_box .user_name_box": {
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
          "v": "user_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "user_name_box"
        }
      ]
    }
  },
  ".header .user_box .user_name_box .user_name": {
    "color": "#333333",
    "fontSize": "44px",
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
          "v": "user_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "user_name_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "user_name"
        }
      ]
    }
  },
  ".header .user_box .user_name_box .quit": {
    "width": "36px",
    "height": "42px",
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
          "v": "user_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "user_name_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "quit"
        }
      ]
    }
  },
  ".header .user_box .user_data": {
    "justifyContent": "space-between",
    "height": "90px",
    "width": "100%",
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
          "v": "user_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "user_data"
        }
      ]
    }
  },
  ".header .user_box .user_data .resume": {
    "flexDirection": "column",
    "justifyContent": "space-between",
    "width": "124px",
    "height": "90px",
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
          "v": "user_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "user_data"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "resume"
        }
      ]
    }
  },
  ".header .user_box .user_data .resume .resume_nub": {
    "fontSize": "34px",
    "color": "#333333",
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
          "v": "user_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "user_data"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "resume"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "resume_nub"
        }
      ]
    }
  },
  ".header .user_box .user_data .wallet": {
    "flexDirection": "column",
    "justifyContent": "space-between",
    "height": "90px",
    "width": "240px",
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
          "v": "user_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "user_data"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "wallet"
        }
      ]
    }
  },
  ".header .user_box .user_data .wallet .wallet_nub .wallet_nub_text": {
    "fontSize": "34px",
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
          "v": "user_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "user_data"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "wallet"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "wallet_nub"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "wallet_nub_text"
        }
      ]
    }
  },
  ".header .user_box .user_data .wallet .wallet_nub .yuan": {
    "fontSize": "20px",
    "color": "#333333",
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
          "v": "user_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "user_data"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "wallet"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "wallet_nub"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "yuan"
        }
      ]
    }
  },
  ".header .notLogin": {
    "width": "380px",
    "height": "180px",
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
          "v": "notLogin"
        }
      ]
    }
  },
  ".header .notLogin .login_text": {
    "fontSize": "44px",
    "color": "#333333",
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
          "v": "notLogin"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "login_text"
        }
      ]
    }
  },
  ".deliver_box": {
    "height": "232px",
    "width": "100%",
    "borderBottomWidth": "1px",
    "borderBottomColor": "#eeeeee",
    "flexDirection": "column"
  },
  ".deliver_box .deliver_top": {
    "height": "80px",
    "width": "100%",
    "justifyContent": "space-between",
    "alignItems": "center",
    "paddingTop": "0px",
    "paddingRight": "46px",
    "paddingBottom": "0px",
    "paddingLeft": "46px",
    "marginBottom": "10px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "deliver_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "deliver_top"
        }
      ]
    }
  },
  ".deliver_box .deliver_top .deliver_top_text": {
    "fontSize": "30px",
    "color": "#333333",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "deliver_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "deliver_top"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "deliver_top_text"
        }
      ]
    }
  },
  ".deliver_box .deliver_bottom": {
    "paddingTop": "0px",
    "paddingRight": "70px",
    "paddingBottom": "0px",
    "paddingLeft": "70px",
    "justifyContent": "space-between",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "deliver_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "deliver_bottom"
        }
      ]
    }
  },
  ".deliver_box .deliver_bottom .deliver_item": {
    "height": "110px",
    "width": "70px",
    "flexDirection": "column",
    "alignItems": "center",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "deliver_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "deliver_bottom"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "deliver_item"
        }
      ]
    }
  },
  ".deliver_box .deliver_bottom .deliver_item .deliver_item_icon": {
    "width": "60px",
    "height": "60px",
    "backgroundSize": "100% 100%",
    "marginBottom": "24px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "deliver_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "deliver_bottom"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "deliver_item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "deliver_item_icon"
        }
      ]
    }
  },
  ".deliver_box .deliver_bottom .deliver_item .deliver_item_text": {
    "fontSize": "22px",
    "color": "#666666",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "deliver_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "deliver_bottom"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "deliver_item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "deliver_item_text"
        }
      ]
    }
  },
  ".tabbar_box": {
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
  }
}

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(module, exports, $app_require$){'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _my = __webpack_require__(26);

exports.default = {
  data: {
    indexicon: 'img/index_icon.png',
    myicon: 'img/my_active_icon.png',
    entrance: 'img/entrance_icon.png',
    deliverlist: [{
      delivericon: 'img/hire_icon.png',
      delivertext: '待录用',
      index: 1
    }, {
      delivericon: 'img/mountGuard.png',
      delivertext: '待上岗',
      index: 2
    }, {
      delivericon: 'img/settlement.png',
      delivertext: '待结算',
      index: 3
    }, {
      delivericon: 'img/pay.png',
      delivertext: '已结算',
      index: 4

    }],
    isLogin: false,
    userResume: {},
    userdata: {
      resumedata: '',
      wallet: ''
    },
    token: ''
  },
  onMenuPress: function onMenuPress() {
    this.$app.$def.showMenu();
  },
  onShow: function onShow() {
    this.$app.$def.refresh = true;
    var that = this;
    this.$app.$def.storage.get({
      key: 'user',
      success: function success(data) {
        if (data) {
          that.isLogin = true;
          that.token = JSON.parse(data).dataMap.token;
          that.showUserResume();
          that.getData();
        } else {
          that.isLogin = false;
        }
      },
      fail: function fail(data, code) {
        console.log(data);
      }
    });
  },
  showUserResume: function showUserResume() {
    var _this = this;

    (0, _my.showUserResume)(this.token).then(function (data) {
      if (data.code !== 0) {
        _this.$app.$def.prompt.showToast({
          message: data.msg
        });
      } else {
        console.log(data);
        _this.userResume = data.dataMap.userResume;
      }
    }).catch(function (err) {
      _this.$app.$def.prompt.showToast({
        message: "请检查您的网络"
      });
    });
  },
  getData: function getData() {
    var _this2 = this;

    (0, _my.getData)(this.token).then(function (data) {
      if (data.code === 0) {
        data.dataMap.userData.resumedata = data.dataMap.userData.resumedata.slice(3, 4);
        _this2.userdata = data.dataMap.userData;
      } else {
        _this2.$app.$def.prompt.showToast({
          message: data.msg
        });
      }
    }).catch(function (err) {
      _this2.$app.$def.prompt.showToast({
        message: "请检查您的网络"
      });
    });
  },
  intoLogin: function intoLogin() {
    this.$app.$def.router.push({
      uri: '/Login'
    });
  },
  intoDeliver: function intoDeliver(index) {
    if (this.isLogin) {
      this.$app.$def.router.push({
        uri: '/Deliver',
        params: { index: index }
      });
    } else {
      this.$app.$def.router.push({
        uri: '/Login'
      });
    }
  },
  intoResume: function intoResume() {
    if (this.isLogin) {
      if (this.userdata.resumedata === 0) {
        this.$app.$def.router.push({
          uri: '/Resume'
        });
      } else {
        this.$app.$def.router.push({
          uri: '/ResumeShow'
        });
      }
    } else {
      this.$app.$def.router.push({
        uri: '/Login'
      });
    }
  },
  clickTabBar: function clickTabBar() {
    this.$app.$def.router.replace({
      uri: '/Index'
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

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.showUserResume = showUserResume;
exports.getData = getData;

var _api = __webpack_require__(0);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function showUserResume(token) {
    return _api2.default.showUserResume({
        token: token
    }).then(function (response) {
        return Promise.resolve(JSON.parse(response.data));
    }).catch(function (err) {
        return Promise.reject(err);
    });
}

function getData(token) {
    return _api2.default.getData({
        token: token
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