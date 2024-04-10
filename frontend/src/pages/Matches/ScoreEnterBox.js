import * as React from "react";
import { useState } from "react";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";

export default function ScoreEnterBox(props) {
  const columns = [
    { id: "sets", label: "Set", minWidth: 120 },
    { id: "team1", label: props.match.team1, minWidth: 120 },
    { id: "team2", label: props.match.team2, minWidth: 120 },
    { id: "winner", label: "Winner", minWidth: 120 },
  ];

  const [scores, setScores] = useState([
    { set: 1, score1: "", score2: "", winner: null },
    { set: 2, score1: "", score2: "", winner: null },
    { set: 3, score1: "", score2: "", winner: null },
  ]);
  const [result, setResult] = useState(null);
  const [matchWinner, setMatchWinner] = useState(null);
  const [matchScore, setMatchScore] = useState(null);
  const [input, setInput] = useState(true);

  const handleScoreChange = (index, field, value) => {
    const updatedScores = [...scores];
    updatedScores[index][field] = value;
    const score1 = parseInt(updatedScores[index].score1);
    const score2 = parseInt(updatedScores[index].score2);
    if (!isNaN(score1) && !isNaN(score2) && validateScores(score1, score2)) {
      // Calculate winner
      updatedScores[index].winner =
        score1 > score2 ? props.match.team1 : props.match.team2;

      // If set 1 and set 2 are done, determine if set 3 is needed
      if (
        updatedScores[0].winner !== null &&
        updatedScores[1].winner !== null
      ) {
        if (updatedScores[0].winner !== updatedScores[1].winner) {
          setInput(false);
        } else {
          setInput(true);
        }
      }

      // Determine result
      const team1Sets = updatedScores.filter(
        (set) => set.winner === props.match.team1
      ).length;
      const team2Sets = updatedScores.filter(
        (set) => set.winner === props.match.team2
      ).length;

      if (team1Sets + team2Sets >= 2 && team1Sets !== team2Sets) {
        let res = `${props.match.team1} won ${team1Sets}-${team2Sets}`;
        setMatchWinner(props.match.team1);
        setMatchScore(`${team1Sets}-${team2Sets}`);
        if (team2Sets > team1Sets) {
          res = `${props.match.team2} won ${team2Sets}-${team1Sets}`;
          setMatchWinner(props.match.team2);
          setMatchScore(`${team2Sets}-${team1Sets}`);
        }
        setResult(res);
      }
    } else {
      updatedScores[index].winner = null;
      setResult(null);
      setMatchWinner(null);
      setMatchScore(null);
    }
    setScores(updatedScores);
  };

  const validateScores = (score1, score2) => {
    if (score1 < 11 && score2 < 11) {
      return false;
    } else if (
      score1 >= 11 &&
      score2 >= 11 &&
      Math.abs(score1 - score2) !== 2
    ) {
      return false;
    } else if (
      score1 >= 11 &&
      score2 >= 11 &&
      Math.abs(score1 - score2) === 2
    ) {
      return true;
    } else if (
      (score1 === 11 || score2 === 11) &&
      Math.abs(score1 - score2) < 2
    ) {
      return false;
    } else if (
      (score1 > 11 || score2 > 11) &&
      Math.abs(score1 - score2) !== 2
    ) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    if (result === null) {
      alert("Invalid Scores");
      return;
    }

    // Set the appropriate values in the league object
    props.league["Matches"][props.matchIndex]["WinnerTeam"] = matchWinner;
    props.league["Matches"][props.matchIndex]["Score"] = matchScore;

    // Make the patch request to update the leagues
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.league),
    };

    // Make the PATCH request to update the leagues
    const apiUrl = `http://localhost:8000/leagues/updateLeague/${props.league["_id"]}`;

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        props.onClose();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box sx={styles.modal}>
        <Box sx={styles.column}>
          <Typography sx={styles.text}>Enter the score for each set</Typography>
          <TableContainer sx={styles.table}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align="center"
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
                {scores.map((row, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell align="center">{row.set}</TableCell>
                      <TableCell align="center">
                        <TextField
                          value={row.score1}
                          onChange={(e) =>
                            handleScoreChange(index, "score1", e.target.value)
                          }
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "center" },
                            },
                          }}
                          disabled={index === 2 && input}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          value={row.score2}
                          onChange={(e) =>
                            handleScoreChange(index, "score2", e.target.value)
                          }
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "center" },
                            },
                          }}
                          disabled={index === 2 && input}
                        />
                      </TableCell>
                      <TableCell align="center">{row.winner}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography sx={styles.text}>{result}</Typography>
          <Box sx={styles.row}>
            <Button
              variant="contained"
              style={{
                background: "#A1C038",
              }}
              onClick={props.onClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              style={{
                background: "#A1C038",
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

const styles = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    height: "50%",
    bgcolor: "background.paper",
    borderRadius: "16px",
    p: 4,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    gap: "5%",
  },
  text: {
    textAlign: "center",
    fontSize: 36,
  },
  table: {
    width: "90%",
    height: "auto",
    padding: "2%",
    border: "2px solid #A1C038",
  },
};
