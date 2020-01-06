import _ from "lodash";
import PropTypes from "prop-types";
import React, { useEffect } from "react";

import { MenuItem, Select, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

import * as searchNotebookService from "../services/SearchNotebook";

const useStyles = makeStyles(theme => ({
  select: {
    width: "300px"
  }
}));

export default function SearchNotebookPickerDialog(props) {
  const { open, onClose, onSave } = props;
  const classes = useStyles();
  const [selectedNotebook, setSelectedNotebook] = React.useState({});
  const [searchNotebooks, setSearchNotebooks] = React.useState([]);

  const getSearchNotebooks = () =>
    searchNotebookService
      .getAll()
      .then(({ searchNotebooks }) => setSearchNotebooks(searchNotebooks));

  useEffect(() => {
    if (open) getSearchNotebooks();
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      maxWidth={"md"}
    >
      <DialogTitle id="form-dialog-title">
        Add result to search notebook
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Please pick search notebook</DialogContentText>
        <Select
          className={classes.select}
          value={selectedNotebook}
          items={searchNotebooks}
          onChange={event => {
            setSelectedNotebook(event.target.value);
          }}
        >
          <MenuItem value="empty" key="emptyRepositoryProvider" disabled={true}>
            <Typography variant="caption">{"Pick notebook"}</Typography>
          </MenuItem>
          {_.map(searchNotebooks, item => (
            <MenuItem value={item} key={item.id}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={event => onSave(selectedNotebook)}
          disabled={!selectedNotebook}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SearchNotebookPickerDialog.propTypes = {
  onSave: PropTypes.func,
  open: PropTypes.bool,
  onClose: PropTypes.func
};
