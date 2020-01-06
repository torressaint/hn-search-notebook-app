/* eslint-disable no-script-url */

import React from "react";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Title from "./Title";

const useStyles = makeStyles({
  date: {
    flex: 1
  }
});

export default function Deposits({
  summaryDailyCount = 0,
  date = new Date().toDateString()
}) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Daily search count</Title>
      <Typography component="p" variant="h4">
        {`${summaryDailyCount}`}
      </Typography>
      <Typography color="textSecondary" className={classes.date}>
        {`on ${date}`}
      </Typography>
    </React.Fragment>
  );
}
