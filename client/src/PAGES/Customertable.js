import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Button, Typography, Fab } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import "../CSS/Customertable.css";
import CustomerDialog from "./Customerdialouge";
import Customerservice from "../SERVICES/Customerservice";

const columns = [
	{ id: "firstname", label: "First Name", minWidth: 170 },
	{ id: "lastname", label: "Last Name", minWidth: 170 },

	{
		id: "email",
		label: "Email",
		minWidth: 170,
		
	},
	{
		id: "phone",
		label: "Phone",
		minWidth: 170,
		
	},
	{
		id: "membership",
		label: "Membership",
		minWidth: 170,
		
	},
	{
		id: "actions",
		label: "Actions",
		minWidth: 170,
		
	},
];

const useStyles = makeStyles({
	root: {
		width: "100%",
	},
	container: {
		maxHeight: 440,
	},
	tablehead: {
		fontWeight: "bold",
		
		fontSize: "20px",
	},
});

export default function StickyHeadTable() {
	const classes = useStyles();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [customers, setCustomers] = useState([]);
	const customerDialogRef = useRef(null);
	const showModal = null;
	const [totalCustomers, setTotal] = React.useState(0);
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
		customerDialogRef.handleClickOpen();
	}

	function getCustomerList() {
		Customerservice.getAllCustomers()
			.then((response) => {
				console.log(response.data.Data);
				setCustomers([customers, response.data.Data]);
				setCustomers((customers) =>
					customers.concat(response.data.Data)
				);
				console.log(customers);
			})
			.catch((err) => {
				console.log(err);
			});
	}
	const onEditClick = (data) => {
		console.log(data);
		setCus({ ...cus, data });
		customerDialogRef.current.showDialog(data, false);
		console.log(cus);
	};

	const onDeleteClick = (id) => {
		console.log(id);
		Customerservice.deleteCustomer(id)
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
		Customerservice.getAllCustomers()
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
		// getCustomerList()
	}, []);

	return (
		<Paper className={classes.root}>
			<CustomerDialog
				ref={customerDialogRef}
				customer={cus}
			></CustomerDialog>

			<Typography variant="h4" component="h2">
				Customer Table
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
										// key={customer._id}
									>
										{columns.map((column) => {
											const value =
												customer[column.id];
											console.log(value);
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
				count={customers.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
