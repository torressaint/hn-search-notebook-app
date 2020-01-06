import PropTypes from "prop-types";
import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

export default function AddSearchNotebookDialog(props) {
  const { open, onClose, onSave } = props;
  const [title, setTitle] = React.useState();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      maxWidth={"md"}
    >
      <DialogTitle id="form-dialog-title">New Search Notebook</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter search notebook title
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          fullWidth
          onChange={event => setTitle(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          disabled={!title}
          onClick={event => onSave(title)}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddSearchNotebookDialog.propTypes = {
  onSave: PropTypes.func,
  open: PropTypes.bool,
  onClose: PropTypes.func
};
