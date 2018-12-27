import api from './api'

export function getShangGangJiLu(token, jobId) {   //全部
    return api.getShangGangJiLu({
        token: token,
        jobId: jobId
    })
        .then((response) => {
            return Promise.resolve(JSON.parse(response.data))
        }).catch((err) => {
            return Promise.reject(err)
        })
}