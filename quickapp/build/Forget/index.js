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
/******/ 	return __webpack_require__(__webpack_require__.s = 58);
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

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.login = login;
exports.register = register;
exports.forget = forget;
exports.getCode = getCode;
exports.backCode = backCode;

var _api = __webpack_require__(0);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = $app_require$('@app-module/system.storage');

function login(phoneNumber, password) {
    return _api2.default.login({
        phoneNumber: phoneNumber,
        password: password
    }).then(function (response) {
        var value = JSON.parse(response.data);

        if (value.errorCode === -1) {
            Promise.reject(value.errorMsg);
        }
        storage.set({
            key: 'auth',
            Data: response.headers['Set-Cookie'],
            success: function success(data) {
                console.log('cookies保存成功');
            }
        });
        storage.set({
            key: 'user',
            value: value
        });
        storage.set({
            key: 'isLogin',
            value: true
        });
        return Promise.resolve(value);
    }).catch(function (err) {
        return Promise.reject('登录失败');
    });
}

function register(phoneNumber, validateCode, password) {
    return _api2.default.register({
        phoneNumber: phoneNumber,
        validateCode: validateCode,
        password: password
    }).then(function (response) {
        var value = JSON.parse(response.data);
        if (value.errorCode === -1) {
            Promise.reject(value.errorMsg);
        }

        return Promise.resolve(value);
    }).catch(function (err) {
        return Promise.reject('注册失败');
    });
}

function forget(phoneNumber, validateCode, password) {
    return _api2.default.forget({
        phoneNumber: phoneNumber,
        validateCode: validateCode,
        password: password
    }).then(function (response) {
        var value = JSON.parse(response.data);
        if (value.errorCode === -1) {
            Promise.reject(value.errorMsg);
        }

        return Promise.resolve(value);
    }).catch(function (err) {
        return Promise.reject('注册失败');
    });
}

function getCode(phoneNumber) {
    return _api2.default.getCode({
        phoneNumber: phoneNumber
    }).then(function (response) {
        var value = JSON.parse(response.data);

        if (value.errorCode === -1) {
            Promise.reject(value.errorMsg);
        }
        return Promise.resolve(value);
    }).catch(function (err) {
        return Promise.reject('获取失败');
    });
}

function backCode(phoneNumber) {
    return _api2.default.backCode({
        phoneNumber: phoneNumber
    }).then(function (response) {
        var value = JSON.parse(response.data);

        if (value.errorCode === -1) {
            Promise.reject(value.errorMsg);
        }
        return Promise.resolve(value);
    }).catch(function (err) {
        return Promise.reject('获取失败');
    });
}

/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

var $app_template$ = __webpack_require__(59)
var $app_style$ = __webpack_require__(60)
var $app_script$ = __webpack_require__(61)

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

/***/ 59:
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
            "forget_box"
          ],
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": [
                "phone_box"
              ],
              "children": [
                {
                  "type": "input",
                  "attr": {
                    "type": "number",
                    "value": function () {return this.phoneNumber},
                    "placeholder": "请输入11位手机号码"
                  },
                  "classList": [
                    "phone_nub"
                  ],
                  "events": {
                    "change": "onInputPhone"
                  }
                }
              ]
            },
            {
              "type": "div",
              "attr": {},
              "classList": [
                "code_box"
              ],
              "children": [
                {
                  "type": "input",
                  "attr": {
                    "type": "number",
                    "value": function () {return this.validateCode},
                    "placeholder": "请输入验证码"
                  },
                  "classList": [
                    "code_nub"
                  ],
                  "events": {
                    "change": "onInputCode"
                  }
                },
                {
                  "type": "text",
                  "attr": {
                    "disabled": function () {return this.disabled},
                    "value": function () {return this.codebtn}
                  },
                  "classList": [
                    "code_btn"
                  ],
                  "events": {
                    "click": "backCode"
                  }
                }
              ]
            },
            {
              "type": "div",
              "attr": {},
              "classList": [
                "password_box"
              ],
              "children": [
                {
                  "type": "input",
                  "attr": {
                    "type": "password",
                    "value": function () {return this.password},
                    "placeholder": "请输入密码 (6-16位数字字母组合)"
                  },
                  "classList": [
                    "password_nub"
                  ],
                  "events": {
                    "change": "onInputPassword"
                  }
                }
              ]
            },
            {
              "type": "div",
              "attr": {},
              "classList": [
                "forget_btn"
              ],
              "events": {
                "click": "forget"
              },
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": "重置密码"
                  },
                  "classList": [
                    "forget_btn_text"
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

/***/ 60:
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
  ".forget_box": {
    "width": "100%",
    "paddingTop": "0px",
    "paddingRight": "58px",
    "paddingBottom": "0px",
    "paddingLeft": "58px",
    "display": "flex",
    "flexDirection": "column"
  },
  ".forget_box .phone_box": {
    "height": "120px",
    "width": "100%",
    "borderBottomColor": "#eeeeee",
    "borderBottomWidth": "1px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "forget_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "phone_box"
        }
      ]
    }
  },
  ".forget_box .phone_box .phone_nub": {
    "width": "100%",
    "fontSize": "28px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "forget_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "phone_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "phone_nub"
        }
      ]
    }
  },
  ".forget_box .code_box": {
    "height": "120px",
    "width": "100%",
    "borderBottomColor": "#eeeeee",
    "borderBottomWidth": "1px",
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
          "v": "forget_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "code_box"
        }
      ]
    }
  },
  ".forget_box .code_box .code_nub": {
    "width": "460px",
    "fontSize": "28px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "forget_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "code_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "code_nub"
        }
      ]
    }
  },
  ".forget_box .code_box .code_btn": {
    "width": "154px",
    "fontSize": "28px",
    "color": "#cccccc",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "forget_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "code_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "code_btn"
        }
      ]
    }
  },
  ".forget_box .password_box": {
    "height": "120px",
    "width": "100%",
    "borderBottomColor": "#eeeeee",
    "borderBottomWidth": "1px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "forget_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "password_box"
        }
      ]
    }
  },
  ".forget_box .password_box .password_nub": {
    "width": "100%",
    "fontSize": "28px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "forget_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "password_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "password_nub"
        }
      ]
    }
  },
  ".forget_box .forget_btn": {
    "marginTop": "64px",
    "width": "100%",
    "height": "100px",
    "backgroundColor": "#37d3cb",
    "borderRadius": "10px",
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
          "v": "forget_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "forget_btn"
        }
      ]
    }
  },
  ".forget_box .forget_btn .forget_btn_text": {
    "fontSize": "28px",
    "color": "#fefefe",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "forget_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "forget_btn"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "forget_btn_text"
        }
      ]
    }
  }
}

/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(module, exports, $app_require$){'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _system = $app_require$('@app-module/system.router');

var _system2 = _interopRequireDefault(_system);

var _user = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    data: {
        codebtn: '获取验证码',
        currentTime: 61,
        disabled: false,
        phoneNumber: '',
        validateCode: '',
        password: ''
    },
    onInputPhone: function onInputPhone(_ref) {
        var value = _ref.value;

        this.phoneNumber = value;
    },
    onInputCode: function onInputCode(_ref2) {
        var value = _ref2.value;

        this.validateCode = value;
    },
    onInputPassword: function onInputPassword(_ref3) {
        var value = _ref3.value;

        this.password = value;
    },
    backCode: function backCode() {
        var _this = this;

        var RegExphone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
        if (!RegExphone.test(this.phoneNumber)) {
            this.$app.$def.prompt.showToast({
                message: '请输入手机号码'
            });
        } else {
            (0, _user.backCode)(this.phoneNumber).then(function (data) {
                if (data.code !== 0) {
                    _this.$app.$def.prompt.showToast({
                        message: data.msg
                    });
                } else {
                    var that = _this;
                    var interval = setInterval(function () {
                        that.currentTime--;
                        that.codebtn = that.currentTime + '秒';
                        if (that.currentTime <= 0) {
                            clearInterval(interval);
                            that.codebtn = "重新发送";
                            that.currentTime = '61';
                            that.disabled = "false";
                        }
                    }, 1000);
                }
            }).catch(function (err) {
                _this.$app.$def.prompt.showToast({
                    message: "请检查您的网络"
                });
            });
        }
    },
    forget: function forget() {
        var _this2 = this;

        var RegExphone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
        var RegExpCode = /^\d{6}$/;
        var RegExpPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
        if (!RegExphone.test(this.phoneNumber)) {
            this.$app.$def.prompt.showToast({
                message: '请输入手机号码'
            });
        } else if (!RegExpCode.test(this.validateCode)) {
            this.$app.$def.prompt.showToast({
                message: '请输入验证码'
            });
        } else if (!RegExpPassword.test(this.password)) {
            this.$app.$def.prompt.showToast({
                message: '请提高密码安全性'
            });
        } else {
            (0, _user.forget)(this.phoneNumber, this.validateCode, this.password).then(function (data) {
                if (data.code !== 0) {
                    _this2.$app.$def.prompt.showToast({
                        message: data.msg
                    });
                } else {
                    _system2.default.back();
                }
            }).catch(function (err) {
                _this2.$app.$def.prompt.showToast({
                    message: "请检查您的网络"
                });
            });
        }
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