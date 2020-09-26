import Axios from "axios";

class Productservice {
	url = "http://localhost:5000/product/";
	getAllProducts() {
		return Axios.get(`${this.url}getproductlist`);
	}
	addProduct(product) {
		return Axios.post(`${this.url}regproduct`, product);
	}
	editProduct(id, product) {
		console.log(id);
		console.log(product);

		return Axios.put(`${this.url}editproductdata/${id}`, product);
	}
	deleteProduct(id) {
		return Axios.delete(`${this.url}deleteproductdata/${id}`);
	}
}

export default new Productservice();
