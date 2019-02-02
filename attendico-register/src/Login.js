import React from "react";
import PropTypes from "prop-types";

import { Avatar, Button } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
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
import { addPersonFace } from "./api/Person";

const theme = createMuiTheme({
  palette: {
    primary: { light: blue[300], main: blue[500], dark: blue[700] }
  }
});



class SignIn extends React.Component {
  state = {
    screenshot: null,
    picButtonDisable: false,
    name: "",
    rollno: "",
    personGroupId: "employees",
    lastCreatedPersonId: "ac7ccaa8-2e26-4a6a-9d22-fee4f0b15335"
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

  setLastCreatedPersonId = data => {
    this.setState({
      lastCreatedPersonId: data
    });
    console.log(this.state.lastCreatedPersonId);
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);

    const image = this.state.screenshot;
    
    fetch(image)
      .then(res => res.blob())
      .then(blobData => {
        console.log(blobData)
        fetch(
          "https://centralindia.api.cognitive.microsoft.com/face/v1.0/persongroups/employees/persons/ac7ccaa8-2e26-4a6a-9d22-fee4f0b15335/persistedFaces",
          {
            method: "post",
            headers: {
              "Content-Type": "application/octet-stream",
              "Ocp-Apim-Subscription-Key": process.env.REACT_APP_FACE_API_KEY
            },
            processData: false,
            body: blobData
          }
        ).then(response => {
          console.log(response.json());
        });
      });
  };

  render() {
    {
      const { classes } = this.props;
      return (
        <React.Fragment>
          <CssBaseline />
          <MuiThemeProvider theme={theme}>
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
            </main>
          </MuiThemeProvider>
        </React.Fragment>
      );
    }
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(LoginStyles)(SignIn);
