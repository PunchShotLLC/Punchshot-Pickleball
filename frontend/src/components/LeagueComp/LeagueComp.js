import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { borderRadius } from "@mui/system";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import MapWithCircle from "./MapWithCircle";

export const LeagueComp = (props) => {
  function isBeforeToday(dateStr) {
    // Convert date string to Date object
    const givenDate = new Date(dateStr);

    // Get today's date
    const today = new Date();
    // Set hours, minutes, seconds, and milliseconds to 0 for accurate comparison
    today.setHours(0, 0, 0, 0);

    // Compare the dates
    return givenDate < today;
  }

  const startLeague = async () => {
    console.log("Attempting to start league");

    // League must have at least three teams each with at least six players
    if (props.teams.length < 3) {
      console.log("There are less than three teams");
      return;
    }

    // Each team must have at least 6 players
    for (let i = 0; i < props.teams.length; i++) {
      if (props.teams[i]["TeamMembers"].length < 6) {
        console.log("One team has less than 6 players");
        return;
      }
    }

    // Both conditions are met, so start the league
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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const buttonTheme = createTheme({
    palette: {
      primary: {
        main: "#9146D8",
      },
      secondary: {
        main: "#D9D9D9",
      },
    },
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalInfoOpen, setModalInfoOpen] = useState(false);
  const leagueCenterCoords = { lat: parseFloat(props.latitude), lng: parseFloat(props.longitude) }
  const leagueRadiusMeter = props.radius

  const openDisclaimerModal = () => {
    setModalOpen(true);
  };

  const closeDisclaimerModal = () => {
    setModalOpen(false);
  };

  const handleUnderstand = () => {
    props.onClick(); // Navigate to "/leagueInfo" page
  };

  const openInfoModal = () => {
    setModalInfoOpen(true);
  };

  const closeInfoModal = () => {
    setModalInfoOpen(false);
  };

  if (props.showLeague) {
    return (
      <Box sx={styles.main}>
        <Box sx={styles.side}>
          {/* Disclaimer Modal */}
          <Modal open={modalOpen}>
            <Box sx={styles.modal}>
              <Typography>
                If you wish the join the league, make sure to have at least 4
                members in your team before the team registration date. Each
                member will then be charged $10.00 to be paid before the start
                date.
              </Typography>
              <ThemeProvider theme={buttonTheme}>
                <Box sx={styles.row}>
                  <Button
                    onClick={closeDisclaimerModal}
                    sx={{
                      ...styles.button,
                      width: "30%",
                      transition: "background-color 0.3s",
                      "&:hover": {
                        backgroundColor: buttonTheme.palette.primary.main,
                      },
                    }}
                    variant="contained"
                    color="secondary"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUnderstand}
                    sx={{
                      ...styles.button,
                      width: "50%",
                      transition: "background-color 0.3s",
                      "&:hover": {
                        backgroundColor: buttonTheme.palette.primary.main,
                      },
                    }}
                    variant="contained"
                    color="secondary"
                  >
                    I understand
                  </Button>
                </Box>
              </ThemeProvider>
            </Box>
          </Modal>

          {/* League Info Modal*/}
          <Modal open={modalInfoOpen}>
            <Box sx={styles.modal}>
              <Box sx={styles.column}>
                <Box sx={{ ...styles.data, ...styles.modalData }}>
                  <img
                    src={require("../../assets/images/Team.png")}
                    alt="team"
                    width="4%"
                    style={{ border: "2px solid black", borderRadius: "50%" }}
                  />
                  <Typography sx={styles.modalData}>
                    Number of Teams: {props.teamsSignedUp}
                  </Typography>
                </Box>
                <Box sx={{ ...styles.data, ...styles.modalData }}>
                  <img
                    alt="clock"
                    src={require("../../assets/images/Clock.png")}
                    width="5%"
                    style={{ borderRadius: "50%" }}
                  />
                  <Typography sx={styles.modalData}>
                    Team Registration Date:{" "}
                    {new Date(props.registrationDate).toLocaleDateString()}
                  </Typography>
                </Box>
                <MapWithCircle
                  center={leagueCenterCoords}
                  radius={leagueRadiusMeter}
                  width="400px"
                  height="350px"
                />
                {/*<Box sx={{ ...styles.data, ...styles.modalData }}>
                  <img
                    alt="clock"
                    src={require("../../assets/images/Clock.png")}
                    width="5%"
                    style={{ borderRadius: "50%" }}
                  />
                  <Typography sx={styles.modalData}>
                    Start Date: {new Date(props.startDate).toLocaleDateString()}
                  </Typography>
                  <Typography sx={styles.modalData}>
                    End Date: {new Date(props.endDate).toLocaleDateString()}
                  </Typography>
                  <Typography sx={styles.modalData}>
                    Skill Level: {props.skillLevel}
                  </Typography>
                  <Typography sx={styles.modalData}>
                    Division: {props.division}
                  </Typography>
                </Box>*/}
                <Button
                  onClick={closeInfoModal}
                  variant="contained"
                  sx={{ ...styles.button }}
                  color="secondary"
                >
                  Back
                </Button>
              </Box>
            </Box>
          </Modal>

          {/* View Team and More Info Button */}
          <Box sx={styles.row}>
            <Typography sx={styles.name}>{props.name}</Typography>
            <Box sx={styles.buttonRow}>
              <ThemeProvider theme={buttonTheme}>
                <Button
                  onClick={openDisclaimerModal}
                  variant="contained"
                  color="primary"
                  sx={styles.button}
                >
                  View Teams
                </Button>
                <Button
                  onClick={openInfoModal}
                  variant="contained"
                  color="primary"
                  sx={styles.button}
                >
                  More Info
                </Button>
              </ThemeProvider>
            </Box>
          </Box>

          {/* <Box sx={styles.row}>
            <Box sx={styles.data}>
              <img
                src={require("../../assets/images/Team.png")}
                alt="team"
                height={isSmallScreen ? "40%" : "50%"}
                width={isSmallScreen ? "10%" : "15%"}
                style={{ border: "2px solid black", borderRadius: "50%" }}
              />
              <Typography sx={styles.info}>
                {props.teamsSignedUp}/{props.numberOfTeams} Teams
              </Typography>
            </Box>
            <Box sx={styles.data}>
              <img
                alt="clock"
                src={require("../../assets/images/Clock.png")}
                height={isSmallScreen ? "40%" : "50%"}
                width="15%"
                style={{ borderRadius: "50%" }}
              />
              <Typography sx={styles.info}>
                {new Date(props.startDate).toLocaleDateString()}
              </Typography>
            </Box>
            <Box sx={styles.data}>
              <img
                alt="location"
                src={require("../../assets/images/location.png")}
                height={isSmallScreen ? "40%" : "50%"}
                width="15%"
                style={{ borderRadius: "50%" }}
              />
              <Typography sx={styles.info}>{props.city}</Typography>
            </Box>
            {props.allowStart && (
              <Box sx={styles.data}>
                <Button onClick={startLeague}>START</Button>
              </Box>
            )}
            {isBeforeToday(props.startDate) && (
              <Box sx={styles.data}>
                <Typography sx={styles.notes}>
                  Note: The start date of this league has passed.
                </Typography>
              </Box>
            )}
            {props.teamsSignedUp < props.numberOfTeams && (
              <Box sx={styles.data}>
                <Typography sx={styles.notes}>
                  Note: League is not at capacity
                </Typography>
              </Box>
            )}
          </Box> */}
        </Box>
      </Box>
    );
  } else {
    return null;
  }
};

const styles = {
  name: {
    fontSize: "calc(1.5em + 0.5vw)",
    fontWeight: "bold",
    fontFamily: "'Futura', sans-serif",
  },
  side: {
    display: "flex",
    flexDirection: "column",
    height: "8vh",
    marginBottom: LeagueComp.isSmallScreen ? "2%" : "1%",
    marginLeft: LeagueComp.isSmallScreen ? "1%" : "2%",
  },
  data: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: LeagueComp.isSmallScreen ? "25%" : "16.67%",
  },
  modalData: {
    gap: "2%",
    width: "80%",
  },
  main: {
    backgroundColor: "#F5F5F5",
    height: "15vh",
    cursor: "pointer",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: "20px",
    marginTop: "2em",
    marginBottom: LeagueComp.isSmallScreen ? "2%" : "3%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginTop: "auto",
    justifyContent: "space-between",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2vh",
  },
  info: {
    color: "black",
    width: "20vh",
    fontSize: "1.2em",
  },
  notes: {
    color: "black",
    width: "20vh",
    fontSize: "0.75em",
  },
  button: {
    borderRadius: "calc(1.5em + 1vw)",
    marginLeft: "2em",
    marginRight: "2em",
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "35%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: "10px",
    padding: "4vh",
    gap: "2vh",
  },
};
