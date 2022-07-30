import React from "react";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import FacebookIcon from "@mui/icons-material/Facebook";
import Paper from "@material-ui/core/Paper";
import blue from "@material-ui/core/colors/indigo";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const useStyles = makeStyles((theme) => ({
  footline: {
    paddingLeft: 30,
    paddingTop: 30,
    color: "white",
  },
  subline: {
    //paddingLeft: 30,
    fontSize: 20,
    color: "white",
  },
  icons: {
    alignItems: "center",
  },
  bgc: {
    backgroundColor: blue[900],
  },
}));

function Foot() {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.bgc}>
        <Typography variant="h4" className={classes.footline}>
          {" "}
          MULTILINGUAL EDUCATION
          <br />
          SYSTEM <FacebookIcon style={{ paddingLeft: 800 }} />{" "}
          <TwitterIcon style={{ paddingLeft: 7 }} />
          <InstagramIcon style={{ paddingLeft: 15 }} />{" "}
          <LinkedInIcon style={{ paddingLeft: 10 }} />
          <p className={classes.subline}>
            {" "}
            The free, fun and effective way of learning English!
          </p>
        </Typography>
        <br />
      </Paper>
    </div>
  );
}

export default Foot;
