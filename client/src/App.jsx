import { Container } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Auth from "./components/Auth/Auth.jsx";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import PostDetail from "./components/PostDetails/PostDetails.jsx";

const App = () => {
  const user = localStorage.getItem("profile");
  return (
    <Router>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route exact path="/" component={() => <Redirect to={`/posts`} />} />
          <Route exact path="/posts" component={Home} />
          <Route exact path="/posts/search" component={Home} />
          <Route exact path="/posts/:id" component={PostDetail} />
          <Route exact path="/auth" component={() => (!user ? <Auth /> : <Redirect to={`/`} />)} />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
