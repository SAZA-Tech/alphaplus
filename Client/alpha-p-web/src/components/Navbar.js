import {
  AppBar,
  Toolbar,
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
  Grid,
  Avatar,
  ButtonBase,
  Popper,
  Card,
  Typography,
  Container,
  CircularProgress,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { AccountCircle, Search, ExitToApp } from "@material-ui/icons";
import { useLazyQuery, useQuery } from "@apollo/client";
import { SEARCH_GQL } from "../graphql/searchGql";
import { userConfigVar } from "../storage/userConfig";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.primary,

    [theme.breakpoints.up("sm")]: {
      paddingRight: "79px",
      paddingLeft: "30px",
    },
    flexGrow: 1,
    paddingLeft: 0,
  },
  logo: {
    width: "180px",
    height: "41.5px",
    marginRight: theme.spacing(5),

    [theme.breakpoints.between("xs", "sm")]: {
      width: "135px",
      height: "32px",
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
    padding: theme.spacing(1, 6),
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
  SignInTypog: {
    fontSize: "24px",
  },

  avatar: {
    width: "36px",
    height: "36px",
    marginLeft: theme.spacing(-4),
  },

  divider: {
    marginBottom: theme.spacing(4),
  },
  drawerPaperColor: {
    "& .MuiDrawer-paper": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
  reslutPop: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2),
    width: "80%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
    "& .MuiTypography-root": {
      color: theme.palette.primary.contrastText,
      textDecoration: "none",
      marginTop: theme.spacing(1),
    },
  },
}));

export default function Header(props) {
  const context = useContext(AuthContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorSe, setAnchorSe] = React.useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const isSearching = Boolean(anchorSe);
  const isMenuOpen = Boolean(anchorEl);
  const [fetchSearchResults, { data, loading }] = useLazyQuery(SEARCH_GQL, {
    variables:
      searchTerm === ""
        ? null
        : {
            companyFilter: {
              Comname: searchTerm,
            },
            filter: {
              articleTitle: searchTerm,
            },
          },
  });
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
  const handleSearchTerm = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term === "") setAnchorSe(null);
    else {
      setAnchorSe(event.currentTarget);
      fetchSearchResults();
    }
  };
  const handleSearchBlur = () => {
    setAnchorSe(null);
  };
  const handleResultClick = (event) => {
    setAnchorSe(event?.currentTarget);
  };
  const searchResults = () => {
    const companyResult = ({ name, comId, link }) => {
      return (
        <>
          <Typography
            component={RouterLink}
            to={`/${link}/${comId}`}
            variant="subtitle2"
          >
            {name}
          </Typography>
          <Divider style={{ background: "white" }} />
        </>
      );
    };
    const results = () => {
      return (
        <Card className={classes.reslutPop}>
          {loading ? (
            <CircularProgress color={"inherit"} />
          ) : (
            <Container>
              <Typography variant="h6">Companies</Typography>
              <Divider style={{ background: "white", marginTop: "8px" }} />
              {data?.getCompanies.slice(0, 3).map((e) =>
                companyResult({
                  name: e.comname,
                  comId: e.id,
                  link: "company",
                })
              )}
              <Typography variant="h6">Articles</Typography>
              <Divider style={{ background: "white" }} />
              {data?.getArticles.slice(0, 3).map((e) =>
                companyResult({
                  name: e.articleTitle,
                  comId: e.id,
                  link: "article",
                })
              )}
            </Container>
          )}
        </Card>
      );
    };
    return (
      <Popper
        open={isSearching}
        placement={"bottom"}
        onMouseLeave={handleSearchBlur}
        onClickCapture={handleSearchBlur}
        anchorEl={anchorSe}
      >
        {results}
      </Popper>
    );
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
      <MenuItem
        onClick={handleMenuClose}
        component={RouterLink}
        to={context.user ? `/userProfile/${context.user.id}/` : `/Login`}
      >
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          component={RouterLink}
          to={context.user ? `/userProfile/${context.user.id}/` : `/Login`}
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>{" "}
      <MenuItem
        onClick={handleMenuClose}
        component={RouterLink}
        to="/ProfileSetting"
      >
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          component={RouterLink}
          to="/ProfileSetting"
        >
          <SettingsIcon />
        </IconButton>
        <p>Account Settings</p>
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
      title: "My Posts",
      link: context.user ? `/MyPosts/${context.user.id}/` : `/Login`,
    },
    {
      title: "My Portfolio",
      link: "/Portfolio",
    },
    // {
    //   title: "Sectors",
    //   dropdown: true,
    //   menu: [
    //     {
    //       title: "My Portfolio",
    //       link: "/Portfolio",
    //     },
    //   ],
    // },
  ];

  // const rightMenu = [
  //   {
  //     title: "Login",
  //     link: "/Login",
  //     isLoggedIn: false,
  //   },
  //   {
  //     title: "logut",
  //     link: "/",
  //     function: () => context.logout(),
  //     isLoggedIn: true,
  //   },
  // ];

  const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 1025
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
          value={searchTerm}
          // onBlur={handleSearchBlur}
          onChange={handleSearchTerm}
        />
        {searchResults()}
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
          className={classes.drawerPaperColor}
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>

        {Logo}

        <div>{searchBar()}</div>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return (
      <div>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item>
            <Avatar className={classes.avatar} src={""} />
          </Grid>

          <Grid item>
            <IconButton
              className={classes.SignInTypog}
              color="inherit"
              component={RouterLink}
              to={context.user ? `/userProfile/${context.user.id}` : "/Login"}
            >
              {context.user
                ? userConfigVar().username
                : `              Sign in
`}{" "}
            </IconButton>
          </Grid>
        </Grid>

        <Divider className={classes.divider} />
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
            <Link
              {...{
                component: RouterLink,
                to: context.user ? `/userProfile/${context.user.id}` : "/Login",
                color: "inherit",
                style: { textDecoration: "none" },
                key: 'Profile',
              }}
            >
              <MenuItem>Profile</MenuItem>
            </Link>
            <Link
              {...{
                component: RouterLink,
                to: "/ProfileSetting",
                color: "inherit",
                style: { textDecoration: "none" },
                key: 'AccountSettings',
              }}
            >
              <MenuItem>Account Settings</MenuItem>
            </Link>
            <MenuItem onClick={() => context.logout()}>Logout</MenuItem>
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
          ></Link>
        )}
      </div>
    );
  };

  const Logo = (
    <ButtonBase component={RouterLink} to="/" disableRipple="true">
      <img src="/logo.png" alt="logo" className={logo} />
    </ButtonBase>
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
