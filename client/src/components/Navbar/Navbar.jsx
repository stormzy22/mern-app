import React from "react";
import { AppBar, Link, Typography } from "@material-ui/core";
import useStyles from "./styles";
const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          className={classes.heading}
          component={Link}
          to="/"
          variant="h2"
          align="center"
        >
          Mems
        </Typography>
        <img
          src="/images/favicon.ico"
          alt="memories_logo"
          width="80"
          height="80"
          className={classes.image}
        />
      </div>
    </AppBar>
  );
};

export default Navbar;
