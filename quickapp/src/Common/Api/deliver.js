import api from './api'

export function getJobOfflineList(token, page) {   //全部
    return api.getJobOfflineList({
        token: token,
        page: page
    })
        .then((response) => {
            console.log(JSON.parse(response.data))
            return Promise.resolve(JSON.parse(response.data))
        }).catch((err) => {
            return Promise.reject(err)
        })
}
export function getDaiLuYongList(token, page) {   //待录用
    return api.getDaiLuYongList({
        token: token,
        page: page
    })
        .then((response) => {
            console.log(JSON.parse(response.data))
            return Promise.resolve(JSON.parse(response.data))
        }).catch((err) => {
            return Promise.reject(err)
        })
}

export function deldeliverResume(token, jobOfflineId) {     //取消投递
    return api.deldeliverResume({
        token: token,
        jobOfflineId: jobOfflineId
    })
        .then((response) => {
            console.log(JSON.parse(response.data))
            return Promise.resolve(JSON.parse(response.data))
        }).catch((err) => {
            return Promise.reject(err)
        })
}

export function getDaiShangGangList(token, page) {   //待上岗
    return api.getDaiShangGangList({
        token: token,
        page: page
    })
        .then((response) => {
            console.log(JSON.parse(response.data))
            return Promise.resolve(JSON.parse(response.data))
        }).catch((err) => {
            return Promise.reject(err)
        })
}

export function getDaiJieSuanList(token, page) {   //我的投递-待结算
    return api.getDaiJieSuanList({
        token: token,
        page: page
    })
        .then((response) => {
            console.log(JSON.parse(response.data))
            return Promise.resolve(JSON.parse(response.data))
        }).catch((err) => {
            return Promise.reject(err)
        })
}

export function getYiJieSuanList(token, page) {   //我的投递-已结算
    return api.getYiJieSuanList({
        token: token,
        page: page
    })
        .then((response) => {
            console.log(JSON.parse(response.data))
            return Promise.resolve(JSON.parse(response.data))
        }).catch((err) => {
            return Promise.reject(err)
        })
}