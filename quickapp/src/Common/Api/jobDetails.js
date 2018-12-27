import api from './api'

export function getJobDetails(JobOfflineId) {
    return api.getJobDetails({
        JobOfflineId: JobOfflineId
    })
        .then((response) => {
            return Promise.resolve(JSON.parse(response.data))
        }).catch((err) => {
            return Promise.reject(err)
        })
}

export function getEnterprise(enterpriseId) {
    return api.getEnterprise({
        enterpriseId: enterpriseId
    })
        .then((response) => {
            return Promise.resolve(JSON.parse(response.data))
        }).catch((err) => {
            return Promise.reject(err)
        })
}

export function deliver(token, jobOfflineId) {
    return api.deliver({
        token: token,
        jobOfflineId: jobOfflineId
    })
        .then((response) => {
            return Promise.resolve(JSON.parse(response.data))
        }).catch((err) => {
            return Promise.reject(err)
        })
}

export function getisdeliver(token, jobOfflineId) {   //查询用户是否投递了简历接口
    return api.getisdeliver({
        token: token,
        jobOfflineId: jobOfflineId
    })
        .then((response) => {
            return Promise.resolve(JSON.parse(response.data))
        }).catch((err) => {
            return Promise.reject(err)
        })
}
