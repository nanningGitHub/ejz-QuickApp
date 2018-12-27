import api from './api'

export function showUserResume(token) {
    return api.showUserResume({
        token: token,
    })
        .then((response) => {
            return Promise.resolve(JSON.parse(response.data))
        }).catch((err) => {
            return Promise.reject(err)
        })
}