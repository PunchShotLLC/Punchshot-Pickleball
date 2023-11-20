import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import * as React from "react";
import { borderRadius } from "@mui/system";
import { Button } from "@mui/material";

export const LeagueComp = (props) => {
  function isBeforeToday(dateStr) {
    // Convert date string to Date object
    const givenDate = new Date(dateStr);

    // Get today's date
    const today = new Date();
    console.log(givenDate);
    console.log(today);
    // Set hours, minutes, seconds, and milliseconds to 0 for accurate comparison
    today.setHours(0, 0, 0, 0);

    // Compare the dates
    return givenDate < today;
  }

  const startLeague = async () => {
    console.log("Starting league");

    const rawResponse = await fetch(
      `http://localhost:8000/leagues/startLeague/${props.id}`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    ).catch((err) => console.log(err));
  };

  return (
    <Box sx={styles.main}>
      <img
        alt="logo"
        src={props.logo}
        width={"120vh"}
        height={"120vh"}
        style={{ borderRadius: "20%", marginLeft: "2%" }}
      />

      <Box onClick={props.onClick} sx={styles.side}>
        <Typography sx={styles.name}>{props.name}</Typography>
        <Box sx={styles.row}>
          <Box sx={styles.data}>
            <img
              src={require("../../assets/images/Team.png")}
              alt="team"
              height={"30vh"}
              width={"33vh"}
              style={{ border: "2px solid black", borderRadius: "50%" }}
            />
            <Typography sx={styles.info}>
              {props.teamsSignedUp}/{props.numberOfTeams} Teams
            </Typography>
          </Box>
          <Box sx={styles.data2}>
            <img
              alt="clock"
              src={require("../../assets/images/Clock.png")}
              height={"30vh"}
              width={"33vh"}
              style={{ borderRadius: "50%" }}
            />
            <Typography sx={styles.info}>
              {new Date(props.startDate).toLocaleDateString()}
            </Typography>
          </Box>
          <Box sx={styles.data3}>
            <img
              alt="location"
              src={require("../../assets/images/location.png")}
              height={"30vh"}
              width={"33vh"}
              style={{ borderRadius: "50%" }}
            />
            <Typography sx={styles.info}>{props.city}</Typography>
          </Box>
        </Box>
      </Box>

      {/* Render the starting stuff if the user is 'test'
        Render the date warning message if the date is passed the starting date of the league */}
      {props.allowStart ? (
        <>
          <Button sx={styles.button} onClick={startLeague}>
            START
          </Button>
          {isBeforeToday(props.startDate) ? (
            <div style={styles.warning1div}>
              <p>Note: The start date of this league has passed.</p>
            </div>
          ) : null}
          {props.teamsSignedUp < props.numberOfTeams ? (
            <div style={styles.warning2div}>
              <p>Note: League is not at capacity</p>
            </div>
          ) : null}
        </>
      ) : null}
    </Box>
  );
};

const styles = {
  name: {
    fontSize: "3em",
  },
  side: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "10vh",
    marginBottom: "2%",
    marginLeft: "1%",
  },
  data: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  data2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "-18%",
  },
  data3: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "-6%",
  },
  main: {
    backgroundColor: "#F5F5F5",
    borderRadius: "10px",
    height: "16vh",
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: "20px",
    marginBottom: "3%",
  },
  row: {
    display: "flex",
    width: "90%",
    flexDirection: "row",
  },
  info: {
    color: "black",
    width: "30vh",
    marginLeft: "2%",
    marginRight: "0%",
    fontSize: "1.2em",
  },
  button: {
    position: "relative",
    right: "80px",
    alignItems: "center",
  },
  warning1div: {
    position: "relative",
    right: "260px",
    fontSize: "10px",
  },
  warning2div: {
    position: "relative",
    right: "240px",
    fontSize: "10px",
  },
};
