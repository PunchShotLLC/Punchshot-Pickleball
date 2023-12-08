import * as React from "react";
import { useEffect, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ScoreEnterBox from "./ScoreEnterBox";
import { UserContext } from "../../components/UserContext/usercontext";

const columns = [
  { id: "league", label: "League", minWidth: 150 },
  { id: "team1", label: "Team 1", minWidth: 120 },
  { id: "team2", label: "Team 2", minWidth: 120 },
  { id: "winner", label: "Winner", minWidth: 120 },
  { id: "score", label: "Score", minWidth: 120 },
];

export default function MatchesTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [matches, setMatches] = React.useState([]);
  const [enterScoreActive, setEnterScoreActive] = React.useState(false);
  const [selectedMatch, setSelectedMatch] = React.useState(null);
  const [selectedMatchIndex, setSelectedMatchIndex] = React.useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const editScore = (index) => {
    console.log("Check if the user is the captain of either team");
    let match = props.matches[index];

    if (!(user['Username'] === match['team1captain'] || user['Username'] === match['team2captain'])) {
      alert("You must be a captain of one of these teams to edit the score")
      return;
    }

    setSelectedMatch(match);
    setSelectedMatchIndex(index);
    setEnterScoreActive(true);
  };

  if (!enterScoreActive) {
    return (
      <Paper elevation={0} sx={{ width: "100%", overflow: "auto" }}>
        <TableContainer sx={{ maxHeight: "40vh", overflow: "auto" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      fontFamily: "Inter",
                      fontWeight: 700,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.matches
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      onClick={() => editScore(index)}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              fontFamily: "Inter",
                              fontWeight: 400,
                            }}
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
  } else {
    return (
      <ScoreEnterBox
        match={selectedMatch}
        matchIndex={selectedMatchIndex}
        league={props.league}
      />
    );
  }
}