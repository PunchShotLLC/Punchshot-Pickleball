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
    // Fetch standings data based on the selected league
    const fetchStandingsData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/leagues/${selectedLeague}/standings`);
        const teamsData = await response.json();
        const teamsArray = Object.entries(teamsData).map(([teamName, stats]) => ({
          teamName,
          ...stats
        }));
        setTableData(teamsArray);
      } catch (error) {
        console.error("Error fetching standings data:", error);
      }
    };
  
    if (selectedLeague) {
      fetchStandingsData();
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
          {tableData.map((team) => (
            <TableRow key={team.teamName}>
              <TableCell>{team.teamName}</TableCell>
              <TableCell>{team.losses + team.wins}</TableCell>
              <TableCell>{team.wins}</TableCell>
              <TableCell>{team.losses}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeaderboardTable;
