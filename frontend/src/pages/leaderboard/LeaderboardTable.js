// LeagueTable.js
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const LeaderboardTable = ({ selectedLeague }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Fetch table data based on the selected league
    const fetchTableData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/leagues/${selectedLeague}/teams`);
        const data = await response.json();
        setTableData(data);
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };

    if (selectedLeague) {
      fetchTableData();
    }
  }, [selectedLeague]);

  return (
    <TableContainer component={Paper} style={{ marginTop: "2em" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Team</TableCell>
            <TableCell>Matches</TableCell>
            <TableCell>Wins</TableCell>
            <TableCell>Losses</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
              <TableRow key={row.TeamID}>
                <TableCell>{row}</TableCell>
                <TableCell>{'5'}</TableCell>
                <TableCell>{'6'}</TableCell>
                <TableCell>{'7'}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeaderboardTable;
