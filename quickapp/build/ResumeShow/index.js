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
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
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

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

var $app_template$ = __webpack_require__(33)
var $app_style$ = __webpack_require__(34)
var $app_script$ = __webpack_require__(35)

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

/***/ 33:
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
            "basic",
            "module"
          ],
          "children": [
            {
              "type": "image",
              "attr": {
                "src": function () {return this.userResume.headerFile}
              },
              "classList": [
                "head"
              ]
            },
            {
              "type": "div",
              "attr": {},
              "classList": [
                "basic_box"
              ],
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": function () {return this.userResume.realName}
                  },
                  "classList": [
                    "name_text"
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "basic_box_basic"
                  ],
                  "children": [
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "basic_box_basic_top"
                      ],
                      "children": [
                        {
                          "type": "div",
                          "attr": {},
                          "classList": [
                            "basic_box_basic_left"
                          ],
                          "children": [
                            {
                              "type": "text",
                              "attr": {
                                "value": "性别："
                              },
                              "classList": [
                                "basic_box_basic_title"
                              ]
                            },
                            {
                              "type": "text",
                              "attr": {
                                "value": function () {return this.userResume.gender?'男':'女'}
                              },
                              "classList": [
                                "basic_box_basic_text"
                              ]
                            }
                          ]
                        },
                        {
                          "type": "div",
                          "attr": {},
                          "classList": [
                            "basic_box_basic_right"
                          ],
                          "children": [
                            {
                              "type": "text",
                              "attr": {
                                "value": "身高："
                              },
                              "classList": [
                                "basic_box_basic_title"
                              ]
                            },
                            {
                              "type": "text",
                              "attr": {
                                "value": function () {return (this.userResume.height) + 'cm'}
                              },
                              "classList": [
                                "basic_box_basic_text"
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
                        "basic_box_basic_bottom"
                      ],
                      "children": [
                        {
                          "type": "div",
                          "attr": {},
                          "classList": [
                            "basic_box_basic_left"
                          ],
                          "children": [
                            {
                              "type": "text",
                              "attr": {
                                "value": "年龄："
                              },
                              "classList": [
                                "basic_box_basic_title"
                              ]
                            },
                            {
                              "type": "text",
                              "attr": {
                                "value": function () {return this.userResume.age}
                              },
                              "classList": [
                                "basic_box_basic_text"
                              ]
                            }
                          ]
                        },
                        {
                          "type": "div",
                          "attr": {},
                          "classList": [
                            "basic_box_basic_right"
                          ],
                          "children": [
                            {
                              "type": "text",
                              "attr": {
                                "value": "体重："
                              },
                              "classList": [
                                "basic_box_basic_title"
                              ]
                            },
                            {
                              "type": "text",
                              "attr": {
                                "value": function () {return (this.userResume.weight) + 'kg'}
                              },
                              "classList": [
                                "basic_box_basic_text"
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
                "module_title"
              ],
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "module_title_icon"
                  ]
                },
                {
                  "type": "text",
                  "attr": {
                    "value": "学历信息"
                  },
                  "classList": [
                    "module_title_text"
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
                "module_content"
              ],
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "module_item"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "教育情况："
                      },
                      "classList": [
                        "item_title"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return this.userResume.eduSituation?'已毕业':'未毕业'}
                      },
                      "classList": [
                        "item_text"
                      ]
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "module_item"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "毕业学校："
                      },
                      "classList": [
                        "item_title"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return this.userResume.school}
                      },
                      "classList": [
                        "item_text"
                      ]
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "module_item"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "入学年份："
                      },
                      "classList": [
                        "item_title"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return (this.userResume.startSchool) + '年'}
                      },
                      "classList": [
                        "item_text"
                      ]
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "module_item"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "学历："
                      },
                      "classList": [
                        "item_title"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return this.userResume.degree}
                      },
                      "classList": [
                        "item_text"
                      ]
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "module_item"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "专业："
                      },
                      "classList": [
                        "item_title"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return this.userResume.profession}
                      },
                      "classList": [
                        "item_text"
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
            "site",
            "module"
          ],
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": [
                "module_title"
              ],
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "module_title_icon"
                  ]
                },
                {
                  "type": "text",
                  "attr": {
                    "value": "求职意向"
                  },
                  "classList": [
                    "module_title_text"
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
                "module_content"
              ],
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "module_item"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "期望职位："
                      },
                      "classList": [
                        "item_title"
                      ]
                    },
                    {
                      "type": "div",
                      "attr": {},
                      "style": {
                        "width": "500px",
                        "display": "flex",
                        "flexWrap": "wrap"
                      },
                      "children": [
                        {
                          "type": "text",
                          "attr": {
                            "value": function () {return this.$item}
                          },
                          "classList": [
                            "item_text"
                          ],
                          "repeat": function () {return this.userResume.jobIntent}
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "module_item"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "期望地区："
                      },
                      "classList": [
                        "item_title"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return (this.address.province) + (this.address.city) + (this.address.area)}
                      },
                      "classList": [
                        "item_text"
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
            "contact",
            "module"
          ],
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": [
                "module_title"
              ],
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "module_title_icon"
                  ]
                },
                {
                  "type": "text",
                  "attr": {
                    "value": "联系方式"
                  },
                  "classList": [
                    "module_title_text"
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
                "module_content"
              ],
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "module_item"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "电话："
                      },
                      "classList": [
                        "item_title"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return this.userResume.mobile}
                      },
                      "classList": [
                        "item_text"
                      ]
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "module_item"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "邮箱："
                      },
                      "classList": [
                        "item_title"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return this.userResume.email}
                      },
                      "classList": [
                        "item_text"
                      ]
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "module_item"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "Q Q："
                      },
                      "classList": [
                        "item_title"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return this.userResume.qq}
                      },
                      "classList": [
                        "item_text"
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

/***/ 34:
/***/ (function(module, exports) {

module.exports = {
  ".page .flex_page": {
    "width": "100%",
    "flexDirection": "column",
    "backgroundColor": "#f2f8ff",
    "paddingTop": "16px",
    "paddingRight": "12px",
    "paddingBottom": "40px",
    "paddingLeft": "12px",
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
  ".basic": {
    "marginBottom": "16px",
    "height": "210px",
    "alignItems": "center"
  },
  ".education": {
    "flexDirection": "column",
    "marginBottom": "16px"
  },
  ".site": {
    "flexDirection": "column",
    "marginBottom": "16px"
  },
  ".contact": {
    "flexDirection": "column"
  },
  ".education .module_title_icon": {
    "backgroundImage": "/ResumeShow/img/education_icon.png",
    "backgroundSize": "30px 34px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "education"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "module_title_icon"
        }
      ]
    }
  },
  ".site .module_title_icon": {
    "backgroundImage": "/ResumeShow/img/site_icon.png",
    "backgroundSize": "34px 33px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "site"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "module_title_icon"
        }
      ]
    }
  },
  ".contact .module_title_icon": {
    "backgroundImage": "/ResumeShow/img/contact_icon.png",
    "backgroundSize": "29px 37px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "contact"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "module_title_icon"
        }
      ]
    }
  },
  ".education .module_content": {
    "height": "340px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "education"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "module_content"
        }
      ]
    }
  },
  ".contact .module_content": {
    "height": "224px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "contact"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "module_content"
        }
      ]
    }
  },
  ".module": {
    "width": "100%",
    "backgroundColor": "#ffffff",
    "borderRadius": "10px"
  },
  ".module .head": {
    "width": "143px",
    "height": "143px",
    "borderRadius": "72.5px",
    "marginLeft": "32px",
    "marginRight": "38px",
    "_meta": {
      "ruleDef": [
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
          "v": "head"
        }
      ]
    }
  },
  ".module .basic_box": {
    "width": "500px",
    "height": "144px",
    "flexDirection": "column",
    "justifyContent": "space-between",
    "_meta": {
      "ruleDef": [
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
          "v": "basic_box"
        }
      ]
    }
  },
  ".module .basic_box .name_text": {
    "fontSize": "30px",
    "color": "#333333",
    "_meta": {
      "ruleDef": [
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
          "v": "basic_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "name_text"
        }
      ]
    }
  },
  ".module .basic_box .basic_box_basic": {
    "width": "500px",
    "height": "84px",
    "flexDirection": "column",
    "justifyContent": "space-between",
    "_meta": {
      "ruleDef": [
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
          "v": "basic_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic"
        }
      ]
    }
  },
  ".module .basic_box .basic_box_basic .basic_box_basic_top": {
    "alignItems": "center",
    "_meta": {
      "ruleDef": [
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
          "v": "basic_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_top"
        }
      ]
    }
  },
  ".module .basic_box .basic_box_basic .basic_box_basic_bottom": {
    "alignItems": "center",
    "_meta": {
      "ruleDef": [
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
          "v": "basic_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_bottom"
        }
      ]
    }
  },
  ".module .basic_box .basic_box_basic .basic_box_basic_top .basic_box_basic_left": {
    "width": "250px",
    "_meta": {
      "ruleDef": [
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
          "v": "basic_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_top"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_left"
        }
      ]
    }
  },
  ".module .basic_box .basic_box_basic .basic_box_basic_bottom .basic_box_basic_left": {
    "width": "250px",
    "_meta": {
      "ruleDef": [
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
          "v": "basic_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_bottom"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_left"
        }
      ]
    }
  },
  ".module .basic_box .basic_box_basic .basic_box_basic_top .basic_box_basic_right": {
    "width": "250px",
    "_meta": {
      "ruleDef": [
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
          "v": "basic_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_top"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_right"
        }
      ]
    }
  },
  ".module .basic_box .basic_box_basic .basic_box_basic_bottom .basic_box_basic_right": {
    "width": "250px",
    "_meta": {
      "ruleDef": [
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
          "v": "basic_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_bottom"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_right"
        }
      ]
    }
  },
  ".module .basic_box .basic_box_basic .basic_box_basic_top .basic_box_basic_left .basic_box_basic_title": {
    "fontSize": "28px",
    "color": "#333333",
    "_meta": {
      "ruleDef": [
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
          "v": "basic_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_top"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_left"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_title"
        }
      ]
    }
  },
  ".module .basic_box .basic_box_basic .basic_box_basic_bottom .basic_box_basic_left .basic_box_basic_title": {
    "fontSize": "28px",
    "color": "#333333",
    "_meta": {
      "ruleDef": [
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
          "v": "basic_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_bottom"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_left"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_title"
        }
      ]
    }
  },
  ".module .basic_box .basic_box_basic .basic_box_basic_top .basic_box_basic_right .basic_box_basic_title": {
    "fontSize": "28px",
    "color": "#333333",
    "_meta": {
      "ruleDef": [
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
          "v": "basic_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_top"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_right"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_title"
        }
      ]
    }
  },
  ".module .basic_box .basic_box_basic .basic_box_basic_bottom .basic_box_basic_right .basic_box_basic_title": {
    "fontSize": "28px",
    "color": "#333333",
    "_meta": {
      "ruleDef": [
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
          "v": "basic_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_bottom"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_right"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_title"
        }
      ]
    }
  },
  ".module .basic_box .basic_box_basic .basic_box_basic_top .basic_box_basic_left .basic_box_basic_text": {
    "fontSize": "28px",
    "color": "#37d3cb",
    "_meta": {
      "ruleDef": [
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
          "v": "basic_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_top"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_left"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_text"
        }
      ]
    }
  },
  ".module .basic_box .basic_box_basic .basic_box_basic_bottom .basic_box_basic_left .basic_box_basic_text": {
    "fontSize": "28px",
    "color": "#37d3cb",
    "_meta": {
      "ruleDef": [
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
          "v": "basic_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_bottom"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_left"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_text"
        }
      ]
    }
  },
  ".module .basic_box .basic_box_basic .basic_box_basic_top .basic_box_basic_right .basic_box_basic_text": {
    "fontSize": "28px",
    "color": "#37d3cb",
    "_meta": {
      "ruleDef": [
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
          "v": "basic_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_top"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_right"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_text"
        }
      ]
    }
  },
  ".module .basic_box .basic_box_basic .basic_box_basic_bottom .basic_box_basic_right .basic_box_basic_text": {
    "fontSize": "28px",
    "color": "#37d3cb",
    "_meta": {
      "ruleDef": [
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
          "v": "basic_box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_bottom"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_right"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "basic_box_basic_text"
        }
      ]
    }
  },
  ".module .module_title": {
    "height": "82px",
    "alignItems": "center",
    "paddingLeft": "25px",
    "_meta": {
      "ruleDef": [
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
          "v": "module_title"
        }
      ]
    }
  },
  ".module .module_title .module_title_icon": {
    "marginRight": "14px",
    "width": "34px",
    "height": "38px",
    "backgroundPosition": "center",
    "backgroundRepeat": "no-repeat",
    "_meta": {
      "ruleDef": [
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
          "v": "module_title"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "module_title_icon"
        }
      ]
    }
  },
  ".module .module_title .module_title_text": {
    "fontSize": "28px",
    "color": "#282828",
    "_meta": {
      "ruleDef": [
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
          "v": "module_title"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "module_title_text"
        }
      ]
    }
  },
  ".module .line": {
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
          "v": "line"
        }
      ]
    }
  },
  ".module .module_content": {
    "flexDirection": "column",
    "justifyContent": "space-between",
    "paddingTop": "38px",
    "paddingRight": "40px",
    "paddingBottom": "38px",
    "paddingLeft": "40px",
    "_meta": {
      "ruleDef": [
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
          "v": "module_content"
        }
      ]
    }
  },
  ".module .module_content .module_item": {
    "alignItems": "flex-start",
    "_meta": {
      "ruleDef": [
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
          "v": "module_content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "module_item"
        }
      ]
    }
  },
  ".module .module_content .module_item .item_title": {
    "fontSize": "28px",
    "color": "#bbbbbb",
    "_meta": {
      "ruleDef": [
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
          "v": "module_content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "module_item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "item_title"
        }
      ]
    }
  },
  ".module .module_content .module_item .item_text": {
    "fontSize": "28px",
    "color": "#333333",
    "_meta": {
      "ruleDef": [
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
          "v": "module_content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "module_item"
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
  }
}

/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(module, exports, $app_require$){'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _resumeShow = __webpack_require__(36);

exports.default = {
    data: {
        userResume: {},
        address: {}
    },
    onShow: function onShow() {
        var that = this;
        this.$app.$def.storage.get({
            key: 'user',
            success: function success(data) {
                var token = JSON.parse(data).dataMap.token;
                that.showUserResume(token);
            },
            fail: function fail(data, code) {
                console.log(data);
            }
        });
    },
    onMenuPress: function onMenuPress() {
        this.$app.$def.intoEditResume();
    },
    showUserResume: function showUserResume(token) {
        var _this = this;

        (0, _resumeShow.showUserResume)(token).then(function (data) {
            if (data.code !== 0) {
                _this.$app.$def.prompt.showToast({
                    message: data.msg
                });
            } else {
                console.log(data.dataMap.userResume);
                _this.userResume = data.dataMap.userResume;
                _this.address = data.dataMap.userResume.address;
                _this.setresume();
            }
        }).catch(function (err) {
            _this.$app.$def.prompt.showToast({
                message: "请检查您的网络"
            });
        });
    },
    setresume: function setresume() {
        this.$app.$def.storage.set({
            key: 'resumedata',
            value: this.userResume,
            success: function success(data) {
                console.log('handling success');
            },
            fail: function fail(data, code) {
                console.log('handling fail, code = ' + code);
            }
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

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.showUserResume = showUserResume;

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