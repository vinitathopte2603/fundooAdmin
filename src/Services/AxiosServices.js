import axios from 'axios'

export default class AxiosServices {

    GET(path, token) {
        return axios.get(path, token);
    }
    POST(path, data, token) {
        return axios.post(path, data, token)
    }
}
