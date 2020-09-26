import Axios from "axios";

class Customerservice {
	url = "http://localhost:5000/customer/";
	getAllCustomers() {
		return Axios.get(`${this.url}getcustomerList`);
	}
	addcustomer(customer) {
		return Axios.post(`${this.url}regcustomer`, customer);
	}
	editCustomer(id, customer) {
		// console.log(id);
		// console.log(customer);

		return Axios.put(`${this.url}editcustomerdata/${id}`, customer);
	}
	deleteCustomer(id) {
		return Axios.delete(`${this.url}deletecustomerdata/${id}`);
	}
}

export default new Customerservice();
