import _ from "lodash";
import React from "react";

import { Button, TablePagination } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

import * as searchResultsService from "../services/SearchResult";
import SearchNotebookPickerDialog from "./SearchNotebookPickerDialog";
import Title from "./Title";

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

export default function SearchResults(props) {
  const classes = useStyles();
  const [selectedResult, setSelectedResult] = React.useState();
  const [
    openSearchNotebookPicker,
    setOpenSearchNotebookPicker
  ] = React.useState(false);

  const {
    onChangePage = _.noop,
    onChangeRowsPerPage = _.noop,
    page,
    rowsPerPage,
    totalCount,
    query
  } = props;

  const handleChangePage = (event, newPage) => {
    onChangePage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    onChangeRowsPerPage(parseInt(event.target.value, 10));
    onChangePage(0);
  };

  const showNotebookPicker = searchResult => {
    setSelectedResult(searchResult);
    setOpenSearchNotebookPicker(true);
  };

  const addSearchResultToNotebook = (searchResult, notebookId, queryId) => {
    searchResultsService
      .create(searchResult, notebookId, queryId)
      .then(searchResult => {
        setOpenSearchNotebookPicker(false);
      })
      .catch(() => setOpenSearchNotebookPicker(false));
  };

  return (
    <React.Fragment>
      <Title>Recent results</Title>
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
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows &&
            props.rows.length &&
            props.rows.map(row => (
              <TableRow key={row.created_at}>
                <TableCell>{row.author}</TableCell>
                <TableCell>{row.karma}</TableCell>
                <TableCell className={classes.url}>{row.url}</TableCell>
                <TableCell>{new Date(row.created_at).toDateString()}</TableCell>
                <TableCell>{row._tags.join(", ")}</TableCell>
                <TableCell
                  align={"right"}
                  classes={{ root: classes.buttonCell }}
                >
                  <Button
                    color={"primary"}
                    onClick={_.partial(showNotebookPicker, row)}
                  >
                    <span>Add to notebook</span>
                    <AddIcon></AddIcon>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />

      <SearchNotebookPickerDialog
        open={openSearchNotebookPicker}
        onSave={searchNotebook => {
          addSearchResultToNotebook(
            selectedResult,
            searchNotebook.id,
            query.id
          );
        }}
        onClose={() => setOpenSearchNotebookPicker(false)}
      ></SearchNotebookPickerDialog>
    </React.Fragment>
  );
}
