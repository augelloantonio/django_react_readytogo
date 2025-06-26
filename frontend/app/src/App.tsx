import { Component } from "react";
import { Box } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppState } from "./services/AppState";
import ResponsiveAppBar from "./components/AppBar";
import { HomePage } from "./apps/HomeManagement/pages/HomePage";
import LoginPage from "./apps/AccountManagement/pages/LoginPage";

const appState = AppState.getInstance();

export default class App extends Component<{}, { rerenderCount: number }> {
  constructor(props: any) {
    super(props);

    this.state = { rerenderCount: 0 };
    this.forceRender = this.forceRender.bind(this);

    appState.setReRenderUiFunc(this.forceRender);
    appState.loadStorageParameters();
    appState.checkJWTValidation();
  }

  async forceRender() {
    await this.setState({ rerenderCount: this.state.rerenderCount + 1 });
  }

  render() {
    const loggedIn = appState.isLoggedIn();

    return (
      <>
      {appState.getNavigatorObj()}
        <ResponsiveAppBar />
        <Box sx={{ minWidth: "100%" }}>
          <Routes>
             <Route path="/" element={<HomePage />} />
            {loggedIn ? (
              <>
                {/* match exactly "/" */}
                <Route path="/" element={<HomePage />} />
                {/* anything else → back to "/" */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            ) : (
              <>
                {/* explicit login path */}
                <Route path="/login" element={<LoginPage />} />
                {/* all other URLs → redirect to /login */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </Box>
      </>
    );
  }
}
