import { Avatar, Button, ButtonGroup, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import MaterialReactTable from "material-react-table";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useNavigate } from "react-router-dom";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ShoppingImage from "../../assets/shopping.svg";

function Cart({ items, setItems }) {
  const navigate = useNavigate();

  const handleRemoveFromCart = (item) => {
    items = items.filter((cartItem) => cartItem._id !== item._id);
    setItems(items);
    console.log(items, "items");
  };

  const handleQuantityIncrease = (item) => {
    const index = items.findIndex((cartItem) => cartItem._id === item._id);
    if (item.itemQuantity >= items[index].selectedQuantity + 1) {
      items[index].selectedQuantity++;
      setItems([...items]);
    }
  };

  const handleQuantityDecrease = (item) => {
    const index = items.findIndex((cartItem) => cartItem._id === item._id);
    if (0 <= items[index].selectedQuantity - 1) {
      items[index].selectedQuantity--;
      setItems([...items]);
    }
  };

  const columns = useMemo(
    () => [
      {
        header: " ",
        maxSize: 20,
        Cell: ({ cell, row }) => {
          return (
            <Avatar
              sx={{ width: 100, height: 100 }}
              alt=''
              src={row.original.itemImage}
            />
          );
        },
      },

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
      {
        header: "Quantity",
        maxSize: 30,
        Cell: ({ cell, row }) => {
          return (
            <ButtonGroup
              disableElevation
              variant='contained'
              aria-label='Disabled elevation buttons'
            >
              <Button
                onClick={() => handleQuantityDecrease(row.original)}
                startIcon={<RemoveCircleOutlineIcon />}
              ></Button>
              <Button
                onClick={() => handleQuantityIncrease(row.original)}
                endIcon={<ControlPointIcon />}
              ></Button>
            </ButtonGroup>
          );
        },
      },
      {
        header: "Remove",
        maxSize: 30,
        Cell: ({ cell, row }) => {
          return (
            <Button
              variant='contained'
              color='error'
              endIcon={<RemoveCircleIcon />}
              onClick={() => handleRemoveFromCart(row.original)}
            >
              Remove
            </Button>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <Stack
        direction='column'
        justifyContent='center'
        alignItems='center'
        spacing={2}
        marginTop={5}
      >
        {items.length === 0 ? (
          <>
            <img height={300} src={ShoppingImage} alt='' />
            <Typography variant='h4'>
              You don't have any items in your cart. Let's get shopping!
            </Typography>
            <Button
              onClick={() => navigate("/")}
              variant='contained'
              startIcon={<ShoppingBasketIcon />}
            >
              Start Shopping
            </Button>
          </>
        ) : (
          <Stack gap={2}>
            <Button
              onClick={() => navigate("/checkout")}
              variant='contained'
              startIcon={<ShoppingCartCheckoutIcon />}
            >
              Checkout
            </Button>
            <MaterialReactTable columns={columns} data={items} />
          </Stack>
        )}
      </Stack>
    </>
  );
}

export default Cart;
