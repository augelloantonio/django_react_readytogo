import React, { Component } from "react";
import { TextField } from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import AuthApiService from "../../../services/AuthApiService"; // Adjust the import path as necessary
import {AppState} from "../../../services/AppState";

var appState = AppState.getInstance();

interface LoginFormProps {
  onLoginSuccess: Function;
}

interface LoginFormState {
  username: string;
  password: string;
  error: string | null;
}

// Define any props if needed
export class LoginForm extends Component<LoginFormProps, LoginFormState> {
  public constructor(props: LoginFormProps) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: null,
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
  }

  private onLoginSuccess(){
    if(this.props.onLoginSuccess){
      return this.props.onLoginSuccess();
    }
  }

  /**
   * Handle username change
   * @param event
   * @returns
   */
  private onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: event.target.value });
  };

  /**
   * Handle password change
   * @param event
   * @returns
   */
  private onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
  };

  /**
   * Handle Login submit
   */
  private onLoginSubmit = async () => {
    let result = [];
    const requestBody = {
      username: this.state.username,
      password: this.state.password,
    };

    try {
      result = await AuthApiService.getInstance().userLogin(requestBody);
      if(result){
        appState.saveJwtToken(result.token);
        await this.saveCSRFToken();
        
        this.onLoginSuccess();
      }
    } catch (error) {
      console.error("Login failed:", error);
      this.setState({ error: "Login failed. Please try again." });
    }
  };

  /**
   * Get and Save CSRF token 
   */
  private async saveCSRFToken(){
    const csrfToken = await AuthApiService.getInstance().setCsfrToken();

    if(csrfToken.csrt_token){
      appState.saveCSRFToken(csrfToken.csrt_token);
    }
  }

  render() {
    const { username, password, error } = this.state;

    return (
      <>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Card sx={{ maxWidth: 400, padding: 2, border: "1px solid #ccc" }}>
            <h2>Login</h2>
            {/* Add any additional form elements or styling as needed */}
            <TextField
              value={username}
              label="Username"
              name="username"
              type="text"
              onChange={this.onUsernameChange}
              sx={{ padding: 1 }}
            />
            <TextField
              value={password}
              label="Password"
              name="password"
              type="password"
              onChange={this.onPasswordChange}
              sx={{ padding: 1 }}
            />
            <Box sx={{ marginTop: 2 }}>
              <button type="submit" onClick={this.onLoginSubmit}>
                Login
              </button>
            </Box>
          </Card>
        </Box>
      </>
    );
  }
}

export default LoginForm;
