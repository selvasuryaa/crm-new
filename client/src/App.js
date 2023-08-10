import React, { useState } from "react";
import MiniDrawer from "./COMPONENTS/Drawer";
import LoginCard from "./COMPONENTS/Logincard";
// import Authservice from "./SERVICES/Authservice";
import RegisterCard from "./COMPONENTS/RegisterCard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authservice from './SERVICES/Authservice'
import ProtectedRoute from './ProtectedRoutes'
import About from "./PAGES/About";
import Dashboard from "./COMPONENTS/Dashboard";


function App() {

	// const [isLoggedIn, setIsLoggedIn] = useState(false)

	// const token = Authservice.getToken()

	// if(token != null){
	// 	setIsLoggedIn(true)
	// console.log('app.js')
	// console.log(token)
	// }

	// if(isLoggedIn){
	// 	return <MiniDrawer/>
	// }

	return (
		<div>
			<MiniDrawer/>
			{/* <Router>

				<Routes>
					<Route path='/login' element={<LoginCard />}/>
					<Route path='/register' element={<RegisterCard />}/>
					<Route element={<ProtectedRoute/>}>
						<Route index element={<MiniDrawer/>} />
					</Route>
				</Routes>				
			</Router> */}
		</div>
	);
}

export default App;












	// const [loggedIn, setLoggedIn] = useState(false);

	// useEffect(() => {
	// 	let x = Authservice.isLoggedIn();
	// 	setLoggedIn(x);
		// console.log("jkjkj",x);

		// console.log("jkjkj",loggedIn);
	// });

	// return (<div> <LoginCard /></div>);