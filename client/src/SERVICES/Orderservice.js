import Axios from "axios";

class Orderservice {
	url = "http://localhost:5000/order/";
	getAllOrders() {
		return Axios.get(`${this.url}getorderlist`);
	}
	addOrder(order) {
		return Axios.post(`${this.url}regorder`, order);
	}
	editOrder(id, order) {
		console.log(id);
		console.log(order);

		return Axios.put(`${this.url}editorderdata/${id}`, order);
	}
	deleteOrder(id) {
		return Axios.delete(`${this.url}deleteorderdata/${id}`);
	}
}

export default new Orderservice();
