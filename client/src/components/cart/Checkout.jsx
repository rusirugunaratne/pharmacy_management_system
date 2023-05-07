import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS, createAPIEndpoint } from "../../api";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

function Checkout({ items, setItems }) {
  const navigate = useNavigate();
  const [uniqueCode, setUniqueCode] = useState();

  const [paymentMethod, setPaymentMethod] = useState("Not Selected");

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => setUniqueCode(generateUniqueCode()), []);

  function generateUniqueCode() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();
    const code = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
    setUniqueCode(code);
    return code;
  }

  const getTotalPrice = () => {
    let totalPrice = 0.0;
    items.forEach((item) => {
      totalPrice += item.itemPrice * item.selectedQuantity;
    });
    return totalPrice;
  };

  const completeOrder = () => {
    const shipment = {
      shippingNumber: uniqueCode,
      paymentMethod: paymentMethod,
    };
    const postItems = [];
    items.forEach((item) =>
      postItems.push({
        shippingNumber: uniqueCode,
        itemCode: item.itemCode,
        itemName: item.itemName,
        itemQuantity: item.itemQuantity,
        selectedQuantity: item.selectedQuantity,
        itemPrice: item.itemPrice,
        itemImage: item.itemImage,
      })
    );
    items.forEach((item) => {
      item.itemQuantity = item.itemQuantity - item.selectedQuantity;
      createAPIEndpoint(ENDPOINTS.item).put(item._id, item);
    });
    postItems.forEach((postItem) => {
      createAPIEndpoint(ENDPOINTS.cartItem).post(postItem);
    });
    createAPIEndpoint(ENDPOINTS.shipment).post(shipment);
    navigate("/");
    setItems([]);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "itemName",
        header: "Name",
        maxSize: 20,
      },
      {
        accessorKey: "selectedQuantity",
        header: "Item Qty",
        maxSize: 10,
      },
      {
        accessorKey: "itemPrice",
        header: "Item Price",
        maxSize: 10,
      },
    ],
    []
  );

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {"Set the payment method"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            At our pharmacy, we offer our customers the flexibility to choose
            from two convenient payment options: cash or card. Whether you
            prefer to pay with physical currency or through a debit or credit
            card, we have you covered. We understand that everyone has different
            preferences when it comes to paying for their purchases, which is
            why we strive to make the payment process as easy and hassle-free as
            possible. So whether you're picking up a prescription or shopping
            for over-the-counter products, you can choose the payment method
            that works best for you.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setPaymentMethod("Cash");
              handleClose();
            }}
          >
            Cash
          </Button>
          <Button
            onClick={() => {
              setPaymentMethod("Card");
              handleClose();
            }}
          >
            Card
          </Button>
          <Button
            variant='contained'
            color='error'
            onClick={handleClose}
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Stack
        direction='column'
        justifyContent='center'
        alignItems='center'
        spacing={2}
        marginTop={5}
      >
        <Typography variant='h8'>{`Shipping Number : ${uniqueCode}`}</Typography>
        <MaterialReactTable columns={columns} data={items} />
        <Typography variant='h4'>{`Sub total (LKR)  : ${getTotalPrice().toFixed(
          2
        )}`}</Typography>
        <Stack direction={"row"} spacing={2}>
          <Typography variant='h6'>{`Payment Method : ${paymentMethod}`}</Typography>
          <Button
            onClick={handleClickOpen}
            variant='contained'
            startIcon={<CreditScoreIcon />}
          >
            Set Payment Method
          </Button>
        </Stack>

        <Button
          disabled={paymentMethod === "Not Selected"}
          onClick={() => completeOrder()}
          variant='contained'
          startIcon={<ChecklistIcon />}
        >
          Complete Order
        </Button>
      </Stack>
    </>
  );
}

export default Checkout;
