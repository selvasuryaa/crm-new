class Authservice {
	setToken(token) {
		localStorage.setItem("auth-token", token);
		console.log("stored Token",token)
	}
	getToken() {
		console.log('getting token')
	 localStorage.getItem("auth-token");
	}
	isLoggedIn() {
		return !!localStorage.getItem("auth-token");
	}
	logout() {
		localStorage.removeItem("auth-token");
	}
}

export default new Authservice();
