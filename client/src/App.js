import React, { useState, useEffect } from "react";
// import ProfitCard from './PAGES/Profitcard';
// import Combinationcard from './COMPONENTS/Combinationcard';
// import Barchart from './PAGES/Barchart';
// import SimpleCard from './PAGES/Dashcard';
// import Splinechart from './PAGES/Splinechart';
// import ProductTable from './PAGES/Producttable';
// import OrderTable from './PAGES/Ordertable';
import MiniDrawer from "./COMPONENTS/Drawer";
import LoginCard from "./COMPONENTS/Logincard";
// import logo from './logo.svg';
// import './App.css';
// import FloatingActionButtonSize from "./PAGES/FAB"
// import PieCard from "./COMPONENTS/Piecard"
// import Combinationcard from "./COMPONENTS/Combinationcard"
// import Dashboard from "./COMPONENTS/Dashboard"
import Authservice from "./SERVICES/Authservice";
// import { useState } from "react";

function App() {
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		let x = Authservice.isLoggedIn();
		setLoggedIn(x);
		console.log(loggedIn);
	});

	// return <div>{loggedIn ? <MiniDrawer /> : <LoginCard />}</div>;
	return (
		<div>
			<MiniDrawer />
		</div>
	);
}

export default App;
