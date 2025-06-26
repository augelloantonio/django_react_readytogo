import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { AppState } from "../services/AppState";
import { Link } from "react-router-dom";

var appState = AppState.getInstance();

interface ResponsiveAppBarProps {}
interface ResponsiveAppBarState {
  anchorElNav: null | HTMLElement;
  anchorElUser: null | HTMLElement;
}

class ResponsiveAppBar extends React.Component<
  ResponsiveAppBarProps,
  ResponsiveAppBarState
> {
  constructor(props: ResponsiveAppBarProps) {
    super(props);
    this.state = {
      anchorElNav: null,
      anchorElUser: null,
    };
  }

  handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorElNav: event.currentTarget });
  };

  handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorElUser: event.currentTarget });
  };

  handleCloseNavMenu = () => {
    this.setState({ anchorElNav: null });
  };

  handleLogout = () => {
    AppState.getInstance().logout();
    appState.navigateTo("/");
  };

  onMenuItemCLick = (page: string) => {
    this.handleCloseNavMenu();
    appState.navigateTo(page);
  };

  render() {
    const pages = ["Home"];
    const { anchorElNav, anchorElUser } = this.state;

    return (
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={this.handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={this.handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem
                    sx={{ color: "black" }}
                    key={page}
                    onClick={() => this.onMenuItemCLick(page)}
                  >
                    {page}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={this.handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link to={page}>{page}</Link>
                </Button>
              ))}
            </Box>

            {AppState.getInstance().isLoggedIn() ? (
              <Button color="inherit" onClick={this.handleLogout}>
                Logout
              </Button>
            ) : (
              <Button
                color="inherit"
                onClick={() => {
                  appState.navigateTo("/Login");
                }}
              >
                Login
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}
export default ResponsiveAppBar;

