import React from "react";

import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#f0ebeb"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

export default function SearchBar(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const { placeholder, onChange, onSearch } = props;

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        inputProps={{ "aria-label": "" }}
        onChange={event => {
          setValue(event.target.value);
          onChange(event.target.value);
        }}
        onKeyPress={event => {
          if (event.key === "Enter") {
            onSearch(value);
            event.preventDefault();
          }
        }}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={() => onSearch(value)}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
