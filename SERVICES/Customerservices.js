import Axios from "axios"

class Customerservice{

    url= "http://localhost:5000/customer/"
    getAllCustomers(){
        console.log(this.url)
        return Axios.get(`${this.url}getcustomerList`)
        
    }

    deleteCustomerData(){
        console.log(this.url)
        return Axios.delete(`${this.url}getcustomerList`)
        
    }

}

export default new Customerservice()