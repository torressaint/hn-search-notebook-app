import clsx from "clsx";
import _ from "lodash";
import React, { useEffect } from "react";

import { Tab, Tabs } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";

import * as algoliaService from "../services/AlgoliaSearch";
import * as searchQueryService from "../services/SearchQuery";
import { mainListItems, secondaryListItems } from "./ListItems";
import SearchBar from "./SearchBar";
import SearchNotebooks from "./SearchNotebooks";
import SearchResults from "./SearchResults";
import Statistics from "./Statistics";
import TabPanel from "./TabPanel";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://rafalswiatek.com/">
        Rafał Świątek
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  },
  tabPanel: {
    width: "100%"
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [data, setData] = React.useState({});
  const [restrictedAttributes] = React.useState([]);
  const [queryString, setQueryString] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [searchResultCount, setSearchResultCount] = React.useState(0);
  const [latestSearchQuery, setLatestSearchQuery] = React.useState();
  const [page, setPage] = React.useState(0);
  const [tab, setTab] = React.useState(0);

  const handleChange = (event, newTab) => {
    setTab(newTab);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const saveSearchQuery = (query, totalNumberOfHits, date = new Date()) => {
    searchQueryService
      .create(query, totalNumberOfHits, date)
      .then(({ searchQuery }) => setLatestSearchQuery(searchQuery));
  };

  useEffect(() => {
    const performSearch = (queryString, options) => {
      const { page, rowsPerPage, restrictedAttributes } = options;

      algoliaService
        .find({ query: queryString }, restrictedAttributes, page, rowsPerPage)
        .then(data => {
          setData(data.results);
          setSearchResultCount(data.itemsCount);
          saveSearchQuery(data.query, data.itemsCount);
        });
    };

    if (_.isEmpty(queryString)) {
      setData({});
      setPage(0);
      setSearchResultCount(0);

      return;
    }
    performSearch(queryString, { page, rowsPerPage, restrictedAttributes });
  }, [queryString, page, rowsPerPage, restrictedAttributes]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            HN Search application
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="HN Search" />
            <Tab label="Notebooks" />
            <Tab label="Statistics" />
          </Tabs>

          <Grid container spacing={3}>
            <TabPanel value={tab} index={0} className={classes.tabPanel}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <SearchBar
                    placeholder="Algolia search"
                    onChange={value => console.log(value)}
                    onSearch={queryString => setQueryString(queryString)}
                  />
                  <br />
                  <SearchResults
                    rows={data}
                    onChangePage={page => setPage(page)}
                    onChangeRowsPerPage={rowsPerPage =>
                      setRowsPerPage(rowsPerPage)
                    }
                    page={page}
                    rowsPerPage={rowsPerPage}
                    totalCount={searchResultCount}
                    query={latestSearchQuery}
                  />
                </Paper>
              </Grid>
            </TabPanel>
            <TabPanel value={tab} index={1} className={classes.tabPanel}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <SearchNotebooks />
                </Paper>
              </Grid>
            </TabPanel>
            <TabPanel value={tab} index={2} className={classes.tabPanel}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Statistics />
                </Paper>
              </Grid>
            </TabPanel>
          </Grid>
        </Container>
        <Copyright />
      </main>
    </div>
  );
}
