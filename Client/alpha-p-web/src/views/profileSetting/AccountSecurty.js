import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  Divider,
  Button,
  Paper,
  Grid,
  // Avatar,
  TextField,
  Input,
  InputLabel,
  FormControl,
  Container,
} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import PictureInPictureIcon from "@material-ui/icons/PictureInPicture";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Modal from "@material-ui/core/Modal";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

// const img = "avatars/7.jpg";
// const userInfo = {
//     name: "Jhon Doe",
//     img: img,
//     bio: "Analyst",
// };

const drawerWidth = 210;

const useStyles = makeStyles((theme) => ({
  paper: {
    [theme.breakpoints.between("xs", "sm")]: {
      // marginLeft: theme.spacing(5.13),

      width: "100%",
    },
    position: "absolute",
    width: "448px",
    // height: '471px',
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.between("sm", "md")]: {
      width: "448px",
    },
  },

  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginTop: theme.spacing(8),
    [theme.breakpoints.between("md", "xl")]: {
      marginTop: theme.spacing(8.5),
    },
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  //   toolbar: theme.mixins.toolbar,
  drawerPaper: {
    position: "absolute",
    width: drawerWidth,
    marginTop: theme.spacing(8.5),
    height: theme.spacing(45.2),
  },

  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    paddingTop: theme.spacing(7),
    [theme.breakpoints.between("md", "xl")]: {
      paddingTop: theme.spacing(8),
    },
  },

  helpButton: {
    marginLeft: drawerWidth / 6,
    width: theme.spacing(14),
    marginTop: theme.spacing(3.5),
  },
  profilePaper: {
    width: "100%",
    padding: theme.spacing(5),
    paddingTop: theme.spacing(7),

    [theme.breakpoints.between("md", "xl")]: {
      paddingTop: theme.spacing(13),
    },
  },

  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },

  NameTypog: {
    fontWeight: "bold",
    fontSize: "20px",
  },

  inputValue: {
    fontSize: "20px",
    color: "grey",
  },

  textField: {
    marginRight: theme.spacing(1),
    width: "35ch",
    [theme.breakpoints.between("md", "xl")]: {
      marginLeft: theme.spacing(15),
    },
  },

  textFieldBio: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "35ch",

    [theme.breakpoints.between("md", "xl")]: {
      width: "74ch",
    },
  },

  ReqEditBtn: {
    [theme.breakpoints.between("md", "xl")]: {
      marginTop: theme.spacing(5),
    },
  },

  ChaRestBtn: {
    width: theme.spacing(12),
    marginLeft: theme.spacing(7),
  },

  CancelBtn: {
    fontSize: "20px",
    fontWeight: "700",
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: "14px",
    },
  },

  ChPasswordBtn: {
    fontSize: "24px",
    color: "grey",
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: "16px",
    },
  },

  ChPasstextField: {
    [theme.breakpoints.between("xs", "sm")]: {
      width: "300px",
    },

    marginTop: theme.spacing(5),
    width: "366px",
  },

  DoneBtn: {
    width: "320px",
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(2.5),
  },

  ForgetTypog: {
    color: "grey",
    fontWeight: "500",
    fontSize: "14px",
  },

  ResetHereBtn: {
    color: "blue",
    fontWeight: "500",
    fontSize: "14px",
  },

  PopperPassword: {
    [theme.breakpoints.between("xs", "sm")]: {
      width: "100%",
      marginLeft: "-6px",
    },
  },

  textFieldChEmail: {
    width: "42ch",
    [theme.breakpoints.between("md", "xl")]: {
      width: "48ch",
    },
  },

  ChEmailBtn: {
    width: "320px",
    marginTop: theme.spacing(3.5),
    // marginBottom: theme.spacing(2.5),
  },
}));

function AccountSecurty(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [values, setValues] = React.useState({
    NewPassword: "",
    CurrentPassword: "",
    VerifyPassword: "",
    password: "",
    showPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const itemsList = [
    {
      text: "Profile",
      icon: <PictureInPictureIcon />,
      onClick: () => history.push("/ProfileSetting"),
    },
    {
      text: "Account Securty",
      icon: <VerifiedUserIcon />,
      onClick: () => history.push("/AccountSecurty"),
    },
  ];
  const { history } = props;
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {itemsList.map((item, index) => {
          const { text, icon, onClick } = item;
          return (
            <ListItem button key={text} onClick={onClick}>
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>

      <List>
        <ListItem>
          <Button className={classes.helpButton} variant="outlined">
            Help
          </Button>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const [modalStyle] = React.useState(getModalStyle);
  const [openChange, setOpenChange] = React.useState(false);
  const handleOpenChange = () => {
    setOpenChange(true);
  };
  const handleCloseChange = () => {
    setOpenChange(false);
  };
  const [openReset, setOpenReset] = React.useState(false);
  const handleOpenReset = () => {
    setOpenReset(true);
  };
  const handleCloseReset = () => {
    setOpenReset(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" color="white" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap>
            Account Securty
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div />
        <Paper className={classes.profilePaper} elevation={0}>
          <Grid
            item
            xs
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            spacing={7}
          >
            <Grid
              item
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-end"
              spacing={2}
            >
              <Grid item>
                <TextField
                  label="Email"
                  id="margin-none"
                  InputProps={{
                    readOnly: true,
                  }}
                  defaultValue="UserEmail@gmail.com"
                  // defaultValue=""
                  className={classes.textField}
                  // helperText="Some important text"
                />
              </Grid>
              <Grid item>
                <Button
                  onClick={handleOpenChange}
                  // aria-describedby={idChange}
                  variant="contained"
                  size="medium"
                  color="primary"
                  className={classes.ChaRestBtn}
                >
                  Change
                </Button>

                <Modal
                  disablePortal
                  disableEnforceFocus
                  disableAutoFocus
                  open={openChange}
                  onClose={handleCloseChange}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  <div style={modalStyle} className={classes.paper}>
                    <Grid
                      item
                      container
                      direction="column"
                      justify="flex-start"
                      alignItems="center"
                      spacing={6}
                    >
                      <Grid
                        item
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                        spacing={10}
                      >
                        <Grid item>
                          <Typography className={classes.ChPasswordBtn}>
                            Change password
                          </Typography>
                        </Grid>
                        <Grid item>
                          {" "}
                          <Button onClick={handleCloseChange}>
                            <Typography className={classes.CancelBtn}>
                              Cancel
                            </Typography>
                          </Button>
                        </Grid>
                      </Grid>

                      <Grid item>
                        <TextField
                          label="New Email"
                          id="margin-none"
                          // defaultValue=""
                          className={classes.textFieldChEmail}
                        />
                      </Grid>

                      <Grid item>
                        <Button
                          variant="contained"
                          size="medium"
                          color="primary"
                          className={classes.ChEmailBtn}
                        >
                          Change
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </Modal>
              </Grid>
            </Grid>

            <Grid
              item
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-end"
              spacing={2}
            >
              <Grid item>
                <TextField
                  label="Password"
                  id="margin-none"
                  type="password"
                  defaultValue="11111111"
                  InputProps={{
                    readOnly: true,
                  }}
                  className={classes.textField}
                />
              </Grid>

              <Grid item>
                <Button
                  onClick={handleOpenReset}
                  variant="contained"
                  size="medium"
                  color="primary"
                  className={classes.ChaRestBtn}
                >
                  Reset
                </Button>

                <Modal
                  disablePortal
                  disableEnforceFocus
                  disableAutoFocus
                  open={openReset}
                  onClose={handleCloseReset}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  <div style={modalStyle} className={classes.paper}>
                    <Grid
                      item
                      container
                      direction="column"
                      justify="flex-start"
                      alignItems="center"
                      spacing={2}
                    >
                      <Grid
                        item
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                        spacing={10}
                      >
                        <Grid item>
                          <Typography className={classes.ChPasswordBtn}>
                            Change password
                          </Typography>
                        </Grid>
                        <Grid item>
                          {" "}
                          <Button onClick={handleCloseReset}>
                            <Typography className={classes.CancelBtn}>
                              Cancel
                            </Typography>
                          </Button>
                        </Grid>
                      </Grid>

                      <Grid item>
                        <FormControl>
                          <InputLabel htmlFor="standard-adornment-password">
                            Enter current password
                          </InputLabel>
                          <Input
                            className={classes.ChPasstextField}
                            id="standard-adornment-password"
                            type={values.showPassword ? "text" : "password"}
                            value={values.CurrentPassword}
                            onChange={handleChange("CurrentPassword")}
                            endAdornment={
                              <InputAdornment>
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {values.showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </Grid>

                      <Grid item>
                        <FormControl>
                          <InputLabel htmlFor="standard-adornment-password">
                            Enter new password
                          </InputLabel>
                          <Input
                            className={classes.ChPasstextField}
                            id="standard-adornment-password"
                            type={values.showPassword ? "text" : "password"}
                            value={values.NewPassword}
                            onChange={handleChange("NewPassword")}
                            endAdornment={
                              <InputAdornment>
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {values.showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </Grid>

                      <Grid item>
                        <FormControl>
                          <InputLabel htmlFor="standard-adornment-password">
                            {" "}
                            Verify password
                          </InputLabel>
                          <Input
                            className={classes.ChPasstextField}
                            id="standard-adornment-password"
                            type={values.showPassword ? "text" : "password"}
                            value={values.VerifyPassword}
                            onChange={handleChange("VerifyPassword")}
                            endAdornment={
                              <InputAdornment>
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {values.showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </Grid>

                      <Grid item>
                        <Button
                          variant="contained"
                          size="medium"
                          color="primary"
                          className={classes.DoneBtn}
                        >
                          Done
                        </Button>
                      </Grid>

                      <Container>
                        {" "}
                        <Divider variant="middle" />{" "}
                      </Container>

                      <Grid
                        item
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={0}
                      >
                        <Grid item>
                          {" "}
                          <Typography className={classes.ForgetTypog}>
                            Forget Password?
                          </Typography>
                        </Grid>
                        <Grid item>
                          {" "}
                          <Button className={classes.ResetHereBtn}>
                            Reset here
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                </Modal>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </main>
    </div>
  );
}

AccountSecurty.propTypes = {
  window: PropTypes.func,
};
export default AccountSecurty;
