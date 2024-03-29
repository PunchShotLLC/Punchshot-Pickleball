import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import * as React from "react";
import { borderRadius, width } from "@mui/system";
import { red } from "@mui/material/colors";
import { Button } from "@mui/material";
import { Modal } from "@mui/material";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import MapWithCircle from "./MapWithCircle";

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


export const LeagueComp = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInfoOpen, setModalInfoOpen] = useState(false);
  const leagueCenterCoords = {
    lat: parseFloat(props.latitude),
    lng: parseFloat(props.longitude),
  };
  const leagueRadiusMeter = props.radius;

  const openInfoModal = () => {
    setModalInfoOpen(true);
  };

  const closeInfoModal = () => {
    setModalInfoOpen(false);
  };

  return (
    <Box sx={styles.main}>
        <Box sx={styles.side}>
            <Typography sx={styles.name}>{props.name}</Typography>
            {/* <Box sx={styles.data}>
              { <img
                src={require("../../assets/images/Team.png")}
                height={"30vh"}
                width={"33vh"}
                style={{ border: "2px solid black", borderRadius: "50%" }}
              /> }
                  <Typography sx={styles.basicInfo }>
                    <Typography sx={{ fontWeight: "bold" }}>Team Name:</Typography>&nbsp;
                    {props.teamName}
                  </Typography>
            </Box> */}

            <Box sx={styles.data2}>
              <Typography sx={styles.basicInfo }>
                <Typography sx={{ fontWeight: "bold" }}>Date:</Typography>&nbsp;
                {new Date(props.startDate).toLocaleDateString()} - {new Date(props.endDate).toLocaleDateString()}
              </Typography>
            </Box>
            <Box sx={styles.data3}>
              <Typography sx={styles.basicInfo }>
                  <Typography sx={{ fontWeight: "bold" }}>Team Name:</Typography>&nbsp;
                  {props.teamName}
                </Typography>
            </Box>
            <Box sx={styles.data3}>
              <Typography sx={styles.basicInfo }>
                  <Typography sx={{ fontWeight: "bold" }}>Skill Level:</Typography>&nbsp;
                  {props.skillLevel}
                </Typography>
            </Box>
            <Box sx={styles.data3}>
              <Typography sx={styles.basicInfo }>
                  <Typography sx={{ fontWeight: "bold" }}>Disivion:</Typography>&nbsp;
                  {props.division}
                </Typography>
            </Box>
        </Box>
        <Box>
                      {/* League Info Modal*/}
          <Modal open={modalInfoOpen}>
            <Box sx={styles.modal}>
              <Box sx={{ ...styles.column, alignItems: "center" }}>
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
                <Button
                  onClick={closeInfoModal}
                  variant="contained"
                  sx={{ ...styles.button, width: "25%", marginTop: "1%" }}
                  color="secondary"
                >
                  Back
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>

        <Box sx={styles.buttonRow}>
          <ThemeProvider theme={buttonTheme}>
            <Button
              // onClick={openDisclaimerModal}
              variant="contained"
              color="primary"
              sx={styles.button}
              onClick = {props.onClick}
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
  );
};

const styles = {
  name: {
    fontSize: "calc(1.5em + 0.5vw)",
    fontWeight: "bold",
    fontFamily: "'Futura', sans-serif",
    marginBottom: "5px",
    marginTop: "5px"
  },
  side: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "10vh",
    marginBottom: "2%",
    marginLeft: "2%",

  },
  data: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",

  },
  data2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    //marginLeft: "-18%",
    marginRight: "-18%",
    marginBottom: "5px",

  },
  data3: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "5px",

  },
  main: {
    backgroundColor: "#F5F5F5",
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: "20px",
    marginTop: "2em",
    paddingTop: "5px",
    cursor: "default",
  },
  column: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
  info: {
    fontSize: "calc(0.5em + 0.5vw)",
    fontFamily: "'Futura', sans-serif",
    display: "flex",
    alignItems: "center"
  },
  basicInfo: {
    fontSize: "calc(0.5em + 0.5vw)",
    fontFamily: "'Futura', sans-serif",
    display: "flex",
    alignItems: "center"
  },
  button: {
    borderRadius: "calc(1.5em + 1vw)",
    marginLeft: "1em",
    width: "40%",
  },
  buttonRow: {
    display: "flex",
    width: "50%",
    justifyContent: "flex-end",
    marginLeft: "47%",
    marginTop: "5%",
    paddingBottom: "20px",
    gap: "1em",
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
  modalData: {
    gap: "2%",
    width: "80%",
  },
};
