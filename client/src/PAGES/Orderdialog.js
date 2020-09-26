import React, {
	forwardRef,
	useState,
	useImperativeHandle,
	useEffect,
} from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Typography from "@material-ui/core/Typography";
// import Adddialog from "../PAGES/Adddialouge"
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Customerservice from "../SERVICES/Customerservice";
import { makeStyles } from "@material-ui/core/styles";
import Orderservice from "../SERVICES/Orderservice";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: "25ch",
		},
	},
}));

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
	fab: {
		float: "right",
		margin: "20px",
	},
});

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);

// export default function CustomerDialog() {
const OrderDialog = forwardRef((props, ref) => {
	const classes = useStyles();

	const [open, setOpen] = useState(false);
	const [order, setOrder] = useState({
		orderID: "",
		quantity: "",
		amount: "",
		totalamount: "",
		customer: "",
		orderdate: "",
		shippingdate: "",
	});
	const [id, setId] = useState("");
	const [isAdd, setAdd] = useState(true);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setAdd(true);
		setOrder({});
		setOpen(false);
	};

	const handleChange = (e) => {
		console.log(e.target.name);
		setOrder({ ...order, [e.target.name]: e.target.value });
		console.log(order);
	};

	const onSubmit = () => {
		handleClose();
		Orderservice.addOrder(order)
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
	const onEdit = () => {
		handleClose();
		Orderservice.editOrder(id, order)
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

	useImperativeHandle(ref, () => ({
		showDialog(data, isEdit) {
			console.log(data);
			setAdd(isEdit);
			setId(data._id);
			setOrder(data);
			console.log(order);
		},
	}));

	useEffect(() => {
		console.log(id);
		console.log(order);
		if (order.orderID) {
			handleClickOpen();
		}
	}, [order]);

	return (
		<div>
			<Fab
				style={{ float: "right", marginRight: "40px" }}
				size="large"
				color="secondary"
				aria-label="add"
				onClick={handleClickOpen}
			>
				<AddIcon />
			</Fab>
			<Dialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
			>
				<DialogTitle
					id="customized-dialog-title"
					onClose={handleClose}
				>
					{isAdd ? "Add Order" : "Edit Order"}
				</DialogTitle>
				<DialogContent dividers>
					<form
						className={classes.root}
						noValidate
						autoComplete="off"
						name="order_form"
					>
						<TextField
							id="outlined-basic"
							label="Order ID"
							name="orderID"
							value={order.orderID}
							variant="outlined"
							onChange={handleChange}
						/>
						<TextField
							id="outlined-basic"
							label="Quantity"
							name="quantity"
							variant="outlined"
							value={order.quantity}
							onChange={handleChange}
						/>
						<TextField
							id="outlined-basic"
							label="Amount"
							variant="outlined"
							name="amount"
							value={order.amount}
							onChange={handleChange}
						/>
						<TextField
							id="outlined-basic"
							label="Total Amount "
							variant="outlined"
							name="totalamount"
							value={order.totalamount}
							onChange={handleChange}
						/>
						<TextField
							id="outlined-basic"
							label="Cusomer "
							variant="outlined"
							name="customer"
							value={order.customer}
							onChange={handleChange}
						/>
						<TextField
							id="outlined-basic"
							label="Order Date"
							variant="outlined"
							name="orderdate"
							value={order.orderdate}
							onChange={handleChange}
						/>
						<TextField
							id="outlined-basic"
							label="Shippingg Date"
							variant="outlined"
							name="shippingdate"
							value={order.shippingdate}
							onChange={handleChange}
						/>
					</form>
				</DialogContent>
				<DialogActions>
					{isAdd ? (
						<Button
							autoFocus
							onClick={onSubmit}
							color="primary"
						>
							Add
						</Button>
					) : (
						<Button
							autoFocus
							onClick={onEdit}
							color="primary"
						>
							Save
						</Button>
					)}
				</DialogActions>
			</Dialog>
		</div>
	);
});

export default OrderDialog;
