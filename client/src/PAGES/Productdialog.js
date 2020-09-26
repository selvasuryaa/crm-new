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
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
// import Customerservice from "../SERVICES/Customerservice";
import { makeStyles } from "@material-ui/core/styles";
import Productservice from "../SERVICES/Productservice";

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
		margin: "50px",
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
const ProductDialog = forwardRef((props, ref) => {
	const classes = useStyles();

	const [open, setOpen] = useState(false);
	const [product, setProduct] = useState({
		categoryname: "",
		productname: "",
		price: "",
		totalinstock: "",
	});
	const [id, setId] = useState("");
	const [isAdd, setAdd] = useState(true);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setAdd(true);
		setProduct({});
		setOpen(false);
	};

	const handleChange = (e) => {
		console.log(e.target.name);
		setProduct({ ...product, [e.target.name]: e.target.value });
		console.log(product);
	};

	const onSubmit = () => {
		handleClose();
		Productservice.addProduct(product)
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
		Productservice.editProduct(id, product)
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
			setProduct(data);
			console.log(product);
		},
	}));

	useEffect(() => {
		console.log(id);
		console.log(product);
		if (product.categoryname) {
			handleClickOpen();
		}
	}, [product]);

	return (
		<div>
			<Fab
				style={{ float: "right", marginRight: "50px" }}
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
					{isAdd ? "Add Product" : "Edit Product"}
				</DialogTitle>
				<DialogContent dividers>
					<form
						className={classes.root}
						noValidate
						autoComplete="off"
						name="product_form"
					>
						<TextField
							id="outlined-basic"
							label="Product"
							name="productname"
							value={product.productname}
							variant="outlined"
							onChange={handleChange}
						/>
						<TextField
							id="outlined-basic"
							label="Category"
							name="categoryname"
							variant="outlined"
							value={product.categoryname}
							onChange={handleChange}
						/>
						<TextField
							id="outlined-basic"
							label="Price"
							variant="outlined"
							name="price"
							value={product.price}
							onChange={handleChange}
						/>
						<TextField
							id="outlined-basic"
							label="Quantity"
							variant="outlined"
							name="totalinstock"
							value={product.totalinstock}
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

export default ProductDialog;
