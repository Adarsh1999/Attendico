const LoginStyles = theme => ({
  layout: {
    width: "auto",
    display: "flex", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: `${theme.spacing.unit * 5}px auto auto`,
    width: 250,
    height: 250,
    // backgroundColor: theme.palette.primary.light
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 1
  },
  pic: {
    marginTop: theme.spacing.unit * 3
  },
  fab: {
    marginTop: theme.spacing.unit * 3
  }
});

export default LoginStyles;
