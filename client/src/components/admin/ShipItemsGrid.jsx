import {
  AppBar,
  Avatar,
  Box,
  Button,
  Dialog,
  IconButton,
  Slide,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MaterialReactTable from "material-react-table";
import { forwardRef, useEffect, useMemo, useState } from "react";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { ENDPOINTS, createAPIEndpoint } from "../../api";
import backgroundImage from "../../assets/homeBackground.jpg";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ExportToCsv } from "export-to-csv";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import CloseIcon from "@mui/icons-material/Close";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

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

function ShipmentGrid({ open, handleClose, shippingNumber }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.cartItem)
      .fetch()
      .then((res) => {
        console.log(res.data, "res data");
        console.log("shipping number,", shippingNumber);
        setItems(res.data);
      });
  }, []);

  useEffect(() => {
    setItems(items.filter((item) => item.shippingNumber === shippingNumber));
  }, [shippingNumber]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "itemCode",
        header: "Item Code",
        maxSize: 5,
      },
      {
        accessorKey: "itemName",
        header: "Item Name",
        maxSize: 5,
      },
      {
        accessorKey: "selectedQuantity",
        header: "Quantity",
        maxSize: 5,
      },
      {
        accessorKey: "itemPrice",
        header: "Unit Price",
        maxSize: 5,
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
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleClose}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
            Shipping Items
          </Typography>
        </Toolbar>
      </AppBar>
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
              disabled={table.getPrePaginationRowModel().rows.length === 0}
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
                !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
              }
              //only export selected rows
              onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
              startIcon={<FileDownloadIcon />}
              variant='contained'
            >
              Export Selected Rows
            </Button>
          </Box>
        )}
      />
    </Dialog>
  );
}

export default ShipmentGrid;
