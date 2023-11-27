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
  const cellStyle = { fontSize: '2.5rem' };
  
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
        teamsArray.sort((a, b) => b.wins - a.wins);
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
    <TableContainer 
      component={Paper} 
      sx={{
        marginTop: "2em",
        width: '100em',
        maxWidth: '100%',
        borderRadius: '20px',
        border: '5px solid #D5FD51'
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={cellStyle}>Team </TableCell>
            <TableCell style={cellStyle}>Matches</TableCell>
            <TableCell style={cellStyle}>Wins</TableCell>
            <TableCell style={cellStyle}>Losses</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((team) => (
            <TableRow key={team.teamName}>
              <TableCell style={cellStyle}>{team.teamName}</TableCell>
              <TableCell style={cellStyle}>{team.losses + team.wins}</TableCell>
              <TableCell style={cellStyle}>{team.wins}</TableCell>
              <TableCell style={cellStyle}>{team.losses}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeaderboardTable;
