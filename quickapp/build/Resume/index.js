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
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
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

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

var $app_template$ = __webpack_require__(28)
var $app_style$ = __webpack_require__(29)
var $app_script$ = __webpack_require__(30)

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

/***/ 28:
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
            "box"
          ],
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": [
                "header"
              ],
              "events": {
                "click": "Imageuploading"
              },
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "head"
                  ],
                  "children": [
                    {
                      "type": "image",
                      "attr": {
                        "src": function () {return this.headerFile}
                      },
                      "classList": [
                        "head_icon"
                      ]
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "head_text"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "设置头像"
                      },
                      "classList": [
                        "head_text_text"
                      ]
                    },
                    {
                      "type": "image",
                      "attr": {
                        "src": "img/into_icon.png"
                      },
                      "classList": [
                        "into_icon"
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
                "reminder_box"
              ],
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": "* 为必填项 完善简历提高10倍的录取速度哦"
                  },
                  "classList": [
                    "reminder"
                  ]
                }
              ]
            },
            {
              "type": "div",
              "attr": {},
              "classList": [
                "basic",
                "module"
              ],
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "item",
                    "name"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "*"
                      },
                      "classList": [
                        "xinghao"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": " 姓名"
                      },
                      "classList": [
                        "item_text"
                      ]
                    },
                    {
                      "type": "input",
                      "attr": {
                        "placeholder": "请输入姓名",
                        "value": function () {return this.realName}
                      },
                      "classList": [
                        "item_input"
                      ],
                      "events": {
                        "change": "realNamechange"
                      }
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
                    "item",
                    "gender"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "*"
                      },
                      "classList": [
                        "xinghao"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": " 性别"
                      },
                      "classList": [
                        "item_text"
                      ]
                    },
                    {
                      "type": "picker",
                      "attr": {
                        "type": "text",
                        "range": function () {return this.genderlist},
                        "value": function () {return this.gender}
                      },
                      "classList": [
                        "picker",
                        "gender_box"
                      ],
                      "events": {
                        "change": "genderclick"
                      }
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
                    "item",
                    "birthday"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "*"
                      },
                      "classList": [
                        "xinghao"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": " 出生年月"
                      },
                      "classList": [
                        "item_text"
                      ]
                    },
                    {
                      "type": "picker",
                      "attr": {
                        "type": "date",
                        "start": "1950-1-1",
                        "end": "2020-12-31",
                        "value": function () {return this.birthdaytime}
                      },
                      "classList": [
                        "picker"
                      ],
                      "events": {
                        "change": "birthdayclick"
                      }
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
                    "item"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "*"
                      },
                      "classList": [
                        "xinghao",
                        "hidden"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": " 身高(cm)"
                      },
                      "classList": [
                        "item_text"
                      ]
                    },
                    {
                      "type": "input",
                      "attr": {
                        "type": "number",
                        "placeholder": "请输入身高",
                        "value": function () {return this.height}
                      },
                      "classList": [
                        "item_input"
                      ],
                      "events": {
                        "change": "heightchange"
                      }
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
                    "item"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "*"
                      },
                      "classList": [
                        "xinghao",
                        "hidden"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": " 体重(kg)"
                      },
                      "classList": [
                        "item_text"
                      ]
                    },
                    {
                      "type": "input",
                      "attr": {
                        "type": "number",
                        "placeholder": "请输入体重",
                        "value": function () {return this.weight}
                      },
                      "classList": [
                        "item_input"
                      ],
                      "events": {
                        "change": "weightchange"
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
                "education",
                "module"
              ],
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "item"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "*"
                      },
                      "classList": [
                        "xinghao"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": " 教育情况"
                      },
                      "classList": [
                        "item_text"
                      ]
                    },
                    {
                      "type": "picker",
                      "attr": {
                        "type": "text",
                        "range": function () {return this.educationconditionlist},
                        "value": function () {return this.educationcondition}
                      },
                      "classList": [
                        "picker",
                        "gender_box"
                      ],
                      "events": {
                        "change": "educationconditionclick"
                      }
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
                    "item"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "*"
                      },
                      "classList": [
                        "xinghao"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": " 毕业学校"
                      },
                      "classList": [
                        "item_text"
                      ]
                    },
                    {
                      "type": "input",
                      "attr": {
                        "placeholder": "请输入学校",
                        "value": function () {return this.school}
                      },
                      "classList": [
                        "item_input"
                      ],
                      "events": {
                        "change": "schoolchange"
                      }
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
                    "item"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "*"
                      },
                      "classList": [
                        "xinghao"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": " 入学年份"
                      },
                      "classList": [
                        "item_text"
                      ]
                    },
                    {
                      "type": "picker",
                      "attr": {
                        "type": "date",
                        "start": "1950-1-1",
                        "end": "2020-1-1",
                        "value": function () {return this.startschooltime},
                        "selected": "yyyy"
                      },
                      "classList": [
                        "picker"
                      ],
                      "events": {
                        "change": "startschool"
                      }
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
                    "item"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "*"
                      },
                      "classList": [
                        "xinghao"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": " 学历"
                      },
                      "classList": [
                        "item_text"
                      ]
                    },
                    {
                      "type": "picker",
                      "attr": {
                        "type": "text",
                        "range": function () {return this.educationlist},
                        "value": function () {return this.education}
                      },
                      "classList": [
                        "picker",
                        "gender_box"
                      ],
                      "events": {
                        "change": "educationclick"
                      }
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
                    "item"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "*"
                      },
                      "classList": [
                        "xinghao"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": " 专业"
                      },
                      "classList": [
                        "item_text"
                      ]
                    },
                    {
                      "type": "input",
                      "attr": {
                        "placeholder": "请输入专业",
                        "value": function () {return this.profession}
                      },
                      "classList": [
                        "item_input"
                      ],
                      "events": {
                        "change": "professionchange"
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
                "location",
                "module"
              ],
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "item",
                    "location_box"
                  ],
                  "children": [
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "location_box_item"
                      ],
                      "children": [
                        {
                          "type": "text",
                          "attr": {
                            "value": "*"
                          },
                          "classList": [
                            "xinghao"
                          ]
                        },
                        {
                          "type": "picker",
                          "attr": {
                            "type": "text",
                            "range": function () {return this.newprovincelist},
                            "value": function () {return this.province}
                          },
                          "classList": [
                            "picker_location"
                          ],
                          "events": {
                            "change": "provinceonchange"
                          }
                        },
                        {
                          "type": "image",
                          "attr": {
                            "src": "img/down_icon.png"
                          },
                          "classList": [
                            "down_img"
                          ]
                        }
                      ]
                    },
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "location_box_item"
                      ],
                      "children": [
                        {
                          "type": "text",
                          "attr": {
                            "value": "*"
                          },
                          "classList": [
                            "xinghao"
                          ]
                        },
                        {
                          "type": "picker",
                          "attr": {
                            "type": "text",
                            "range": function () {return this.newchildrencitylist},
                            "value": function () {return this.childrencity}
                          },
                          "classList": [
                            "picker_location"
                          ],
                          "events": {
                            "change": "childschange"
                          }
                        },
                        {
                          "type": "image",
                          "attr": {
                            "src": "img/down_icon.png"
                          },
                          "classList": [
                            "down_img"
                          ]
                        }
                      ]
                    },
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "location_box_item"
                      ],
                      "children": [
                        {
                          "type": "text",
                          "attr": {
                            "value": "*"
                          },
                          "classList": [
                            "xinghao"
                          ]
                        },
                        {
                          "type": "picker",
                          "attr": {
                            "type": "text",
                            "range": function () {return this.newarealist},
                            "value": function () {return this.area}
                          },
                          "classList": [
                            "picker_location"
                          ],
                          "events": {
                            "change": "areachange"
                          }
                        },
                        {
                          "type": "image",
                          "attr": {
                            "src": "img/down_icon.png"
                          },
                          "classList": [
                            "down_img"
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
                "relation",
                "module"
              ],
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "item"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "*"
                      },
                      "classList": [
                        "xinghao",
                        "hidden"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": " 邮箱"
                      },
                      "classList": [
                        "item_text"
                      ]
                    },
                    {
                      "type": "input",
                      "attr": {
                        "placeholder": "请输入邮箱",
                        "value": function () {return this.email}
                      },
                      "classList": [
                        "item_input"
                      ],
                      "events": {
                        "change": "emailchange"
                      }
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
                    "item"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "*"
                      },
                      "classList": [
                        "xinghao",
                        "hidden"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": " QQ"
                      },
                      "classList": [
                        "item_text"
                      ]
                    },
                    {
                      "type": "input",
                      "attr": {
                        "type": "number",
                        "placeholder": "请输入QQ",
                        "value": function () {return this.qq}
                      },
                      "classList": [
                        "item_input"
                      ],
                      "events": {
                        "change": "qqchange"
                      }
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "item"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "*"
                      },
                      "classList": [
                        "xinghao"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": " 电话"
                      },
                      "classList": [
                        "item_text"
                      ]
                    },
                    {
                      "type": "input",
                      "attr": {
                        "type": "number",
                        "maxlength": "11",
                        "placeholder": "请输入电话",
                        "value": function () {return this.mobile}
                      },
                      "classList": [
                        "item_input"
                      ],
                      "events": {
                        "change": "mobilechange"
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
                "expectjob",
                "module"
              ],
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "expectjob_title"
                  ],
                  "children": [
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "item"
                      ],
                      "children": [
                        {
                          "type": "text",
                          "attr": {
                            "value": "*"
                          },
                          "classList": [
                            "xinghao"
                          ]
                        },
                        {
                          "type": "text",
                          "attr": {
                            "value": " 期望职位"
                          },
                          "classList": [
                            "item_text"
                          ]
                        },
                        {
                          "type": "text",
                          "attr": {
                            "value": "快速点亮你的闪光点"
                          },
                          "classList": [
                            "item_input",
                            "expectjob_title_text"
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
                    "expectjob_list"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return this.$item.key}
                      },
                      "classList": function () {return ['expectjob_item', this.$item.flag?'expectjob_item_active':'1']},
                      "repeat": function () {return this.jobtypeList},
                      "events": {
                        "click": function (evt) {this.expectjobclick(this.$idx,evt)}
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
                "experience",
                "module"
              ],
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": "工作经验"
                  },
                  "classList": [
                    "experience_title"
                  ]
                },
                {
                  "type": "textarea",
                  "attr": {
                    "maxlength": "200",
                    "placeholder": "请输入工作经历，200字以内",
                    "value": function () {return this.experience}
                  },
                  "classList": [
                    "experience_text"
                  ],
                  "events": {
                    "change": "experiencechange"
                  }
                }
              ]
            },
            {
              "type": "div",
              "attr": {},
              "classList": [
                "agreement"
              ],
              "children": [
                {
                  "type": "image",
                  "attr": {
                    "src": "img/already_icon.png"
                  },
                  "classList": [
                    "agreement_icon"
                  ]
                },
                {
                  "type": "text",
                  "attr": {
                    "value": "保存并同意"
                  },
                  "classList": [
                    "agreement_text"
                  ]
                },
                {
                  "type": "a",
                  "attr": {
                    "value": "《简历协议》"
                  },
                  "classList": [
                    "agreement_a"
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
            "save_box"
          ],
          "events": {
            "click": "saveclick"
          },
          "children": [
            {
              "type": "text",
              "attr": {
                "value": "保存简历"
              },
              "classList": [
                "save_text"
              ]
            }
          ]
        }
      ]
    }
  ]
}

/***/ }),

/***/ 29:
/***/ (function(module, exports) {

module.exports = {
  ".page .flex_page": {
    "width": "100%",
    "display": "flex",
    "flexDirection": "column",
    "backgroundColor": "#f2f8ff",
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
  ".box": {
    "display": "flex",
    "flexDirection": "column",
    "paddingTop": "16px",
    "paddingRight": "12px",
    "paddingBottom": "0px",
    "paddingLeft": "12px"
  },
  ".box .header": {
    "width": "100%",
    "height": "200px",
    "backgroundColor": "#ffffff",
    "borderRadius": "10px",
    "display": "flex",
    "justifyContent": "space-between",
    "alignItems": "center",
    "paddingLeft": "32px",
    "paddingRight": "42px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "header"
        }
      ]
    }
  },
  ".box .header .head": {
    "height": "143px",
    "width": "143px",
    "backgroundImage": "/Resume/img/rahmen_icon.png",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
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
          "v": "head"
        }
      ]
    }
  },
  ".box .header .head .head_icon": {
    "height": "143px",
    "width": "143px",
    "borderRadius": "71.5px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
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
          "v": "head"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "head_icon"
        }
      ]
    }
  },
  ".box .header .head_text": {
    "display": "flex",
    "justifyContent": "space-between",
    "alignItems": "center",
    "width": "480px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
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
          "v": "head_text"
        }
      ]
    }
  },
  ".box .header .head_text .head_text_text": {
    "fontSize": "24px",
    "color": "#aaaaaa",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
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
          "v": "head_text"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "head_text_text"
        }
      ]
    }
  },
  ".box .header .head_text .into_icon": {
    "width": "14px",
    "height": "27px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
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
          "v": "head_text"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "into_icon"
        }
      ]
    }
  },
  ".box .reminder_box": {
    "height": "82px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "reminder_box"
        }
      ]
    }
  },
  ".box .reminder_box .reminder": {
    "color": "#37d3cb",
    "fontSize": "24px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "reminder_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "reminder"
        }
      ]
    }
  },
  ".box .basic": {
    "marginBottom": "16px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic"
        }
      ]
    }
  },
  ".box .education": {
    "marginBottom": "16px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "education"
        }
      ]
    }
  },
  ".box .location": {
    "marginBottom": "16px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "location"
        }
      ]
    }
  },
  ".box .relation": {
    "marginBottom": "16px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "relation"
        }
      ]
    }
  },
  ".box .expectjob": {
    "marginBottom": "16px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "expectjob"
        }
      ]
    }
  },
  ".box .experience": {
    "paddingTop": "0px",
    "paddingRight": "44px",
    "paddingBottom": "0px",
    "paddingLeft": "44px",
    "height": "208px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "experience"
        }
      ]
    }
  },
  ".box .module": {
    "width": "100%",
    "borderRadius": "10px",
    "backgroundColor": "#ffffff",
    "display": "flex",
    "flexDirection": "column",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "module"
        }
      ]
    }
  },
  ".box .module .item": {
    "height": "86px",
    "width": "100%",
    "display": "flex",
    "alignItems": "center",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "module"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "item"
        }
      ]
    }
  },
  ".box .module .item .xinghao": {
    "color": "#37d3cb",
    "fontSize": "28px",
    "marginLeft": "14px",
    "marginRight": "10px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "module"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "xinghao"
        }
      ]
    }
  },
  ".box .module .item .hidden": {
    "visibility": "hidden",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "module"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "hidden"
        }
      ]
    }
  },
  ".box .module .item .item_text": {
    "width": "150px",
    "fontSize": "28px",
    "color": "#333333",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "module"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "item_text"
        }
      ]
    }
  },
  ".box .module .item .item_input": {
    "width": "496px",
    "fontSize": "28px",
    "color": "#333333",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "module"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "item_input"
        }
      ]
    }
  },
  ".box .module .item .expectjob_title_text": {
    "color": "#37d3cb",
    "fontSize": "24px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "module"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "expectjob_title_text"
        }
      ]
    }
  },
  ".box .module .item .picker": {
    "height": "100%",
    "width": "496px",
    "color": "#333333",
    "fontSize": "28px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "module"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "picker"
        }
      ]
    }
  },
  ".box .module .item .line": {
    "height": "1px",
    "width": "100%",
    "backgroundColor": "#dbedff",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "module"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "item"
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
  ".box .module .location_box": {
    "display": "flex",
    "justifyContent": "space-between",
    "alignItems": "center",
    "paddingRight": "32px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "module"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "location_box"
        }
      ]
    }
  },
  ".box .module .location_box .location_box_item": {
    "height": "100%",
    "width": "182px",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "module"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "location_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "location_box_item"
        }
      ]
    }
  },
  ".box .module .location_box .location_box_item .picker_location": {
    "width": "90px",
    "height": "100%",
    "fontSize": "28px",
    "color": "#333333",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "module"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "location_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "location_box_item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "picker_location"
        }
      ]
    }
  },
  ".box .module .location_box .location_box_item .down_img": {
    "width": "22px",
    "height": "12px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "module"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "location_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "location_box_item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "down_img"
        }
      ]
    }
  },
  ".box .module .experience_title": {
    "height": "80px",
    "width": "100%",
    "fontSize": "28px",
    "color": "#333333",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "module"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "experience_title"
        }
      ]
    }
  },
  ".box .module .experience_text": {
    "height": "102px",
    "width": "100%",
    "color": "#333333",
    "fontSize": "24px",
    "placeholderColor": "#333333",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "module"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "experience_text"
        }
      ]
    }
  },
  ".box .expectjob .expectjob_list": {
    "height": "196px",
    "width": "100%",
    "display": "flex",
    "justifyContent": "space-between",
    "flexWrap": "wrap",
    "paddingTop": "0px",
    "paddingRight": "30px",
    "paddingBottom": "0px",
    "paddingLeft": "30px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "expectjob"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "expectjob_list"
        }
      ]
    }
  },
  ".box .expectjob .expectjob_list .expectjob_item": {
    "marginTop": "30px",
    "width": "140px",
    "height": "50px",
    "borderRadius": "50px",
    "backgroundColor": "#cccccc",
    "color": "#ffffff",
    "fontSize": "24px",
    "textAlign": "center",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "expectjob"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "expectjob_list"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "expectjob_item"
        }
      ]
    }
  },
  ".box .expectjob .expectjob_list .expectjob_item_active": {
    "backgroundColor": "#37d3cb",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "expectjob"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "expectjob_list"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "expectjob_item_active"
        }
      ]
    }
  },
  ".box .agreement": {
    "height": "100px",
    "width": "100%",
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
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "agreement"
        }
      ]
    }
  },
  ".box .agreement .agreement_icon": {
    "height": "26px",
    "width": "26px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "agreement"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "agreement_icon"
        }
      ]
    }
  },
  ".box .agreement .agreement_text": {
    "fontSize": "24px",
    "color": "#333333",
    "marginLeft": "14px",
    "marginRight": "12px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "agreement"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "agreement_text"
        }
      ]
    }
  },
  ".box .agreement .agreement_a": {
    "fontSize": "24px",
    "color": "#37d3cb",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "agreement"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "agreement_a"
        }
      ]
    }
  },
  ".save_box": {
    "height": "98px",
    "width": "100%",
    "backgroundColor": "#37d3cb",
    "display": "flex",
    "justifyContent": "center",
    "alignItems": "center"
  },
  ".save_box .save_text": {
    "color": "#ffffff",
    "fontSize": "36px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "save_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "save_text"
        }
      ]
    }
  }
}

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(module, exports, $app_require$){'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _resume = __webpack_require__(31);

exports.default = {
    data: {
        token: '',
        headerFile: '',
        realName: '',
        genderlist: ["男", "女"],
        gender: "请选择",
        birthdaytime: '请选择',
        height: '',
        weight: '',
        educationconditionlist: ['在校生', '已毕业'],
        educationcondition: '请选择',
        school: "",
        startschooltime: '请选择',
        educationlist: ['小学', '中学', '高中', '专科', '本科', '硕士', '博士'],
        education: "请选择",
        profession: '',

        oldprovincelist: [],
        newprovincelist: [],
        province: '请选择',
        provinceId: '',

        oldchildrencitylist: [],
        newchildrencitylist: [],
        childrencity: '请选择',
        cityId: '',

        oldarealist: [],
        newarealist: [],
        area: '请选择',
        areaId: '',

        experience: "",
        email: "",
        qq: '',
        mobile: '',

        jobtypeList: [],
        jobTypeId: '',
        ossdata: {},
        resumedata: {}
    },
    onReady: function onReady() {
        this.getProvince();
        this.osstoken();
        this.echoresume();
        this.getmainJobType();
    },
    osstoken: function osstoken() {
        var _this = this;

        (0, _resume.osstoken)().then(function (data) {
            if (!data.code) {
                _this.ossdata = data.dataMap;
            } else {
                _this.$app.$def.prompt.showToast({
                    message: data.msg
                });
            }
        }).catch(function (err) {
            _this.$app.$def.prompt.showToast({
                message: "请检查您的网络"
            });
        });
    },
    getmainJobType: function getmainJobType() {
        var _this2 = this;

        (0, _resume.getmainJobType)().then(function (data) {
            data.dataMap.jobtypeList.map(function (item) {
                if (_this2.jobTypeId.includes(item.value)) {
                    item.flag = true;
                } else {
                    item.flag = false;
                }
            });
            _this2.jobtypeList = data.dataMap.jobtypeList;
        }).catch(function (err) {
            _this2.$app.$def.prompt.showToast({
                message: "请检查您的网络"
            });
        });
    },
    Imageuploading: function Imageuploading() {
        var that = this;
        this.$app.$def.media.pickImage({
            success: function success(data) {
                that.headerFile = data.uri;
            }
        });
    },
    uploadingheadimg: function uploadingheadimg() {
        var that = this;
        console.log(that.headerFile);
        this.$app.$def.request.upload({
            url: 'http://localtestapi.ejzhi.com/oss/uploadFile.do',
            files: [{
                uri: that.headerFile
            }],
            data: [{
                name: 'param1',
                value: 'value1',
                accessid: that.ossdata.accessid,
                expire: that.ossdata.expire,
                fileName: that.ossdata.fileName,
                host: that.ossdata.host,
                policy: that.ossdata.policy,
                signature: that.ossdata.signature
            }],
            success: function success(data) {
                console.log('handling success');
                console.log(data);
            },
            fail: function fail(data, code) {
                console.log('handling fail, code = ' + code);
            }
        });
    },
    realNamechange: function realNamechange(e) {
        this.realName = e.value;
    },
    genderclick: function genderclick(e) {
        this.gender = e.newValue;
    },
    birthdayclick: function birthdayclick(e) {
        this.birthdaytime = e.year + '-' + (e.month + 1) + '-' + e.day;
    },
    heightchange: function heightchange(e) {
        this.height = e.value;
    },
    weightchange: function weightchange(e) {
        this.weight = e.value;
    },
    educationconditionclick: function educationconditionclick(e) {
        this.educationcondition = e.newValue;
    },
    schoolchange: function schoolchange(e) {
        this.school = e.value;
    },
    startschool: function startschool(e) {
        this.startschooltime = e.year;
    },
    professionchange: function professionchange(e) {
        this.profession = e.value;
    },
    educationclick: function educationclick(e) {
        this.education = e.newValue;
    },
    provinceonchange: function provinceonchange(e) {
        console.log(e);
        this.province = e.newValue;
        this.provinceId = this.oldprovincelist[e.newSelected].id;
        this.getChildrenCity();
        this.childrencity = '请选择';
        this.area = '请选择';
        this.newchildrencitylist = [];
        this.newarealist = [];
    },
    childschange: function childschange(e) {
        this.childrencity = e.newValue;
        this.cityId = this.oldchildrencitylist[e.newSelected].id;
        this.getArea();
        this.area = '请选择';
        this.newarealist = [];
    },
    areachange: function areachange(e) {
        this.area = e.newValue;
        this.areaId = this.oldarealist[e.newSelected].id;
    },
    getProvince: function getProvince() {
        var _this3 = this;

        (0, _resume.getProvince)().then(function (data) {
            if (!data.code) {
                var oldprovincelist = data.dataMap.CityList;
                var newprovincelist = [];
                _this3.oldprovincelist = data.dataMap.CityList;
                oldprovincelist.map(function (item) {
                    newprovincelist.push(item.name);
                });
                _this3.newprovincelist = newprovincelist;
            } else {
                _this3.$app.$def.prompt.showToast({
                    message: data.msg
                });
            }
        }).catch(function (err) {
            _this3.$app.$def.prompt.showToast({
                message: "请检查您的网络"
            });
        });
    },
    getChildrenCity: function getChildrenCity() {
        var _this4 = this;

        (0, _resume.getChildrenCity)(this.provinceId).then(function (data) {
            if (!data.code) {
                var oldchildrencitylist = data.dataMap.childsList;
                var newchildrencitylist = [];
                _this4.oldchildrencitylist = oldchildrencitylist;
                oldchildrencitylist.map(function (item) {
                    newchildrencitylist.push(item.name);
                });
                _this4.newchildrencitylist = newchildrencitylist;
            } else {
                _this4.$app.$def.prompt.showToast({
                    message: data.msg
                });
            }
        }).catch(function (err) {
            _this4.$app.$def.prompt.showToast({
                message: "请检查您的网络"
            });
        });
    },
    getArea: function getArea() {
        var _this5 = this;

        (0, _resume.getArea)(this.cityId).then(function (data) {
            if (!data.code) {
                var oldarealist = data.dataMap.childsList;
                var newarealist = [];
                _this5.oldarealist = oldarealist;
                oldarealist.map(function (item) {
                    newarealist.push(item.name);
                });
                _this5.newarealist = newarealist;
            } else {
                _this5.$app.$def.prompt.showToast({
                    message: data.msg
                });
            }
        }).catch(function (err) {
            _this5.$app.$def.prompt.showToast({
                message: "请检查您的网络"
            });
        });
    },
    emailchange: function emailchange(e) {
        this.email = e.value;
    },
    qqchange: function qqchange(e) {
        this.qq = e.value;
    },
    mobilechange: function mobilechange(e) {
        this.mobile = e.value;
    },
    experiencechange: function experiencechange(e) {
        this.experience = e.value;
    },
    expectjobclick: function expectjobclick(index) {
        this.jobtypeList[index].flag = !this.jobtypeList[index].flag;
    },
    echoresume: function echoresume() {
        var that = this;
        this.$app.$def.storage.get({
            key: 'user',
            success: function success(data) {
                that.token = JSON.parse(data).dataMap.token;
            }
        });
        this.$app.$def.storage.get({
            key: 'resumedata',
            success: function success(data) {
                if (data) {
                    var resumedata = JSON.parse(data);
                    that.headerFile = resumedata.headerFile;
                    that.realName = resumedata.realName;
                    that.gender = resumedata.gender ? '男' : '女';
                    that.birthdaytime = that.$app.$def.formatTime(resumedata.birthdayDate, 'Y-M-D');
                    that.height = resumedata.height;
                    that.weight = resumedata.weight;
                    that.educationcondition = resumedata.eduSituation ? "在校生" : "在校生";
                    that.school = resumedata.school;
                    that.startschooltime = that.$app.$def.formatTime(resumedata.startSchool, 'Y');
                    that.education = resumedata.degree;
                    that.profession = resumedata.profession;
                    that.province = resumedata.address.province;
                    that.provinceId = resumedata.provinceId;
                    that.childrencity = resumedata.address.city;
                    that.cityId = resumedata.cityId;
                    that.area = resumedata.address.area;
                    that.areaId = resumedata.areaId;
                    that.email = resumedata.email;
                    that.qq = resumedata.qq;
                    that.mobile = resumedata.mobile;
                    that.experience = resumedata.experience;
                    that.jobTypeId = resumedata.jobtypeids;
                } else {
                    return;
                }
            },
            fail: function fail(data, code) {
                console.log('handling fail, code = ' + code);
            }
        });
    },
    saveclick: function saveclick() {
        var jobtypeIds = [];
        this.jobtypeList.map(function (item) {
            if (item.flag) {
                jobtypeIds.push(item.value);
            } else {
                return;
            }
        });
        var jobTypeId = jobtypeIds.join();
        this.jobTypeId = jobTypeId;
        if (this.headImageName === '') {
            this.$app.$def.prompt.showToast({
                message: "请选择头像"
            });
        } else if (this.realName === '') {
            this.$app.$def.prompt.showToast({
                message: "请填写姓名"
            });
        } else if (this.gender === '') {
            this.$app.$def.prompt.showToast({
                message: "请选择性别"
            });
        } else if (this.birthdaytime === '') {
            this.$app.$def.prompt.showToast({
                message: "请填写生日"
            });
        } else if (this.educationcondition === '') {
            this.$app.$def.prompt.showToast({
                message: "请选择教育情况"
            });
        } else if (this.school === '') {
            this.$app.$def.prompt.showToast({
                message: "请填写学校"
            });
        } else if (this.startschooltime === '') {
            this.$app.$def.prompt.showToast({
                message: "请选择入学时间"
            });
        } else if (this.education === '') {
            this.$app.$def.prompt.showToast({
                message: "请选择学历"
            });
        } else if (this.profession === '') {
            this.$app.$def.prompt.showToast({
                message: "请填写专业"
            });
        } else if (this.province === '请选择') {
            this.$app.$def.prompt.showToast({
                message: "请选择省级城市"
            });
        } else if (this.city === '请选择') {
            this.$app.$def.prompt.showToast({
                message: "请选择市级城市"
            });
        } else if (this.area === '请选择') {
            this.$app.$def.prompt.showToast({
                message: "请选择县级城市"
            });
        } else if (this.mobile === '') {
            this.$app.$def.prompt.showToast({
                message: "请填写电话号码"
            });
        } else if (this.jobTypeId === '') {
            this.$app.$def.prompt.showToast({
                message: "请选择期望职位"
            });
        } else {
            this.editUserInfo();
        }
    },
    editUserInfo: function editUserInfo() {
        var _this6 = this;

        (0, _resume.editUserInfo)({
            token: this.token,
            headImageName: this.headerFile,
            realName: this.realName,
            gender: this.gender === "男" ? "1" : "0",
            birthday: this.birthdaytime,
            height: this.height,
            weight: this.weight,
            eduSituation: this.educationcondition === "在校生" ? "0" : "1",
            school: this.school,
            startSchool: this.startschooltime,
            degree: this.education,
            profession: this.profession,
            provinceId: this.provinceId,
            cityId: this.cityId,
            areaId: this.areaId,
            email: this.email,
            qq: this.qq,
            mobile: this.mobile,
            jobTypeId: this.jobTypeId,
            experience: this.experience
        }).then(function (data) {
            if (!data.code) {
                _this6.updateDegree();
            } else {
                _this6.$app.$def.prompt.showToast({
                    message: data.msg
                });
            }
        }).catch(function (err) {
            _this6.$app.$def.prompt.showToast({
                message: "请检查您的网络"
            });
        });
    },
    updateDegree: function updateDegree() {
        var _this7 = this;

        (0, _resume.updateDegree)(this.token, 0).then(function (data) {
            if (!data.code) {
                _this7.$app.$def.router.replace({
                    uri: '/ResumeShow'
                });
            } else {
                _this7.$app.$def.prompt.showToast({
                    message: data.msg
                });
            }
        }).catch(function (err) {
            _this7.$app.$def.prompt.showToast({
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

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.osstoken = osstoken;
exports.getmainJobType = getmainJobType;
exports.getProvince = getProvince;
exports.getChildrenCity = getChildrenCity;
exports.getArea = getArea;
exports.editUserInfo = editUserInfo;
exports.updateDegree = updateDegree;

var _api = __webpack_require__(0);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function osstoken() {
    return _api2.default.osstoken().then(function (response) {
        return Promise.resolve(JSON.parse(response.data));
    }).catch(function (err) {
        return Promise.reject(err);
    });
}

function getmainJobType() {
    return _api2.default.getmainJobType().then(function (response) {
        return Promise.resolve(JSON.parse(response.data));
    }).catch(function (err) {
        return Promise.reject(err);
    });
}

function getProvince() {
    return _api2.default.getProvince().then(function (response) {
        return Promise.resolve(JSON.parse(response.data));
    }).catch(function (err) {
        return Promise.reject(err);
    });
}

function getChildrenCity(parentId) {
    return _api2.default.getChildrenCity({
        parentId: parentId
    }).then(function (response) {
        return Promise.resolve(JSON.parse(response.data));
    }).catch(function (err) {
        return Promise.reject(err);
    });
}

function getArea(parentId) {
    return _api2.default.getArea({
        parentId: parentId
    }).then(function (response) {
        return Promise.resolve(JSON.parse(response.data));
    }).catch(function (err) {
        return Promise.reject(err);
    });
}

function editUserInfo(editUserInfodata) {
    //修改简历接口
    return _api2.default.editUserInfo(editUserInfodata).then(function (response) {
        return Promise.resolve(JSON.parse(response.data));
    }).catch(function (err) {
        return Promise.reject(err);
    });
}

function updateDegree(token, count) {
    //修改简历完善度
    return _api2.default.updateDegree({
        token: token,
        count: count
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