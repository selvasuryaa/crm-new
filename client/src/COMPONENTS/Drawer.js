import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Button } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import InsertChartIcon from "@material-ui/icons/InsertChart";
import LoyaltyIcon from "@material-ui/icons/Loyalty";

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import StickyHeadTable from "../PAGES/Customertable";
import Customertable from "../PAGES/Customertable";
import Ordertable from "../PAGES/Ordertable";
import Producttable from "../PAGES/Producttable";
import Dashboard from "./Dashboard";
import About from "../PAGES/About";

import LoginCard from './Logincard';
import RegisterCard from "./RegisterCard";
import LogoutScreen from "../PAGES/Logout";

import Authservice from '../SERVICES/Authservice'
import ProtectedRoutes from '../ProtectedRoutes'

// import { useNavigate } from "react-router-dom";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	hide: {
		display: "none",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: "nowrap",
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: "hidden",
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9) + 1,
		},
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	title: {
		flexGrow: 1,
	},
}));

export default function MiniDrawer(props) {
	// const navigate = useNavigate();
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [logout, setLogout] = useState(false)

	const iconArray = [
		<VpnKeyIcon />,
		<PersonAddIcon />,
		<InsertChartIcon />,
		<PersonIcon />,
		<ShoppingCartIcon />,
		<LoyaltyIcon />,
		<ErrorOutlineIcon />,
		<ExitToAppIcon />

	];
	const toArray = [
		"/",
		"/register",
		"/dashboard",
		"/customer",
		"/order",
		"/product",
		"/about",
		"/logout"
	];

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	// const logoutHandler = () => {
	// 	Authservice.logout()
	// 	alert('Successfully Logged Out')
	// }

	return (
		<div className={classes.root}>
			<Router >
				<CssBaseline />
				<AppBar
					// position="fixed"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open,
					})}
				>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							className={clsx(classes.menuButton, {
								[classes.hide]: open,
							})}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							CRM
						</Typography>
						{/* <IconButton
							color="inherit"
							aria-label="Logout"
							aria-labelledby="logout"
							onClick={logoutHandler}
							edge="start"
						className={clsx(classes.menuButton, {
							[classes.hide]: open,
						})}
						> */}
							{/* <ExitToAppIcon /> */}
						{/* </IconButton> */}
						{/* <Button color="inherit">Logout</Button> */}
					</Toolbar>
				</AppBar>
				<Drawer
					variant="permanent"
					className={clsx(classes.drawer, {
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					})}
					classes={{
						paper: clsx({
							[classes.drawerOpen]: open,
							[classes.drawerClose]: !open,
						}),
					}}
				>
					<div className={classes.toolbar}>
						<IconButton onClick={handleDrawerClose}>
							{theme.direction === "rtl" ? (
								<ChevronRightIcon />
							) : (
								<ChevronLeftIcon />
							)}
						</IconButton>
					</div>
					<Divider />
					<List>
						{[
							"Login",
							"Register",
							"Dashboard",
							"Customer",
							"Order",
							"Product",
							"About",
							"Logout"
						].map((text, index) => (
							<ListItem
								button
								key={text}
								component={Link}
								to={toArray[index]}
							>
								<ListItemIcon>
									{iconArray[index]}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						))}
					</List>

				</Drawer>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					<Routes>
						<Route path="/register" element={<RegisterCard />} />
						<Route path="/logout" element={<LogoutScreen />} />
						<Route exact path="/" element={<LoginCard />} />
						<Route element={<ProtectedRoutes />}>
							{/* <Route path="/" element={<Dashboard />} /> */}
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/customer" element={<Customertable />} />
							<Route path="/order" element={<Ordertable />} />
							<Route path="/product" element={<Producttable />} />
							<Route path="/about" element={<About />} />
						</Route>
					</Routes>
				</main>
			</Router>
		</div>
	);
}
