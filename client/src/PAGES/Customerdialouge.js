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
	// fab: {
	// 	float: "right",
	// 	// margin: "20px",
	// },
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
const CustomerDialog = forwardRef((props, ref) => {
	const classes = useStyles();

	const [open, setOpen] = useState(false);
	const [customer, setCustomer] = useState({
		firstname: "",
		lastname: "",
		email: "",
		phone: "",
		membership: "",
	});
	const [id, setId] = useState("");
	const [isAdd, setAdd] = useState(true);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setAdd(true);
		setCustomer({});
		setOpen(false);
	};

	const handleChange = (e) => {
		// console.log(e.target.name);
		setCustomer({ ...customer, [e.target.name]: e.target.value });
		// console.log(customer);
	};

	const onSubmit = () => {
		handleClose();
		Customerservice.addcustomer(customer)
			.then((result) => {
				// console.log(result);
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
		Customerservice.editCustomer(id, customer)
			.then((result) => {
				// console.log(result);
				if (result.data.status == 1) {
					// getCustomerList()
					alert(result.data.msg);
					console.log('message',result.data.msg)
					window.location.reload(false);

				} else {
					alert(`ERROR ${result.data.msg}`);
					console.log(result.data.msg)
				}
			})
			.catch((err) => {
				console.log('ERROR',err);
			});
	};

	useImperativeHandle(ref, () => ({
		showDialog(data, isEdit) {
			// console.log(data);
			setAdd(isEdit);
			setId(data._id);
			setCustomer(data);
			// console.log(customer);
		},
	}));

	useEffect(() => {
		// console.log(id);
		// console.log(customer);
		if (customer.firstname) {
			handleClickOpen();
		}
	}, [customer]);

	return (
		<div>
			<Fab
				style={{ float: "right", marginRight: "30px" }}
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
					{isAdd ? "Add Customer" : "Edit Customer"}
				</DialogTitle>
				<DialogContent dividers>
					<form
						className={classes.root}
						noValidate
						autoComplete="off"
						name="customer_form"
					>
						<TextField
							id="outlined-basic"
							label="First Name"
							name="firstname"
							value={customer.firstname}
							variant="outlined"
							onChange={handleChange}
						/>
						<TextField
							id="outlined-basic"
							label="Last Name"
							name="lastname"
							variant="outlined"
							value={customer.lastname}
							onChange={handleChange}
						/>
						<TextField
							id="outlined-basic"
							label="Email"
							variant="outlined"
							name="email"
							value={customer.email}
							onChange={handleChange}
						/>
						<TextField
							id="outlined-basic"
							label="Mobile No."
							variant="outlined"
							name="phone"
							value={customer.phone}
							onChange={handleChange}
						/>
						<FormControl
							variant="outlined"
							className={classes.formControl}
						>
							<InputLabel htmlFor="outlined-age-native-simple">
								Membership
							</InputLabel>
							<Select
								native
								//   value={state.age}
								onChange={handleChange}
								label="Membership"
								name="membership"
								value={customer.membership}
								//   inputProps={{
								//     name: 'age',
								//     id: 'outlined-age-native-simple',
								//   }}
							>
								{/* <option aria-label="Membership" value="" >Select membership</option> */}
								<option value={"silver"}>silver</option>
								<option value={"gold"}>Gold</option>
								<option value={"platinum"}>
									Platinum
								</option>
							</Select>
						</FormControl>
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

export default CustomerDialog;
