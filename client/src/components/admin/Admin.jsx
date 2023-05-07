import { Avatar, Box, Button, IconButton, Stack } from "@mui/material";
import MaterialReactTable from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { ENDPOINTS, createAPIEndpoint } from "../../api";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ExportToCsv } from "export-to-csv";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import ShipmentGrid from "./ShipItemsGrid";
import DeleteIcon from "@mui/icons-material/Delete";
import backgroundImage from "../../assets/homeBackground.jpg";

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

function Admin() {
  const [open, setOpen] = useState(false);
  const [shippingNumber, setShippingNumber] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    createAPIEndpoint(ENDPOINTS.shipment).delete(id);
    window.location.reload();
  };

  const [items, setItems] = useState([]);
  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.shipment)
      .fetch()
      .then((res) => {
        setItems(res.data);
        console.log(res.data);
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "_id",
        header: "ID",
        maxSize: 1,
      },
      {
        accessorKey: "shippingNumber",
        header: "Shipping Number",
        maxSize: 5,
      },
      {
        accessorKey: "paymentMethod",
        header: "Payment Method",
        maxSize: 5,
      },
      {
        accessorKey: "totalPrice",
        header: "Total Price",
        maxSize: 5,
      },
      {
        header: " ",
        maxSize: 20,
        Cell: ({ cell, row }) => {
          return (
            <>
              <Button
                variant='contained'
                endIcon={<BloodtypeIcon />}
                onClick={() => {
                  console.log(row.original, "original row");
                  setShippingNumber(row.original.shippingNumber);
                  console.log(shippingNumber, "ship");
                  handleClickOpen();
                }}
              >
                Items
              </Button>
            </>
          );
        },
      },
      {
        header: " ",
        maxSize: 20,
        Cell: ({ cell, row }) => {
          return (
            <>
              <IconButton
                onClick={() => handleDelete(row.original._id)}
                aria-label='delete'
              >
                <DeleteIcon />
              </IconButton>
            </>
          );
        },
      },
    ],
    []
  );

  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.header),
  };

  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportRows = (rows) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };

  const handleExportData = () => {
    csvExporter.generateCsv(items);
  };

  return (
    <div style={styles.header}>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
        style={styles.content}
      >
        <ShipmentGrid
          open={open}
          handleClose={handleClose}
          shippingNumber={shippingNumber}
        />
        <Stack
          direction='column'
          justifyContent='center'
          alignItems='center'
          spacing={2}
          marginTop={5}
        >
          <Stack direction={"column"}>
            <MaterialReactTable
              columns={columns}
              data={items}
              enableRowSelection
              positionToolbarAlertBanner='bottom'
              renderTopToolbarCustomActions={({ table }) => (
                <Box
                  sx={{
                    display: "flex",
                    gap: "1rem",
                    p: "0.5rem",
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    color='primary'
                    //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                    onClick={handleExportData}
                    startIcon={<FileDownloadIcon />}
                    variant='contained'
                  >
                    Export All Data
                  </Button>
                  <Button
                    disabled={
                      table.getPrePaginationRowModel().rows.length === 0
                    }
                    //export all rows, including from the next page, (still respects filtering and sorting)
                    onClick={() =>
                      handleExportRows(table.getPrePaginationRowModel().rows)
                    }
                    startIcon={<FileDownloadIcon />}
                    variant='contained'
                  >
                    Export All Rows
                  </Button>
                  <Button
                    disabled={table.getRowModel().rows.length === 0}
                    //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                    onClick={() => handleExportRows(table.getRowModel().rows)}
                    startIcon={<FileDownloadIcon />}
                    variant='contained'
                  >
                    Export Page Rows
                  </Button>
                  <Button
                    disabled={
                      !table.getIsSomeRowsSelected() &&
                      !table.getIsAllRowsSelected()
                    }
                    //only export selected rows
                    onClick={() =>
                      handleExportRows(table.getSelectedRowModel().rows)
                    }
                    startIcon={<FileDownloadIcon />}
                    variant='contained'
                  >
                    Export Selected Rows
                  </Button>
                </Box>
              )}
            />
          </Stack>
        </Stack>
      </Box>
    </div>
  );
}

export default Admin;
