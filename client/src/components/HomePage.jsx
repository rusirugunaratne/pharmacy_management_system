import { Avatar, Box, Button, IconButton, Stack } from "@mui/material";
import MaterialReactTable from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { ENDPOINTS, createAPIEndpoint } from "../api";
import backgroundImage from "../assets/homeBackground.jpg";

const styles = {
  header: {
    backgroundImage: `url(${backgroundImage})`,
    height: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },

  content: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
};

function HomePage({ items, setItems }) {
  let selectedItems = items;
  const [allItems, setAllItems] = useState([]);

  const handleAddToCart = (item) => {
    if (items.findIndex((cartItem) => cartItem._id === item._id) === -1) {
      selectedItems.push(item);
      console.log("Selected rows:", selectedItems);
      setItems((i) => [...selectedItems]);
    }
  };

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.item)
      .fetch()
      .then((res) => {
        console.log(res.data);
        setAllItems(res.data);
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        header: " ",
        maxSize: 20,
        Cell: ({ cell, row }) => {
          return (
            <>
              <Stack spacing={-2}>
                <Avatar
                  sx={{ width: 100, height: 100 }}
                  alt=''
                  src={row.original.itemImage}
                />
                <Button
                  variant='contained'
                  endIcon={<AddShoppingCartOutlinedIcon />}
                  onClick={() => handleAddToCart(row.original)}
                >
                  Add
                </Button>
              </Stack>
            </>
          );
        },
      },

      {
        accessorKey: "itemName",
        header: "Name",
        maxSize: 20,
      },
      {
        accessorKey: "itemQuantity",
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
    <div style={styles.header}>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
        style={styles.content}
      >
        <Stack
          direction='column'
          justifyContent='center'
          alignItems='center'
          spacing={2}
          marginTop={5}
        >
          <MaterialReactTable columns={columns} data={allItems} />
        </Stack>
      </Box>
    </div>
  );
}

export default HomePage;
