import api from './api'

export function gethotWords() {
    return api.gethotWords()
        .then((response) => {
            return Promise.resolve(JSON.parse(response.data))
        }).catch((err) => {
            return Promise.reject(err)
        })
}