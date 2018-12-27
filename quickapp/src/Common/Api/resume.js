import api from './api'

export function osstoken() {
    return api.osstoken()
        .then((response) => {
            return Promise.resolve(JSON.parse(response.data))
        }).catch((err) => {
            return Promise.reject(err)
        })
}


export function getmainJobType() {
    return api.getmainJobType()
        .then((response) => {
            return Promise.resolve(JSON.parse(response.data))
        }).catch((err) => {
            return Promise.reject(err)
        })
}


export function getProvince() {
    return api.getProvince()
        .then((response) => {
            return Promise.resolve(JSON.parse(response.data))
        }).catch((err) => {
            return Promise.reject(err)
        })
}

export function getChildrenCity(parentId) {
    return api.getChildrenCity({
        parentId: parentId,
    })
        .then((response) => {
            return Promise.resolve(JSON.parse(response.data))
        }).catch((err) => {
            return Promise.reject(err)
        })
}

export function getArea(parentId) {
    return api.getArea({
        parentId: parentId,
    })
        .then((response) => {
            return Promise.resolve(JSON.parse(response.data))
        }).catch((err) => {
            return Promise.reject(err)
        })
}

export function editUserInfo(editUserInfodata) {   //修改简历接口
    return api.editUserInfo(editUserInfodata)
        .then((response) => {
            return Promise.resolve(JSON.parse(response.data))
        }).catch((err) => {
            return Promise.reject(err)
        })
}

export function updateDegree(token, count) {   //修改简历完善度
    return api.updateDegree({
        token: token,
        count: count
    })
        .then((response) => {
            return Promise.resolve(JSON.parse(response.data))
        }).catch((err) => {
            return Promise.reject(err)
        })
}