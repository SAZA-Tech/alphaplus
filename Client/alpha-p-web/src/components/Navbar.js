import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
  fade,
  InputBase,
  Menu,
  Divider,
  List,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { AccountCircle, Search, ExitToApp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.primary,

    [theme.breakpoints.up("sm")]: {
      paddingRight: "79px",
      paddingLeft: "118px",
      
    },
    flexGrow: 1,
    paddingLeft: 0,
  },
  logo: {
    fontFamily: "sans-serif",
    fontStyle: "normal",
    fontWeight: "bold",
    marginRight: theme.spacing(5),
    /* or 54px */
    textDecoration: "none",
    "&:visited": {
      color: theme.palette.common.white,
    },
    letterSpacing: "2px",
    // display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      fontSize: "36px",
      lineHeight: "150%",
    },
  },
  leftMenu: {
    paddingTop: theme.spacing(4),
  },
  menuButton: {
    display: "inline-block",

    fontFamily: "Open Sans, sans-serif",
    fontWeight: 400,
    size: theme.typography.fontSize,
    marginLeft: theme.spacing(4),
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawerContainer: {
    padding: theme.spacing(3, 6),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "80%",
    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing(2),

      marginLeft: theme.spacing(12),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "80%",
    [theme.breakpoints.up("md")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  rightMenu: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,

    // marginRight: theme.spacing(2),
    marginLeft: theme.spacing(20),
    color: theme.palette.primary,
  },
  loginBtn: {
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.9),
      color: theme.palette.getContrastText(theme.palette.common.white),
    },
  },
}));

export default function Header(props) {
  const context = useContext(AuthContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const loggingOut = () => {
    handleMenuClose();
    context.logout();
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>{" "}
      <MenuItem onClick={loggingOut}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={loggingOut}
        >
          <ExitToApp />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  const leftMenu = [
    {
      title: "My Authers",
      link: context.user ? `/MyAuthers/${context.user.id}/` : `/Login`,
    },
    {
      title: "My Portfolio",
      link: "/Portfolio",
    },
    {
      title: "Sectors",
      dropdown: true,
      menu: [
        {
          title: "My Portfolio",
          link: "/Portfolio",
        },
      ],
    },
  ];

  const rightMenu = [
    {
      title: "Login",
      link: "/Login",
      isLoggedIn: false,
    },
    {
      title: "logut",
      link: "/",
      function: () => context.logout(),
      isLoggedIn: true,
    },
  ];

  const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);
  const searchBar = () => {
    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <Search />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
    );
  };
  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {Logo}
        <div className={classes.leftMenu}>{getLeftMenu()}</div>
        {/* Search Bar */}
        <div>{searchBar()}</div>
        {/* Righ Menu */}
        <div> {getRightMenu()}</div>
        {renderMenu}
      </Toolbar>
    );
  };
  const getRightMenu = () => {
    return (
      <div className={classes.rightMenu}>
        {context.user ? (
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        ) : (
          <Button
            className={classes.loginBtn}
            variant="outlined"
            color="inherit"
            component={RouterLink}
            to="/Login"
          >
            Login
          </Button>
        )}
      </div>
    );
  };
  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>

        <div>{Logo}</div>
        <div>{searchBar()}</div>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return (
      <div>
        {leftMenu.map((e) => {
          return (
            <Link
              {...{
                component: RouterLink,
                to: e.link,
                color: "inherit",
                style: { textDecoration: "none" },
                key: e.title,
              }}
            >
              <MenuItem>{e.title}</MenuItem>
            </Link>
          );
        })}
        <Divider />
        {context.user ? (
          <List>
            <MenuItem>Profile</MenuItem>

            <MenuItem component={Button} onClick={() => context.logout()}>
              Logout
            </MenuItem>
          </List>
        ) : (
          <Link
            {...{
              component: RouterLink,
              to: "/Login",
              color: "inherit",
              style: { textDecoration: "none" },
              key: "Login",
            }}
          >
            <MenuItem>Login</MenuItem>
          </Link>
        )}
      </div>
    );
  };

  const Logo = (
    <Typography variant="h6" component="h1" className={logo}>
      Alpha+
    </Typography>
  );

  const getLeftMenu = () => {
    return leftMenu.map((e) => {
      return (
        <Button
          {...{
            key: e.title,
            color: "inherit",
            to: e.link,
            component: RouterLink,
            className: menuButton,
          }}
        >
          {e.title}
        </Button>
      );
    });
  };

  return (
    <div>
      <AppBar className={header} position="static">
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </div>
  );
}
