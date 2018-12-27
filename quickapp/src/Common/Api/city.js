import api from './api'

export function gethotCitys() {
    return api.gethotCitys()
        .then((response) => {
            return Promise.resolve(JSON.parse(response.data))
        }).catch((err) => {
            return Promise.reject(err)
        })
}

export function getCitys(keyname) {
    return api.getCitys({
            keyname: keyname
        })
        .then((response) => {
            return Promise.resolve(JSON.parse(response.data))
        }).catch((err) => {
            return Promise.reject(err)
        })
}