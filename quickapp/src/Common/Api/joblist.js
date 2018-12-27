import api from './api'

export function getJobList(cityId, pageNo, searchkey) {
    return api.getJobList({
            cityId: cityId,
            pageNo: pageNo,
            searchkey: searchkey,
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