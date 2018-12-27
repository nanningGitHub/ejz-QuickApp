import api from './api'

// export function getJobList() {
//     return api.getJobList()
//         .then((response) => {
//             return Promise.resolve(JSON.parse(response.data).data)
//         }).catch((err) => {
//             return Promise.reject(err)
//         })
// }

export function getCityName(LngitudeAndLatitude) {
    return api.getCityName({
            point: LngitudeAndLatitude
        })
        .then((response) => {
            return Promise.resolve(JSON.parse(response.data))
        }).catch((err) => {
            return Promise.reject(err)
        })
}
// export function getArticleByClassify(page = 0, cid) {
//     return api.getArticleByClassify(page, cid)
//         .then((response) => {
//             return Promise.resolve(JSON.parse(response.data).data)
//         }).catch((err) => {
//             return Promise.reject(err)
//         })
// }