import axios from 'axios'

class AdminService{
    url = "http://localhost:5000/admin/"
    registerUser(registerData){
        return axios.post(`${this.url}registerUser`, registerData)

    }
    loginUser(loginData){
        return axios.post(`${this.url}loginUser`,loginData )
    }
}

export default new AdminService();