import axios from 'axios'

export default () => {
    const urlBase = 'http://localhost:3333/api/v1/'

    return {
        get,
        post,
        put,
        del
    }

    function get(url, config = {}) {
        return axios.get(urlBase + url, config).then(res => {
            if (res.status === 200) {
                return res.data.data
            }
        })
    }

    function post(url, payload) {
        return axios.post(urlBase + url, payload).then(res => {
            if (res.status === 201) {
                return res.data.data
            }
        })
    }
    function put() {}
    function del(url) {
        return axios.delete(urlBase + url).then(res => {
            if (res.status === 200) {
                return res.data.deleted
            }
        })
    }
}
