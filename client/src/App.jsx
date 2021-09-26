import { Container } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth.jsx";

const App = () => {
  const user = localStorage.getItem("profile");
  return (
    <Router>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/auth">
            {user ? <Redirect to="/" /> : <Auth />}
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
