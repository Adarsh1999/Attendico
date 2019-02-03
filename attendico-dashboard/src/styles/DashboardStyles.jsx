const drawerWidth = 240;

const DashboardStyles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  title: {
    flexGrow: 1
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: "200vh",
    overflow: "auto"
  },
  tableContainer: {
    height: "520px",
    marginBottom: theme.spacing.unit * 5
  },
  allListConstainer:{
    marginTop: theme.spacing.unit * 5
  }
});

export default DashboardStyles;
