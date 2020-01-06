/* eslint-disable no-script-url */

import _ from "lodash";
import React, { useEffect } from "react";

import {
  Button,
  IconButton,
  TablePagination,
  Tooltip
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import * as searchNotebookService from "../services/SearchNotebook";
import AddSearchNotebookDialog from "./AddSearchNotebookDialog";
import SearchNotebookDetails from "./SearchNotebookDetails";
import Title from "./Title";

export default function SearchNotebooks(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openDetails, setOpenDetails] = React.useState();
  const [selectedNotebook, setSelectedNotebook] = React.useState();
  const [searchNotebooks, setSearchNotebooks] = React.useState([]);
  const [openAddDialog, setOpenAddDialog] = React.useState(false);

  const getSearchNotebooks = () =>
    searchNotebookService
      .getAll()
      .then(({ searchNotebooks }) => setSearchNotebooks(searchNotebooks));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const saveSearchNotebook = title => {
    searchNotebookService
      .create(title)
      .then(searchNotebook => {
        setOpenAddDialog(false);
        getSearchNotebooks();
      })
      .catch(() => setOpenAddDialog(false));
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id, event) => {
    searchNotebookService
      .removeById(id)
      .then(getSearchNotebooks)
      .catch(() => null);
  };
  const showDetails = (notebook, event) => {
    setSelectedNotebook(notebook);
    setOpenDetails(true);
  };

  useEffect(() => {
    if (!selectedNotebook) return;

    const latestSelectedNotebook = _.find(
      searchNotebooks,
      ({ id }) => id === selectedNotebook.id
    );

    setSelectedNotebook(latestSelectedNotebook);
  }, [searchNotebooks, selectedNotebook]);

  useEffect(() => {
    getSearchNotebooks();
  }, [openDetails]);

  return (
    <React.Fragment>
      <Title>
        Search notebooks{"  "}
        <Tooltip title="Add">
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpenAddDialog(true)}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Title>
      <Table size="small">
        <colgroup>
          <col style={{ width: "40%" }} />
          <col style={{ width: "40%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Creation date</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchNotebooks &&
            searchNotebooks.length &&
            searchNotebooks.map(row => (
              <TableRow key={row.createdAt}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{new Date(row.createdAt).toDateString()}</TableCell>
                <TableCell align={"right"}>
                  <Button
                    color={"primary"}
                    onClick={_.partial(showDetails, row)}
                  >
                    <span>Show results</span>
                    <MoreVertIcon></MoreVertIcon>
                  </Button>
                </TableCell>
                <TableCell align={"right"}>
                  <Button
                    color={"primary"}
                    onClick={_.partial(handleDelete, row.id)}
                  >
                    <span>Delete</span>
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
        count={searchNotebooks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <SearchNotebookDetails
        notebook={selectedNotebook}
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        onDelete={() => {
          getSearchNotebooks();
        }}
      ></SearchNotebookDetails>
      <AddSearchNotebookDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSave={title => saveSearchNotebook(title)}
      ></AddSearchNotebookDialog>
    </React.Fragment>
  );
}
