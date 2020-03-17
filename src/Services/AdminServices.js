import AxiosServices from './AxiosServices'
const AdminBaseURL = "http://localhost:53715/api/Admin";
let services = new AxiosServices()

export default class UserServices {
    // Register(data) {
    //     var token = "";
    //     return services.POST(`${AdminBaseURL}/register`, data, token)
    // }
    Login(data) {
        var token = "";
        return services.POST(`${AdminBaseURL}/Login`, data, token)
    }
    GetStatistic() {
        var token = localStorage.getItem("token")
        return services.GET(`${AdminBaseURL}/statistics`, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    GetUsers(){
        var token = localStorage.getItem("token")
        return services.GET(`${AdminBaseURL}/users`, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
}
