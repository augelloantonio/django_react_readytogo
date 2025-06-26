import React, { Component } from "react";
import { AppState } from "../../../services/AppState";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

var appState = AppState.getInstance();

interface HomePageState {}
interface HomePageProps {}

export class HomePage extends Component<HomePageProps, HomePageState> {
  public constructor(props: HomePageProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Box
          sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}
        >
            {appState.isLoggedIn() ? (
              <Typography variant="h1" padding={5} margin={5}>
                Welcome: {appState.getUserData()?.username}
              </Typography>
            ) : (
              <Typography variant="h1" padding={5} margin={5}>
                Welcome user, please Login to see content
              </Typography>
            )}
        </Box>
      </>
    );
  }
}

export default HomePage;
