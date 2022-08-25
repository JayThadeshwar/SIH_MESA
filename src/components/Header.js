import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/styles";
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  headline: {
    color: "black",
    paddingLeft: 30,
  },
}));

function Head() {
  const {t} = useTranslation()
  const classes = useStyles();

  return (
    <AppBar position="static">
      <h2 className={classes.headline}>{t("headline")}</h2>
    </AppBar>
  );
}

export default Head;
