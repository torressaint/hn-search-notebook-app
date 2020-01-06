import _ from "lodash";
import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TablePagination
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";

import * as searchResultsService from "../services/SearchResult";

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  },
  url: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    maxWidth: "100px"
  }
}));

export default function SearchNotebookDetails(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { notebook = {}, open = false, onClose, onDelete } = props;

  const rows = notebook.searchResults || [];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const removeSearchResultFromNotebook = searchResultId => {
    searchResultsService
      .removeById(searchResultId)
      .then(() => onDelete())
      .catch(() => alert("Unable to delete search result from notebook"));
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={"xl"}
      >
        <DialogTitle id="form-dialog-title">Notebook details</DialogTitle>
        <DialogContent>
          <DialogContentText>{notebook.title}</DialogContentText>
          <DialogContentText>{`Results count:${rows.length ||
            0}`}</DialogContentText>
          <Table size="small">
            <colgroup>
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell>Author</TableCell>
                <TableCell>Karma</TableCell>
                <TableCell>Url</TableCell>
                <TableCell>Creation date</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell>Query</TableCell>

                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows.length &&
                rows.map(row => (
                  <TableRow key={row.created_at}>
                    <TableCell>{row.author}</TableCell>
                    <TableCell>{row.karma}</TableCell>
                    <TableCell className={classes.url}>{row.url}</TableCell>
                    <TableCell>
                      {new Date(row.createdAt).toDateString()}
                    </TableCell>
                    <TableCell>
                      {row.tags ? row.tags.join(", ") : null}
                    </TableCell>
                    <TableCell>
                      {_.get(row, "SearchQuery.queryString")}
                    </TableCell>
                    <TableCell align={"right"}>
                      <Button
                        color={"primary"}
                        onClick={_.partial(
                          removeSearchResultFromNotebook,
                          row.id
                        )}
                      >
                        <span>Delete from notebook</span>
                        <DeleteIcon></DeleteIcon>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={rows.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
