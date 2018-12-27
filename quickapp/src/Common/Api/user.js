import api from './api'
var storage = require('@system.storage')

export function login(phoneNumber, password) {
    return api.login({
            phoneNumber: phoneNumber,
            password: password
        })
        .then((response) => {
            var value = JSON.parse(response.data)

            if (value.errorCode === -1) {
                Promise.reject(value.errorMsg)
            }
            storage.set({
                key: 'auth',
                Data: response.headers['Set-Cookie'],
                success: function (data) {
                    console.log('cookies保存成功')
                }
            })
            storage.set({
                key: 'user',
                value: value
            })
            storage.set({
                key: 'isLogin',
                value: true
            })
            return Promise.resolve(value)
        }).catch((err) => {
            return Promise.reject('登录失败')
        })
}

export function register(phoneNumber, validateCode, password) {
    return api.register({
            phoneNumber: phoneNumber,
            validateCode: validateCode,
            password: password
        })
        .then((response) => {
            var value = JSON.parse(response.data)
            if (value.errorCode === -1) {
                Promise.reject(value.errorMsg)
            }
           
            return Promise.resolve(value)
        }).catch((err) => {
            return Promise.reject('注册失败')
        })
}

export function forget(phoneNumber, validateCode, password) {
    return api.forget({
            phoneNumber: phoneNumber,
            validateCode: validateCode,
            password: password
        })
        .then((response) => {
            var value = JSON.parse(response.data)
            if (value.errorCode === -1) {
                Promise.reject(value.errorMsg)
            }

            return Promise.resolve(value)
        }).catch((err) => {
            return Promise.reject('注册失败')
        })
}

export function getCode(phoneNumber) {
    return api.getCode({
            phoneNumber: phoneNumber
        })
        .then((response) => {
            var value = JSON.parse(response.data)
            
            if (value.errorCode === -1) {
                Promise.reject(value.errorMsg)
            }
            return Promise.resolve(value)
        }).catch((err) => {
            return Promise.reject('获取失败')
        })
}

export function backCode(phoneNumber) {
    return api.backCode({
            phoneNumber: phoneNumber
        })
        .then((response) => {
            var value = JSON.parse(response.data)
            
            if (value.errorCode === -1) {
                Promise.reject(value.errorMsg)
            }
            return Promise.resolve(value)
        }).catch((err) => {
            return Promise.reject('获取失败')
        })
}