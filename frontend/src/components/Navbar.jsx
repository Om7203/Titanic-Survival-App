import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  List,
  ListItem,
  styled,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import DrawerItem from "./DrawerItem";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const ListMenu = styled(List)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const Image = styled("img")(({ theme }) => ({
  width: "140px",
  [theme.breakpoints.down("sm")]: {
    padding: "10px 0",
    width: "90px",
  },
}));

const itemList = [
  {
    text: "Home",
    to: "/",
  },
  {
    text: "Calculator",
    to: "/Calculator",
  },
  {
    text: "History",
    to: "/History",
  },
];

const Navbar = () => {
  return (
    <AppBar
      component="nav"
      position="sticky"
      sx={{
        backgroundColor: "#ffa500",
      }}
      elevation={0}
    >
      <StyledToolbar>
        <Image src={Logo} alt="Company Logo" />
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <DrawerItem />
        </Box>
        <ListMenu>
          {itemList.map((item) => {
            const { text } = item;
            return (
              <ListItem key={text}>
                <ListItemButton
                  component={Link}
                  to={item.to}
                  sx={{
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "#1e2a5a",
                    },
                  }}
                >
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </ListMenu>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
