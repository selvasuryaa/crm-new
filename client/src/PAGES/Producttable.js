import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
// import customerService from '../services/Customerservice'
import { Button, Typography, Fab } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import Axios from "axios";
import Productservice from "../SERVICES/Productservice";
import ProductDialog from "./Productdialog";


const columns = [
	{ id: "productname", label: "Product Name", minWidth: 170 },
	{ id: "categoryname", label: "Category Name", minWidth: 170 },

	{
		id: "price",
		label: "Price",
		minWidth: 170,

	},
	{
		id: "totalinstock",
		label: "Total in stock",
		minWidth: 170,
	},
	{
		id: "actions",
		label: "Actions",
		minWidth: 170,
		},
];

function createData(productname, categoryname, price, totalinstock) {
	
	return { productname, categoryname, price, totalinstock };
}

const rows = [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0];
// 	createData("India", "IN", 1324171354, 3287263),
// 	createData("China", "CN", 1403500365, 9596961),
// 	createData("Italy", "IT", 60483973, 301340),
// 	createData("United States", "US", 327167434, 9833520),
// 	createData("Canada", "CA", 37602103, 9984670),
// 	createData("Australia", "AU", 25475400, 7692024),
// 	createData("Germany", "DE", 83019200, 357578),
// 	createData("Ireland", "IE", 4857000, 70273),
// 	createData("Mexico", "MX", 126577691, 1972550),
// 	createData("Japan", "JP", 126317000, 377973),
// 	createData("France", "FR", 67022000, 640679),
// 	createData("United Kingdom", "GB", 67545757, 242495),
// // 	createData("Russia", "RU", 146793744, 17098246),
// // 	createData("Nigeria", "NG", 200962417, 923768),
// // 	createData("Brazil", "BR", 210147125, 8515767),
// ];

const useStyles = makeStyles({
	root: {
		width: "100%",
	},
	container: {
		maxHeight: 440,
		textAlign: "justify",
	},
	tablehead: {
		fontWeight: "bold",
		// color: "red",
		fontSize: "20px",
	},
});

export default function ProductTable() {
	const classes = useStyles();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [customers, setCustomers] = useState([]);
	const productDialogRef = useRef(null);
	const [cus, setCus] = React.useState({});

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	function opendialog(e) {
		//showModal()
		productDialogRef.handleClickOpen();
	}

	const onEditClick = (data) => {
		console.log(data);
		setCus({ ...cus, data });
		productDialogRef.current.showDialog(data, false);
		console.log(cus);
	};

	const onDeleteClick = (id) => {
		console.log(id);
		Productservice.deleteProduct(id)
			.then((result) => {
				console.log(result);
				if (result.data.status == 1) {
					// getCustomerList()
					window.location.reload(false);
				} else {
					alert(result.data.msg);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	
	useEffect(() => {
		Productservice.getAllProducts()
			.then((res) => {
				console.log(res.data.Data);
				setCustomers((customers) =>
					customers.concat(res.data.Data)
				);
				console.log(customers);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<Paper className={classes.root}>
			<ProductDialog
				ref={productDialogRef}
				customer={cus}
			></ProductDialog>

			<Typography variant="h4" component="h2">
				Product Table
			</Typography>
			<TableContainer className={classes.container}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									className={classes.tablehead}
									key={column.id}
									align={column.align}
									style={{
										minWidth: column.minWidth,
									}}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{customers
							.slice(
								page * rowsPerPage,
								page * rowsPerPage + rowsPerPage
							)
							.map((customer) => {
								return (
									<TableRow
										hover
										role="checkbox"
										tabIndex={-1}
										key={customer.code}
									>
										{columns.map((column) => {
											const value =
												customer[column.id];
											// console.log(value);
											return column.id ===
												"actions" ? (
												<TableCell
													key={column.id}
													align={
														column.align
													}
												>
													{/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
													<Fab
														size="small"
														color="primary"
														aria-label="add"
														onClick={() =>
															onEditClick(
																customer
															)
														}
													>
														<EditIcon />
													</Fab>
													<Fab
														size="small"
														color="primary"
														aria-label="add"
														onClick={() =>
															onDeleteClick(
																customer._id
															)
														}
													>
														<DeleteSweepIcon />
													</Fab>
												</TableCell>
											) : (
												<TableCell
													key={column.id}
													align={
														column.align
													}
												>
													{/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
													{value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
