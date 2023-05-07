import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Link, useNavigate } from "react-router-dom";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import { styled } from "@mui/material/styles";
import { Badge, Tooltip } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import logo from "../../assets/logo.svg";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function TopBar({ items }) {
  const [itemsCount, setItemsCount] = React.useState(items.length);
  React.useEffect(() => {
    console.log("items change");
    setItemsCount(items.length);
  }, [items]);
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='relative'>
        <Toolbar>
          <Link href='/'>
            <Box component='img' sx={{ height: 170 }} alt='Logo' src={logo} />
          </Link>
          <Typography
            variant='p'
            component='div'
            sx={{ flexGrow: 1, fontStyle: "italic", letterSpacing: 6 }}
          >
            Your health is our priority - we're here to help you feel your best!
          </Typography>

          <Tooltip title='Home'>
            <IconButton onClick={() => navigate("/")} aria-label='cart'>
              <OtherHousesIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title='Cart'>
            <IconButton onClick={() => navigate("/cart")} aria-label='cart'>
              <StyledBadge badgeContent={itemsCount} color='secondary'>
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Tooltip>

          <Tooltip title='Admin'>
            <IconButton onClick={() => navigate("/admin")} aria-label='cart'>
              <AdminPanelSettingsIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
