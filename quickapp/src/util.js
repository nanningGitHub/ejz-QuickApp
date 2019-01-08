
// 时间戳转换开始
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

// 时间戳转换结束



// 跳转简历编辑开始
function intoEditResume() {
  const prompt = require('@system.prompt')
  const router = require('@system.router')
  prompt.showContextMenu({
    itemList: ['保存桌面', '编辑简历', '取消'],
    success: function (ret) {
      switch (ret.index) {
        case 0:
          // 保存桌面
          createShortcut()
          break
        case 1:
          // 编辑简历
          router.replace({
            uri: '/Resume',
          })
          break
        case 2:
          // 取消
          break
        default:
          prompt.showToast({
            message: 'error'
          })
      }
    }
  })

}


// 跳转简历编辑结束

/**
 * 显示菜单
 */
function showMenu() {
  const prompt = require('@system.prompt')
  const router = require('@system.router')
  const appInfo = require('@system.app').getInfo()
  prompt.showContextMenu({
    itemList: ['保存桌面', '关于', '取消', '退出登录'],
    success: function (ret) {
      switch (ret.index) {
        case 0:
          // 保存桌面
          createShortcut()
          break
        case 1:
          // 关于
          router.push({
            uri: '/About',
            params: {
              name: appInfo.name,
              icon: appInfo.icon
            }
          })
          break
        case 2:
          // 取消
          break
        case 3:
          //退出登录
          quit()
          break
        default:
          prompt.showToast({
            message: 'error'
          })
      }
    }
  })
}


/**
 * 创建桌面图标
 * 注意：使用加载器测试`创建桌面快捷方式`功能时，请先在`系统设置`中打开`应用加载器`的`桌面快捷方式`权限
 */
function createShortcut() {
  const prompt = require('@system.prompt')
  const shortcut = require('@system.shortcut')
  shortcut.hasInstalled({
    success: function (ret) {
      if (ret) {
        prompt.showToast({
          message: '已创建桌面图标'
        })
      } else {
        shortcut.install({
          success: function () {
            prompt.showToast({
              message: '成功创建桌面图标'
            })
          },
          fail: function (errmsg, errcode) {
            prompt.showToast({
              message: `${errcode}: ${errmsg}`
            })
          }
        })
      }
    }
  })
}


// 退出登录
function quit() {
  const prompt = require('@system.prompt')

  prompt.showDialog({
    title: '退出登陆',
    buttons: [{
      text: '确定',
      color: '#33dd44'
    }],
    success: function (data) {
      clear()
    },
    cancel: function () {
      console.log('handling cancel')
    },
    fail: function (data, code) {

    }
  })
}
function clear() {
  const router = require('@system.router')
  const storage = require('@system.storage')
  storage.clear({
    success: function (data) {
      router.replace({
        uri: '/Index'
      })
    },
    fail: function (data, code) {

    }
  })
}

export default {
  showMenu,
  createShortcut,
  intoEditResume,
  formatTime,
}
