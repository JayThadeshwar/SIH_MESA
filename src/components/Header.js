import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  headline: {
    color: "black",
    paddingLeft: 30,
  },
}));

function Head() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <h2 className={classes.headline}> MULTILINGUAL EDUCATION SYSTEM</h2>
    </AppBar>
  );
}

export default Head;
