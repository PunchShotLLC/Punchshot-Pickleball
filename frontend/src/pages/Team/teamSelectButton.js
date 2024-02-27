import * as React from "react";
import "./teamSelectButton.css";
import { Modal } from "@mui/material";
import { Button, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
export const TeamSelectButton = (props) => {

  console.log(props)

  let isPotentialMember = props.leagueInfo.Teams[props.teamIndex].PotentialTeamMembers.some((name) => name === props.username)
  let inTeam = (props.members.some((obj) => obj === props.username) || props.username === props.captain)
  const addPlayerToTeam = async (teamIndex, username) => {

    // Add the player to the team's player list
    let playerList = props.leagueInfo.Teams[teamIndex].TeamMembers;
    let teamMember = props.leagueInfo.Teams.some((team) => team.TeamMembers.some(name => name === username));

    if (teamMember) {
      alert("Already in team")
      return;
    }

    if (playerList.length >= 5) {
      alert("Team is full")
      return;
    }

    playerList.push(username);

    // Remove the player from the potential player list
    let potentialPlayerList = props.leagueInfo.Teams[teamIndex].PotentialTeamMembers;
    potentialPlayerList = potentialPlayerList.filter(e => e !== username)
    props.leagueInfo.Teams[teamIndex].PotentialTeamMembers = potentialPlayerList
    // Make the PATCH request to update the leagues
    props.updateLeague(props.leagueInfo)
  };
  const removePlayerToTeam = async (teamIndex, username) => {

    // Remove the player from the potential player list
    let potentialPlayerList = props.leagueInfo.Teams[teamIndex].PotentialTeamMembers;
    potentialPlayerList = potentialPlayerList.filter(e => e !== username)
    props.leagueInfo.Teams[teamIndex].PotentialTeamMembers = potentialPlayerList

    // Make the PATCH request to update the leagues
    props.updateLeague(props.leagueInfo)
  };

  const changeCaptain = async (teamIndex, username) => {
    let oldCaptain = props.leagueInfo.Teams[teamIndex].TeamCaptain
    props.leagueInfo.Teams[teamIndex].TeamCaptain = username;

    // This function must also make the former captain a member of the team
    props.leagueInfo.Teams[teamIndex].TeamMembers.push(oldCaptain)
    props.updateLeague(props.leagueInfo)
  }

  // There are nulls in the potential members list for some reason
  // This filters the nulls out
  let potentials = []
  for (let i = 0; i < props.potentialMembers.length; i++) {
    if (props.potentialMembers[i] !== null) {
      potentials.push(props.potentialMembers[i])
    }
  }

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

  const [memberModalOpen, setMemberModalOpen] = useState(false)
  const [memberRequestModalOpen, setMemberRequestModalOpen] = useState(false)
  return (
    <>
      <Box sx={styles.row}>
        <Typography sx={styles.name}>{props.name}</Typography>
        <Box sx={{ ...styles.data, width: "auto", margin: "1em" }}>
          <Typography sx={{ ...styles.info, fontWeight: "bold" }}>
            Captain: {props.captain}
          </Typography>
        </Box>
        <Box sx={{ ...styles.data, width: "auto", margin: "1em" }}>
          <Typography sx={styles.notes}>
            Home Court Address: {props.home}
          </Typography>
        </Box>
      </Box>

      <Box sx={styles.row}>
        <ThemeProvider theme={buttonTheme}>
          <Button
            onClick={() => setMemberModalOpen(true)}
            variant="contained"
            color="primary"
            sx={styles.button}
          >
            Member Info
          </Button>
          {
            props.showPotentialMembers ? <Button
              onClick={() => setMemberRequestModalOpen(true)}
              variant="contained"
              color="primary"
              sx={styles.button}
            >
              Member Requests
            </Button> : null
          }

          <Button
            onClick={() => {
              if (props.showPotentialMembers) {
                props.onClickDropTeam()
              } else if (inTeam) {
                props.onClickRemoveUser()
              } else {
                props.onClick()
              }
            }}
            variant="contained"
            color="primary"
            sx={styles.button}
          >
            {
              props.showPotentialMembers ? "Drop Team" :
                inTeam ? "Leave Team" :
                  isPotentialMember ? "Request Pending" : "Request to Join"
            }
          </Button>
        </ThemeProvider>
        <Modal open={memberModalOpen}>
          <Box sx={styles.modal}>
            <Box sx={styles.column}>
              <Typography sx={styles.modalData}>
                Captain: {props.captain}
              </Typography>
              <Typography sx={styles.modalData}>
                Members:
              </Typography>
              {
                props.members.map((item, index) => {
                  return (
                    <Box sx={{ ...styles.data, ...styles.modalData }}>
                      <Typography sx={styles.modalData}>
                        {index + 1}: {item}
                      </Typography>
                      {
                        props.showPotentialMembers ? <ThemeProvider theme={buttonTheme}>
                          <Button
                            onClick={() => changeCaptain(props.teamIndex, props.members[index])}
                            variant="contained"
                            color="primary"
                            sx={{ ...styles.button, width: "auto" }}
                          >
                            Make Captain
                          </Button>
                        </ThemeProvider> : null
                      }
                    </Box>
                  )
                })
              }
              <Button
                onClick={() => setMemberModalOpen(false)}
                variant="contained"
                sx={{ ...styles.button }}
                color="secondary"
              >
                Close
              </Button>
            </Box>
          </Box>
        </Modal>
        <Modal open={memberRequestModalOpen}>
          <Box sx={styles.modal}>
            <Box sx={styles.column}>
              <Typography sx={styles.modalData}>
                Potential Members:
              </Typography>
              {potentials.map((item, index) => (
                <div className='pending-team-container' >
                  <IconButton onClick={() => addPlayerToTeam(props.teamIndex, props.potentialMembers[index])}>
                    <CheckIcon sx={{ color: "green" }} />
                  </IconButton>
                  <p className="potential-team-member">{props.potentialMembers[index]}</p>
                  <IconButton onClick={() => removePlayerToTeam(props.teamIndex, props.potentialMembers[index])}>
                    <CloseIcon sx={{ color: "red" }} />
                  </IconButton>
                </div>
              ))}
              <Button
                onClick={() => setMemberRequestModalOpen(false)}
                variant="contained"
                sx={{ ...styles.button }}
                color="secondary"
              >
                Close
              </Button>
            </Box>
          </Box>
        </Modal>
        {/* <p className="team-select-text">Members: </p>
        {props.members.map((item, index) => (
          <div className='team-username-container'>
            <p>{props.members[index]}</p>
          </div>
        ))} */}
        {/* <p className="team-select-text">Home Court Address: {props.home} </p> */}
        {/* {props.showPotentialMembers === true ?
          <>
            <p className="team-select-text">Potential Members (Click on a user to allow them into your team): </p>
            {potentials.map((item, index) => (
              <div className='pending-team-container' >
                <IconButton onClick={() => addPlayerToTeam(props.teamIndex, props.potentialMembers[index])}>
                  <CheckIcon sx={{ color: "green" }} />
                </IconButton>
                <p className="potential-team-member">{props.potentialMembers[index]}</p>
                <IconButton onClick={() => removePlayerToTeam(props.teamIndex, props.potentialMembers[index])}>
                  <CloseIcon sx={{ color: "red" }} />
                </IconButton>
              </div>
            ))}
          </> :
          null
        }
        {isPotentialMember ?
          <>
            {
              <div className='team-username-container' onClick={() => removePlayerToTeam(props.teamIndex, props.username)}>
                <p>Cancel Request</p>
              </div>
            }
          </> :
          null
        }
        <br></br>
        {
          isPotentialMember ?
            null :
            inTeam ?
              <Button onClick={props.onClickRemoveUser}> Leave Team </Button> :
              <Button onClick={props.onClick}>Request to Join</Button>
        } */}
      </Box>
    </>
  );
};
const styles = {
  name: {
    fontSize: "calc(1.5em + 1vw)",
  },
  subName: {
    fontSize: "1.5em",
    fontWeight: 'bold'
  },
  data: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: TeamSelectButton.isSmallScreen ? "25%" : "16.67%",
  },
  modalData: {
    gap: "2%",
    width: "80%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
    width: "20%",
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