import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
    Divider,
    Button,
    Paper,
    Grid,
    Avatar,
    TextField,

} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PictureInPictureIcon from '@material-ui/icons/PictureInPicture';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// const img = "avatars/7.jpg";
// const userInfo = {
//     name: "Jhon Doe",
//     img: img,
//     bio: "Analyst",
// };
const drawerWidth = 210;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },

    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },

    appBar: {
        marginTop: theme.spacing(8),
        [theme.breakpoints.between("md", "xl")]: {
            marginTop: theme.spacing(8.5),
        },
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },

    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    //   toolbar: theme.mixins.toolbar,
    drawerPaper: {
        position: 'absolute',
        width: drawerWidth,
        marginTop: theme.spacing(8.5),
        height: theme.spacing(65.5),
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
        width: '100%',
        padding: theme.spacing(5),
        paddingTop: theme.spacing(7)

    },

    avatar: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },

    NameTypog: {
        fontWeight: "bold",
        fontSize: "20px"
    },

    inputValue: {
        fontSize: "20px",
        color: "grey"
    },

    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '35ch',
    },

    textFieldBio: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '35ch',
        [theme.breakpoints.between("md", "xl")]: {
            width: '74ch',
        },
    },

    ReqEditBtn: {
        [theme.breakpoints.between("md", "xl")]: {
            marginTop: theme.spacing(5),
        },
    }

}));

function ProfileSetting(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const itemsList = [
        {
            text: "Profile",
            icon: <PictureInPictureIcon />,
            onClick: () => history.push("/ProfileSetting")
        },
        {
            text: "Account Securty",
            icon: <VerifiedUserIcon />,
            onClick: () => history.push("/AccountSecurty")
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

                    )
                })}
            </List>
            <List>
                <ListItem>
                    <Button className={classes.helpButton} variant="outlined">Help</Button></ListItem></List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

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
                        Profile
          </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant='temporary'
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
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
                        container
                        direction="row"
                        justify='center'
                        alignItems="flex-start"
                        spacing={6}
                    >

                        <Grid item>
                            <Avatar className={classes.avatar} alt={props.name} src={""} />
                        </Grid>

                        <Grid item xs
                            container
                            direction="column"
                            justify='flex-start'
                            alignItems="flex-start"
                            spacing={3}
                        >

                            <Grid item
                                container
                                direction="row"
                                justify='flex-start'
                                alignItems="center"
                                spacing={3}>

                                <Grid item>
                                    <TextField
                                        label="First name"
                                        id="margin-none"
                                        // defaultValue=""
                                        className={classes.textField}
                                    />
                                </Grid>

                                <Grid item>
                                    <TextField
                                        label="Last name"
                                        id="margin-normal"
                                        // defaultValue=""
                                        className={classes.textField}
                                    />
                                </Grid>
                            </Grid>

                            <Grid item>
                                <TextField
                                    label="Username"
                                    id="margin-normal"
                                    // defaultValue=""
                                    className={classes.textField}
                                />
                            </Grid>

                            <Grid item>
                                <TextField
                                    className={classes.textFieldBio}
                                    id="standard-multiline-flexible"
                                    label="Bio"
                                    multiline
                                    rowsMax={4}
                                />
                            </Grid>

                            <Grid item
                                container
                                direction="row"
                                justify='flex-start'
                                alignItems="center"
                                spacing={3}>

                                <Grid item>
                                    <TextField
                                        label="Compony"
                                        id="margin-none"
                                        // defaultValue=""
                                        className={classes.textField}
                                    />
                                </Grid>


                                <Grid item>
                                    <TextField
                                        label="Linkedin"
                                        id="margin-normal"
                                        // defaultValue=""
                                        className={classes.textField}
                                    />
                                </Grid>
                            </Grid>

                            <Grid item
                                container
                                direction="row"
                                justify='flex-start'
                                alignItems='flex-end'
                                spacing={1}>
                                <Grid item>
                                    <Button variant="contained" size="medium" color="primary" className={classes.ReqEditBtn}>
                                        Request To Be Analyst
                                </Button>
                                </Grid>

                                <Grid item>
                                    <Button variant="contained" size="medium" color="primary" className={classes.ReqEditBtn}>
                                        Edit
                                </Button>
                                </Grid>


                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </main>
        </div>
    );
}

ProfileSetting.propTypes = {

    window: PropTypes.func,
};
export default ProfileSetting