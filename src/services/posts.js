import axios from 'axios'

export default {
    get: (url, config = {}) => {
        return axios.get(url, config).then(data => {
            if (data.status === 200) {
                return data.data
            } else {
                console.error('Something went wrong ', data.status)
            }
        })
    }
}
