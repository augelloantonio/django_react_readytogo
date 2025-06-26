import React, { Component } from "react";
import LoginForm from "../components/LoginForm"; // Adjust the import path as necessary
import { Link, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";

interface LoginPageState {
  loginSuccess: boolean;
}
interface LoginPageProps {}

export class LoginPage extends Component<LoginPageProps, LoginPageState> {
  public constructor(props: LoginPageProps) {
    super(props);
    this.state = {
      loginSuccess: false,
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
  }

  /**
   * Login success handler
   */
  private onLoginSuccess() {
    this.setState({
      loginSuccess: true,
    });
  }

  render() {
    if (this.state.loginSuccess) {
      return <Navigate to="/Home" />;
    }
    return (
      <>
        <Box
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <LoginForm onLoginSuccess={this.onLoginSuccess} />
        </Box>
      </>
    );
  }
}

export default LoginPage;
