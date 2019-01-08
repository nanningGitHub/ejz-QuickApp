var fetch = require('@system.fetch')
var storage = require('@system.storage')

var API_ROOT = 'http://openapi.ejzhi.com/'
// var API_ROOT = 'http://localtestapi.ejzhi.com/'
var headers = {}

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
    return new Promise((resolve, reject) => {
        storage.get({
            key: 'auth',
            success: function (data) {
                headers.Cookie = data
                resolve(true)
            },
            fail: function (data, code) {
                resolve(false)
            }
        })
    })
}

function realFetch(url, data = null, method = 'get') {
    console.log('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('┃ url: ', API_ROOT + url)
    console.log('┃ method: ', method)
    console.log('┃ data: ', JSON.stringify(data))
    console.log('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

    return new Promise((resolve, reject) => {
        fetch.fetch({
            url: API_ROOT + url,
            data: data,
            header: headers,
            method: method,
            success: function (data) {
                resolve(data)
            },
            fail: function (data, code) {
                reject(data)
            }
        })
    })
}



function withAuth(url, data = null, method = 'get', canSkip = false) {
    return getAuth().then((auth) => {
        if (auth || canSkip) {
            return realFetch(url, data, method)
        } else {
            return new Promise((resolve, reject) => {
                reject('请先登录！')
            })
        }
    })
}


function post(url, data = null, config = {}) {
    if (config.withAuth) {
        return withAuth(url, data, 'post', config.canSkip)
    } else {
        return realFetch(url, data, 'post')
    }
}

function get(url, data = null, config = {}) {
    if (config.withAuth) {
        return withAuth(url, data, 'get', config.canSkip)
    } else {
        return realFetch(url, data, 'get')
    }
}

export default {


    //登录    
    login(params) {
        return get('api/user/login.do', params)
    },

    // 注册获取验证码
    getCode(params) {
        return get('api/user/sendRegisterSMS.do', params)
    },

    // 注册
    register(params) {
        return get('api/user/register.do', params)
    },

    // 找回密码验证码
    backCode(params) {
        return get('api/user/sendFindBackSMS.do', params)
    },

    // 忘记密码 
    forget(params) {
        return get('api/user/findPassword.do', params)
    },

    // 线下兼职筛选接口
    getJobList(params) {
        return get('api/job/offline/getList.do', params)
    },

    // 线下兼职详情
    getJobDetails(params) {
        return get('api/job/offline/getSingle.do', params)
    },

    //  查询用户是否投递过简历接口
    getisdeliver(params) {
        return get('api/job/offline/getisdeliver.do', params)
    },

    // 线下兼职详情 --进行投递接口
    deliver(params) {
        return get('api/job/offline/deliverResume.do', params)
    },


    // 线下兼职企业信息
    getEnterprise(params) {
        return get('api/enterprise/getEnterprise.do', params)
    },

    // 搜索页面-> 猜你想要
    gethotWords(params) {
        return get('api/job/offline/getHotWord.do', params)
    },

    // 城市页面-> 热门城市
    gethotCitys(params) {
        return get('api/city/getHotCity.do', params)
    },

    // 城市页面-> 所有城市
    getCitys(params) {
        return get('api/city/getCitysForGPS.do', params)
    },

    //   首页获取 定位城市名字   
    getCityName(params) {
        return post('god/map/getCityName.do', params)
    },

    // 我的页面 用户个人简历展示
    showUserResume(params) {
        return get('api/user/showUserResume.do', params)
    },

    // 我的页面 -实时数据展示
    getData(params) {
        return get('api/user/getData.do', params)
    },



    // 我的投递 -全部
    getJobOfflineList(params) {
        return get('api/jobRequest/getJobOfflineList.do', params)
    },

    //我的投递 -待录用
    getDaiLuYongList(params) {
        return get('api/jobRequest/getDaiLuYongList.do', params)
    },

    // 我的投递 - 取消投递
    deldeliverResume(params) {
        return post('api/job/offline/deldeliverResume.do', params)
    },

    // 我的投递 ——待上岗
    getDaiShangGangList(params) {
        return get('api/jobRequest/getDaiShangGangList.do', params)
    },

    // .我的-我的投递-待结算
    getDaiJieSuanList(params) {
        return get('api/jobRequest/getDaiJieSuanList.do', params)
    },

    // 我的-我的投递-已结算
    getYiJieSuanList(params) {
        return get('api/jobRequest/getYiJieSuanList.do', params)
    },

    // 投递信息-投递详情
    getShangGangJiLu(params) {
        return get('api/jobRequest/getShangGangJiLu.do', params)
    },

    // 编辑简历 -- 获取阿里上传token接口
    osstoken(params) {
        return get('ali/osstoken.do', params)
    },

    // 编辑简历 -- 获取职位值类型兼职列表接口
    getmainJobType(params) {
        return get('api/job/offline/mainJobType.do', params)
    },

    //编辑简历 -- 获取省级城市
    getProvince(params) {
        return get('api/city/getProvince.do', params)
    },

    // 编辑简历 --获取市级城市接口
    getChildrenCity(params) {
        return get('api/city/getChildrenCity.do', params)
    },

    // 编辑简历 -- 获取区域城市接口
    getArea(params) {
        return get('api/city/getArea.do', params)
    },

    // 编辑简历 -- app修改用户简历接口 
    editUserInfo(params) {
        return post('api/user/editUserInfo.do', params)
    },

    // 上传生活照后修改简历完善度(备:在上传生活照code值为0时调用)
    updateDegree(params) {
        return post('api/user/updateDegree.do', params)
    },


    /**
     * 获取收藏文章列表
     */
    getCollectArticle(page) {
        return get('lg/collect/list/' + page + '/json', null, {
            withAuth: true
        })
    },
    /**
     * 收藏站内文章
     */
    collectArticle(id) {
        return post('lg/collect/' + id + '/json', null, {
            withAuth: true
        })
    },
    /**
     * 收藏站外文章
     */
    collectArticleAdd(params) {
        return post('lg/collect/add/json', params, {
            withAuth: true
        })
    },
    /**
     * 从文章列表取消收藏
     */
    uncollectArticle(id) {
        return post('lg/uncollect_originId/' + id + '/json', null, {
            withAuth: true
        })
    },
    /**
     * 从收藏列表取消收藏
     */
    uncollect(id, originId) {
        return post('lg/uncollect/' + id + '/json', {
            originId: originId
        }, {
                withAuth: true
            })
    },
    /**
     * 获取收藏网站列表
     */
    getCollectWeb() {
        return get('lg/collect/usertools/json', null, {
            withAuth: true
        })
    },
    /**
     * 收藏网站
     */
    collectWeb(params) {
        return post('lg/collect/addtool/json', params, {
            withAuth: true
        })
    },
    /**
     * 编辑收藏的网址
     */
    editCollectWeb(params) {
        return post('lg/collect/updatetool/json', params, {
            withAuth: true
        })
    },
    /**
     * 删除收藏的网址
     */
    deleteCollectWeb(id) {
        return post('lg/collect/deletetool/json', {
            id: id
        }, {
                withAuth: true
            })
    }
}