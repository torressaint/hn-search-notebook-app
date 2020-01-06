import React, { useEffect } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import * as statisticsService from "../services/Statistics";
import Title from "./Title";

export default function Statistics(props) {
  const [statistics, setStatistics] = React.useState([]);

  const getSatistics = () => {
    statisticsService.getAll().then(statistics => {
      setStatistics(statistics);
    });
  };

  useEffect(() => {
    getSatistics();
  }, []);

  return (
    <React.Fragment>
      <Title>Statistics</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Query</TableCell>
            <TableCell>Average hits today</TableCell>
            <TableCell>Average hits last week</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {statistics &&
            statistics.length &&
            statistics.map(row => (
              <TableRow key={row.queryString}>
                <TableCell>{row.queryString}</TableCell>
                <TableCell>{row.avgNumberOfHitsToday}</TableCell>
                <TableCell>{row.avgNumberOfHitsWeekly}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
