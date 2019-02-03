import React from "react";
import PropTypes from "prop-types";

import { Avatar, Button } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";

import blue from "@material-ui/core/colors/blue";

import LoginStyles from "./styles/LoginStyles";

import Webcam from "react-webcam";

import Fab from "@material-ui/core/Fab";
import Refresh from "@material-ui/icons/Refresh";

import TextField from "@material-ui/core/TextField";

import { createPerson } from "./api/Person";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Snackbar from "@material-ui/core/Snackbar";

import SnackbarContentWrapper from "./components/SnackBarContent";

import { trainPersonGroupId } from "./api/Train";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: '"cursive"',
  },
  palette: {
    primary: { light: blue[300], main: blue[500], dark: blue[700] }
  }
});
 
class Register extends React.Component {
  state = {
    screenshot: null,
    picButtonDisable: false,
    name: "",
    rollno: "",
    phoneNo:"",
    personGroupId: "employees",
    personId: "",
    snackbar: false,
    snackVariant: "error",
    snackMsg: "Opsii, Face Not Detected"
  };

  handleClick = () => {
    const screenshot = this.webcam.getScreenshot();
    this.setState({ screenshot, picButtonDisable: true });
  };

  refreshImg = () => {
    this.setState({ screenshot: null, picButtonDisable: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);

    const image = this.state.screenshot;

    const params = {
      personGroupId: this.state.personGroupId,
      name: this.state.name,
      userData: JSON.stringify({
        rollNo : this.state.rollno,
        phoneNo : this.state.phoneNo
      })
    };

    const personCreated = createPerson(params)
      .then(response => response.json())
      .then(body => {
        this.setState(
          {
            personId: body.personId
          },

          () => {
            personCreated.then(
              fetch(image)
                .then(res => res.blob())
                .then(blobData => {
                  console.log(blobData);
                  fetch(
                    `https://centralindia.api.cognitive.microsoft.com/face/v1.0/persongroups/${
                      this.state.personGroupId
                    }/persons/${this.state.personId}/persistedFaces`,
                    {
                      method: "post",
                      headers: {
                        "Content-Type": "application/octet-stream",
                        "Ocp-Apim-Subscription-Key":
                        process.env.REACT_APP_FACE_API_KEY
                      },
                      processData: false,
                      body: blobData
                    }
                  )
                    .then(response => response.json())
                    .then(body => {
                      if (body.persistedFaceId) {
                        this.setState({
                          snackbar: true,
                          snackMsg: "Yeppi, Face Add Success",
                          snackVariant: "success"
                        });
                        const paramsT = {
                          personGroupId: this.state.personGroupId
                        };
                        trainPersonGroupId(paramsT);
                      } else {
                        this.setState({
                          snackbar: true
                        });
                      }
                    })

                    .catch(error => {
                      console.log(error);
                    });
                })
            );
          }
        );
      })

      .catch(console.error);
  };

  handleSnackbarClick = () => {
    this.setState({ snackbar: true });
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ snackbar: false });
  };

  render() {
    {
      const { classes } = this.props;

      const videoConstraints = {
        facingMode: "user"
      };

      
      return (
        <React.Fragment>
          <CssBaseline />
          <MuiThemeProvider theme={theme}>
            <div className={classes.appbar}>
              <AppBar
                position="sticky"
                color="primary"
                className={classes.appbar}
              >
                <Toolbar>
                  <Typography variant="h6" color="inherit">
                    Attendico
                  </Typography>
                </Toolbar>
              </AppBar>
            </div>
            <main className={classes.layout}>
              <div>
                <Avatar className={classes.avatar}>
                  {/* <LockIcon /> */}

                  {this.state.screenshot ? (
                    <img alt="ops" src={this.state.screenshot} />
                  ) : (
                    <Webcam
                      ref={node => (this.webcam = node)}
                      screenshotFormat="image/jpeg"
                      height={350}
                      width={350}
                      videoConstraints={videoConstraints}
                    />
                  )}
                </Avatar>

                <Paper className={classes.paper} elevation={8}>
                  <Typography component="h1" variant="h5">
                    Register
                  </Typography>
                  <form className={classes.form} onSubmit={this.handleSubmit}>
                    <TextField
                      id="name"
                      label="Name"
                      className={classes.textField}
                      value={this.state.name}
                      onChange={this.handleChange("name")}
                      margin="normal"
                      fullWidth
                    />
                    <TextField
                      id="rollno"
                      label="Rollno"
                      className={classes.textField}
                      value={this.state.rollno}
                      onChange={this.handleChange("rollno")}
                      margin="normal"
                      fullWidth
                    />
                    <TextField
                      id="phoneNo"
                      label="PhoneNo"
                      className={classes.textField}
                      value={this.state.phoneNo}
                      onChange={this.handleChange("phoneNo")}
                      margin="normal"
                      fullWidth
                    />

                    <Button
                      onClick={this.handleClick}
                      variant="contained"
                      color="primary"
                      className={classes.pic}
                      disabled={this.state.picButtonDisable}
                    >
                      Take pic
                    </Button>

                    <Fab
                      color="primary"
                      aria-label="Add"
                      className={classes.fab}
                      size="small"
                      onClick={this.refreshImg}
                    >
                      <Refresh />
                    </Fab>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Submit
                    </Button>
                  </form>
                </Paper>
              </div>
              <div>
                <Snackbar
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                  }}
                  open={this.state.snackbar}
                  autoHideDuration={3000}
                  onClose={this.handleSnackbarClose}
                >
                  <SnackbarContentWrapper
                    onClose={this.handleSnackbarClose}
                    variant={this.state.snackVariant}
                    message={this.state.snackMsg}
                  />
                </Snackbar>
              </div>
            </main>
          </MuiThemeProvider>
        </React.Fragment>
      );
    }
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(LoginStyles)(Register);
