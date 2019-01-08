(function(){
  
  var createAppHandler = function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var $app_script$ = __webpack_require__(5)

$app_define$('@app-application/app', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
})

$app_bootstrap$('@app-application/app',{ packagerVersion: '0.0.5'})


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(module, exports, $app_require$){'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(6);

var _util2 = _interopRequireDefault(_util);

var _system = $app_require$('@app-module/system.clipboard');

var _system2 = _interopRequireDefault(_system);

var _system3 = $app_require$('@app-module/system.prompt');

var _system4 = _interopRequireDefault(_system3);

var _system5 = $app_require$('@app-module/system.router');

var _system6 = _interopRequireDefault(_system5);

var _system7 = $app_require$('@app-module/system.storage');

var _system8 = _interopRequireDefault(_system7);

var _system9 = $app_require$('@app-module/system.share');

var _system10 = _interopRequireDefault(_system9);

var _system11 = $app_require$('@app-module/system.geolocation');

var _system12 = _interopRequireDefault(_system11);

var _system13 = $app_require$('@app-module/system.media');

var _system14 = _interopRequireDefault(_system13);

var _system15 = $app_require$('@app-module/system.request');

var _system16 = _interopRequireDefault(_system15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  clipboard: _system2.default,
  prompt: _system4.default,
  router: _system6.default,
  storage: _system8.default,
  share: _system10.default,
  geolocation: _system12.default,
  media: _system14.default,
  request: _system16.default,
  showMenu: _util2.default.showMenu,
  intoEditResume: _util2.default.intoEditResume,
  createShortcut: _util2.default.createShortcut,
  formatTime: _util2.default.formatTime,
  refresh: true
};
(exports.default || module.exports).manifest = {"package":"com.application.ejianzhi","name":"e兼职求职版","versionName":"1.0.2","versionCode":10,"minPlatformVersion":1000,"icon":"/Common/Image/logo.png","features":[{"name":"system.prompt"},{"name":"system.router"},{"name":"system.shortcut"},{"name":"system.fetch"},{"name":"system.webview"},{"name":"system.storage"},{"name":"system.clipboard"},{"name":"system.share"},{"name":"system.geolocation"},{"name":"system.media"},{"name":"system.request"}],"permissions":[{"origin":"*"}],"config":{"logLevel":"debug"},"router":{"entry":"Index","pages":{"Index":{"component":"index"},"JobDetails":{"component":"index"},"Search":{"component":"index"},"My":{"component":"index"},"Resume":{"component":"index"},"ResumeShow":{"component":"index"},"Deliver":{"component":"index"},"ApplyDetails":{"component":"index"},"Login":{"component":"index"},"Register":{"component":"index"},"Protocol":{"component":"index"},"Forget":{"component":"index"},"About":{"component":"index"},"City":{"component":"index"}}},"display":{"titleBarBackgroundColor":"#37d3cb","titleBarTextColor":"#ffffff","menu":true,"pages":{"Index":{"titleBarText":"e兼职","menu":false},"My":{"titleBarText":"e兼职","menu":true},"Deliver":{"titleBarText":"我的投递","menu":false},"ApplyDetails":{"titleBarText":"投递详情","menu":false},"JobDetails":{"titleBarText":"兼职详情","menu":false},"Login":{"titleBarText":"登录","menu":false},"Forget":{"titleBarText":"忘记密码","menu":false},"Register":{"titleBarText":"注册","menu":false},"Protocol":{"titleBarText":"用户协议","menu":false},"City":{"titleBarText":"切换城市","menu":false},"Search":{"titleBarText":"搜索","menu":false}}}};
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatTime = formatTime;

// 时间戳转换开始
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

// 时间戳转换结束


// 跳转简历编辑开始
function intoEditResume() {
  var prompt = $app_require$('@app-module/system.prompt');
  var router = $app_require$('@app-module/system.router');
  prompt.showContextMenu({
    itemList: ['保存桌面', '编辑简历', '取消'],
    success: function success(ret) {
      switch (ret.index) {
        case 0:
          // 保存桌面
          createShortcut();
          break;
        case 1:
          // 编辑简历
          router.replace({
            uri: '/Resume'
          });
          break;
        case 2:
          // 取消
          break;
        default:
          prompt.showToast({
            message: 'error'
          });
      }
    }
  });
}

// 跳转简历编辑结束

/**
 * 显示菜单
 */
function showMenu() {
  var prompt = $app_require$('@app-module/system.prompt');
  var router = $app_require$('@app-module/system.router');
  var appInfo = $app_require$('@app-module/system.app').getInfo();
  prompt.showContextMenu({
    itemList: ['保存桌面', '关于', '取消', '退出登录'],
    success: function success(ret) {
      switch (ret.index) {
        case 0:
          // 保存桌面
          createShortcut();
          break;
        case 1:
          // 关于
          router.push({
            uri: '/About',
            params: {
              name: appInfo.name,
              icon: appInfo.icon
            }
          });
          break;
        case 2:
          // 取消
          break;
        case 3:
          //退出登录
          quit();
          break;
        default:
          prompt.showToast({
            message: 'error'
          });
      }
    }
  });
}

/**
 * 创建桌面图标
 * 注意：使用加载器测试`创建桌面快捷方式`功能时，请先在`系统设置`中打开`应用加载器`的`桌面快捷方式`权限
 */
function createShortcut() {
  var prompt = $app_require$('@app-module/system.prompt');
  var shortcut = $app_require$('@app-module/system.shortcut');
  shortcut.hasInstalled({
    success: function success(ret) {
      if (ret) {
        prompt.showToast({
          message: '已创建桌面图标'
        });
      } else {
        shortcut.install({
          success: function success() {
            prompt.showToast({
              message: '成功创建桌面图标'
            });
          },
          fail: function fail(errmsg, errcode) {
            prompt.showToast({
              message: errcode + ': ' + errmsg
            });
          }
        });
      }
    }
  });
}

// 退出登录
function quit() {
  var prompt = $app_require$('@app-module/system.prompt');

  prompt.showDialog({
    title: '退出登陆',
    buttons: [{
      text: '确定',
      color: '#33dd44'
    }],
    success: function success(data) {
      clear();
    },
    cancel: function cancel() {
      console.log('handling cancel');
    },
    fail: function fail(data, code) {}
  });
}
function clear() {
  var router = $app_require$('@app-module/system.router');
  var storage = $app_require$('@app-module/system.storage');
  storage.clear({
    success: function success(data) {
      router.replace({
        uri: '/Index'
      });
    },
    fail: function fail(data, code) {}
  });
}

exports.default = {
  showMenu: showMenu,
  createShortcut: createShortcut,
  intoEditResume: intoEditResume,
  formatTime: formatTime
};

/***/ })
/******/ ]);
  };
  if (typeof window === "undefined") {
    return createAppHandler();
  }
  else {
    window.createAppHandler = createAppHandler
    // H5注入manifest以获取features
    global.manifest = {"package":"com.application.ejianzhi","name":"e兼职求职版","versionName":"1.0.2","versionCode":10,"minPlatformVersion":1000,"icon":"/Common/Image/logo.png","features":[{"name":"system.prompt"},{"name":"system.router"},{"name":"system.shortcut"},{"name":"system.fetch"},{"name":"system.webview"},{"name":"system.storage"},{"name":"system.clipboard"},{"name":"system.share"},{"name":"system.geolocation"},{"name":"system.media"},{"name":"system.request"}],"permissions":[{"origin":"*"}],"config":{"logLevel":"debug"},"router":{"entry":"Index","pages":{"Index":{"component":"index"},"JobDetails":{"component":"index"},"Search":{"component":"index"},"My":{"component":"index"},"Resume":{"component":"index"},"ResumeShow":{"component":"index"},"Deliver":{"component":"index"},"ApplyDetails":{"component":"index"},"Login":{"component":"index"},"Register":{"component":"index"},"Protocol":{"component":"index"},"Forget":{"component":"index"},"About":{"component":"index"},"City":{"component":"index"}}},"display":{"titleBarBackgroundColor":"#37d3cb","titleBarTextColor":"#ffffff","menu":true,"pages":{"Index":{"titleBarText":"e兼职","menu":false},"My":{"titleBarText":"e兼职","menu":true},"Deliver":{"titleBarText":"我的投递","menu":false},"ApplyDetails":{"titleBarText":"投递详情","menu":false},"JobDetails":{"titleBarText":"兼职详情","menu":false},"Login":{"titleBarText":"登录","menu":false},"Forget":{"titleBarText":"忘记密码","menu":false},"Register":{"titleBarText":"注册","menu":false},"Protocol":{"titleBarText":"用户协议","menu":false},"City":{"titleBarText":"切换城市","menu":false},"Search":{"titleBarText":"搜索","menu":false}}}};
  }
})();
//# sourceMappingURL=app.js.map