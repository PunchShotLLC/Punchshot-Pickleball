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
  const cellStyle = { fontSize: "1.5rem" };

  useEffect(() => {
    // Fetch standings data based on the selected league
    const fetchStandingsData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/leagues/${selectedLeague}/standings`
        );
        const teamsData = await response.json();
        const teamsArray = Object.entries(teamsData).map(
          ([teamName, stats]) => ({
            teamName,
            ...stats,
          })
        );
        // sort the array based on teamWins with tiebreakers being matchWins then teamLosses then matchLosses
        teamsArray.sort((a, b) => {
          if (a.teamWins === b.teamWins) {
            if (b.matchWins === a.matchWins) {
              if (b.teamLosses === a.teamLosses) {
                return a.matchLosses - b.matchLosses;
              }
              return a.teamLosses - b.teamLosses;
            }
            return b.matchWins - a.matchWins;
          }
          return b.teamWins - a.teamWins;
        });
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
    <TableContainer component={Paper} sx={{ maxHeight: "90vh" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={cellStyle}>Team </TableCell>
            <TableCell style={cellStyle}>Team Wins</TableCell>
            <TableCell style={cellStyle}>Team Losses</TableCell>
            <TableCell style={cellStyle}>Matches Won</TableCell>
            <TableCell style={cellStyle}>Matches Lost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((team) => (
            <TableRow key={team.teamName}>
              <TableCell style={cellStyle}>{team.teamName}</TableCell>
              <TableCell style={cellStyle}>{team.teamWins}</TableCell>
              <TableCell style={cellStyle}>{team.teamLosses}</TableCell>
              <TableCell style={cellStyle}>{team.matchWins}</TableCell>
              <TableCell style={cellStyle}>{team.matchLosses}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeaderboardTable;
