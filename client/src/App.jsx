import { Container } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
   return (
      <Router>
         <Container maxWidth="lg">
            <Navbar />
            <Switch>
               <Route exact path="/">
                  <Home />
               </Route>
            </Switch>
         </Container>
      </Router>
   );
};

export default App;
