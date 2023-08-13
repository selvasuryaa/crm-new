import Axios from "axios";
import Authservice from './Authservice';

const local_token = Authservice.getToken()
let headers = {
	"Authorization": `Bearer ${local_token}`
}

class Customerservice {
	url = "http://localhost:5000/customer/";
	getAllCustomers() {
		return Axios.get(`${this.url}getcustomerList`, { headers });
	}
	addcustomer(customer) {
		return Axios.post(`${this.url}regcustomer`, customer, { headers });
	}
	editCustomer(id, customer) {
		return Axios.put(`${this.url}editcustomerdata/${id}`, customer, { headers });
	}
	deleteCustomer(id) {
		return Axios.delete(`${this.url}deletecustomerdata/${id}`, { headers })
	}
}

export default new Customerservice();
