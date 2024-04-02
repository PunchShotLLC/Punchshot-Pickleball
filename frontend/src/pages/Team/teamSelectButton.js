import * as React from "react";
import "./teamSelectButton.css";
import { AvatarGroup, Modal } from "@mui/material";
import { Button, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Avatar from "@mui/material/Avatar";
import CloseIcon from "@mui/icons-material/Close";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axios from "axios";

// generate a color based on a string
function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    // get the first letter of the name
    children: `${name.split(" ")[0][0]}`,
  };
}

export const TeamSelectButton = (props) => {
  // console.log(props);

  //Number of members logic
  const currentMembers = props.members.length + (props.captain ? 1 : 0);
  const maxMembers = 10;
  const isFull = currentMembers >= maxMembers;
  const memberStatus = isFull ? `10/10 FULL` : `${currentMembers}/10 OPEN`;
  const memberStatusColor = isFull ? "red" : "green";
  const [memberPhoto, setMemberPhoto] = useState([]);
  const [potenteialMPhoto, setPotentialMPhoto] = useState([]);
  const [captainPhoto, setCaptainPhoto] = useState(null);

  let isPotentialMember = props.leagueInfo.Teams[
    props.teamIndex
  ].PotentialTeamMembers.some((name) => name === props.username);
  let inTeam =
    props.members.some((obj) => obj === props.username) ||
    props.username === props.captain;

  const getUserPhoto = async (userName) => {
    try {
      const url = `http://localhost:8000/users/getPhoto/${userName}`;
      const response = await axios.get(url);
      console.log(response.data.profilePhoto);
      return response.data.profilePhoto;
    } catch (error) {
      console.error("Error fetching photo:", error);
      alert("Failed to fetch user photo");
      return null;
    }
  };

  useEffect(() => {
    const fetchPhotos = async (members, setPhoto) => {
      try {
        if (!Array.isArray(members)) {
          const photoUrl = await getUserPhoto(members);
          setPhoto(photoUrl);
          return;
        }
        const photoPromises = members.map((item) => {
          return getUserPhoto(item);
        });
        Promise.all(photoPromises)
          .then((photoUrls) => {
            // console.log(photoUrls);
            setPhoto(photoUrls);
          })
          .catch((error) => {
            console.error("Error fetching photos:", error);
          });
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos(props.captain, setCaptainPhoto);
    fetchPhotos(props.members, setMemberPhoto);
    fetchPhotos(props.potentialMembers, setPotentialMPhoto);
  }, [props.captain, props.members, props.potentialMembers]);

  const addPlayerToTeam = async (teamIndex, username) => {
    // Add the player to the team's player list
    let playerList = props.leagueInfo.Teams[teamIndex].TeamMembers;
    let isTeamMember = props.leagueInfo.Teams.some((team) =>
      team.TeamMembers.some((name) => name === username)
    );

    if (isTeamMember) {
      alert("Already in team");
      return;
    }

    if (playerList.length >= 10) {
      alert("Team is full");
      return;
    }

    playerList.push(username);

    // Remove the player from the potential player list
    let potentialPlayerList =
      props.leagueInfo.Teams[teamIndex].PotentialTeamMembers;
    potentialPlayerList = potentialPlayerList.filter((e) => e !== username);
    props.leagueInfo.Teams[teamIndex].PotentialTeamMembers =
      potentialPlayerList;
    // Make the PATCH request to update the leagues
    props.updateLeague(props.leagueInfo);
  };
  const removePlayerToTeam = async (teamIndex, username) => {
    // Remove the player from the potential player list
    let potentialPlayerList =
      props.leagueInfo.Teams[teamIndex].PotentialTeamMembers;
    potentialPlayerList = potentialPlayerList.filter((e) => e !== username);
    props.leagueInfo.Teams[teamIndex].PotentialTeamMembers =
      potentialPlayerList;

    // Make the PATCH request to update the leagues
    props.updateLeague(props.leagueInfo);
  };

  const changeCaptain = async (teamIndex, username) => {
    let oldCaptain = props.leagueInfo.Teams[teamIndex].TeamCaptain;
    let oldCaptainEmail = props.leagueInfo.Teams[teamIndex].CaptainEmail
    let teamName = props.leagueInfo.Teams[teamIndex].TeamName
    console.log(username);
    let userEmail = ""

    try { 
      // Make a GET request to the getUserEmail route
      const response = await fetch(
        `http://localhost:8000/users/getUserEmail/${username}`
      );
      const emailData = await response.json();
      userEmail = emailData.email;
      console.log(userEmail)
      // set captain email as new captain's email
      props.leagueInfo.Teams[teamIndex].CaptainEmail = userEmail
      
    } catch (error) {
      console.error('Error:', error);
    }

    // send new captain and old captain emails for captain change
    const emailApiUrl = `http://localhost:8000/leagues/sendTeamCaptainChangeEmail?newCaptainEmail=${userEmail}&oldCaptainEmail=${oldCaptainEmail}&team=${teamName}&newCaptain=${username}`;

    fetch(emailApiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    props.leagueInfo.Teams[teamIndex].TeamCaptain = username;

    // // This function must also make the former captain a member of the team
    props.leagueInfo.Teams[teamIndex].TeamMembers.push(oldCaptain);
    let index = props.leagueInfo.Teams[teamIndex].TeamMembers.indexOf(username);
    props.leagueInfo.Teams[teamIndex].TeamMembers.splice(index, 1);
    props.updateLeague(props.leagueInfo);
  };

  // There are nulls in the potential members list for some reason
  // This filters the nulls out
  let potentials = [];
  for (let i = 0; i < props.potentialMembers.length; i++) {
    if (props.potentialMembers[i] !== null) {
      potentials.push(props.potentialMembers[i]);
    }
  }

  const theme = useTheme();
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const buttonTheme = createTheme({
    palette: {
      primary: {
        main: isPotentialMember ? "#AD99CB" : "#9146D8", // Change color based on isPotentialMember
      },
      secondary: {
        main: "#D9D9D9",
      },
    },
  });

  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [memberRequestModalOpen, setMemberRequestModalOpen] = useState(false);

  const requestJoinColor = isPotentialMember ? "#AD99CB" : "#9146D8"; // New hex color for "Request Sent"
  const leaveDropColor = "#D76055";
  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Typography
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            color: memberStatusColor,
            fontWeight: "bold",
            background: isFull ? "#F8D7DA" : "#D4EDDA", // light red for FULL, light green for OPEN
            borderRadius: "4px",
            padding: "2px 8px",
          }}
        >
          {memberStatus}
        </Typography>
      </Box>
      <Box
        sx={{
          // Assume you want to adjust the width to fit content within the parent box
          // and allow text to wrap if needed
          width: "100%", // Take the full width of the parent container
          p: 2, // Add padding inside the box for spacing
        }}
      >
        <Box display={"flex"} flexDirection={"row"} gap={1}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
              fontSize: "1rem", // Start with a base font size
              // Use responsive font sizes for different breakpoints
              [theme.breakpoints.up("sm")]: {
                fontSize: "1.25rem", // Slightly larger font size on sm screens and up
              },
              [theme.breakpoints.up("md")]: {
                fontSize: "1.5rem", // Even larger font size on md screens and up
              },
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {props.name}
          </Typography>
          <AvatarGroup max={3} spacing={"small"}>
            {captainPhoto === "" ? (
              <Avatar {...stringAvatar(props.captain)} />
            ) : (
              <Avatar alt="User Photo" src={captainPhoto} />
            )}
            {props.members.map((item, index) =>
              memberPhoto[index] === "" ? (
                <Avatar {...stringAvatar(item)} />
              ) : (
                <Avatar alt="User Photo" src={memberPhoto[index]} />
              )
            )}
          </AvatarGroup>
        </Box>
        <Typography
          variant="body2"
          sx={{
            // Same responsive adjustments as above
            fontSize: "0.875rem",
            [theme.breakpoints.up("sm")]: {
              fontSize: "1rem",
            },
            [theme.breakpoints.up("md")]: {
              fontSize: "1.125rem",
            },
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <strong>Captain:</strong> {props.captain}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            // Same responsive adjustments as above
            fontSize: "0.875rem",
            [theme.breakpoints.up("sm")]: {
              fontSize: "0.875rem",
            },
            [theme.breakpoints.up("md")]: {
              fontSize: "1rem",
            },
            textWrap: "pretty",
          }}
        >
          <strong>Home Court Address: </strong>
          {props.home}
        </Typography>
      </Box>

      <Box sx={styles.row}>
          <Button
            onClick={() => setMemberModalOpen(true)}
            variant="contained"
            color="primary"
            sx={{...styles.button, backgroundColor: "#9146D8", "&:hover" : {backgroundColor: "#9146D8"}}}
          >
            VIEW INFO
          </Button>
          {props.showPotentialMembers ? (
            <Button
              onClick={() => setMemberRequestModalOpen(true)}
              variant="contained"
              color="primary"
              sx={styles.button}
            >
              MEMBER REQUESTS
            </Button>
          ) : null}

          <Button
            onClick={() => {
              if (props.showPotentialMembers) {
                props.onClickDropTeam();
              } else if (inTeam) {
                props.onClickRemoveUser();
              } else if (isPotentialMember) {
                removePlayerToTeam(props.teamIndex, props.username)
              } 
              else {
                props.onClick();
              }
            }}
            variant="contained"
            sx={{
              ...styles.button,
              backgroundColor:
                inTeam || props.showPotentialMembers
                  ? leaveDropColor
                  : isPotentialMember? 
                  leaveDropColor : requestJoinColor,
              "&:hover": {
                backgroundColor:
                  inTeam || props.showPotentialMembers
                    ? leaveDropColor
                    : isPotentialMember?
                    leaveDropColor : requestJoinColor,
              },
            }}
          >
            {props.showPotentialMembers
              ? "DROP TEAM"
              : inTeam
              ? "LEAVE TEAM"
              : isPotentialMember
              ? "CANCEL REQUEST"
              : "REQUEST TO JOIN"}
          </Button>        
        <Modal open={memberModalOpen}>
          <Box sx={styles.modal}>
            <Box
              sx={{
                ...styles.column,
                width: "100%",
              }}
            >
              <Typography sx={styles.modalData}>{props.name}</Typography>
              <Box
                sx={{
                  ...styles.data,
                  ...styles.modalData,
                  backgroundColor: "white",
                }}
              >
                {captainPhoto === "" ? (
                  <Avatar {...stringAvatar(props.captain)} sx={styles.avatar} />
                ) : (
                  <Avatar
                    alt="User Photo"
                    src={captainPhoto}
                    sx={styles.avatar}
                  />
                )}
                <Typography sx={styles.memberName}>
                  {props.captain} (Captain)
                </Typography>
              </Box>
              {props.members.map((item, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      ...styles.data,
                      ...styles.modalData,
                      backgroundColor: "white",
                    }}
                  >
                    {memberPhoto[index] === "" ? (
                      <Avatar {...stringAvatar(item)} sx={styles.avatar} />
                    ) : (
                      <Avatar
                        alt="User Photo"
                        src={memberPhoto[index]}
                        sx={styles.avatar}
                      />
                    )}
                    <Typography sx={styles.memberName}>{item}</Typography>
                    {props.showPotentialMembers ? (
                      <ThemeProvider theme={buttonTheme}>
                        <Button
                          onClick={() =>
                            changeCaptain(props.teamIndex, props.members[index])
                          }
                          variant="contained"
                          color="primary"
                          sx={{ ...styles.button, width: "auto" }}
                        >
                          Make Captain
                        </Button>
                      </ThemeProvider>
                    ) : null}
                  </Box>
                );
              })}
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
          <Box sx={{ ...styles.modal }}>
            <Box
              sx={{
                ...styles.column,
                width: "100%",
              }}
            >
              <Typography sx={styles.modalData}>Potential Members</Typography>
              {potentials.map((item, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      ...styles.data,
                      ...styles.modalData,
                      backgroundColor: "white",
                    }}
                  >
                    {potenteialMPhoto[index] === "" ? (
                      <Avatar {...stringAvatar(item)} sx={styles.avatar} />
                    ) : (
                      <Avatar
                        alt="User Photo"
                        src={potenteialMPhoto[index]}
                        sx={styles.avatar}
                      />
                    )}
                    <Typography sx={styles.memberName}>
                      {props.potentialMembers[index]}
                    </Typography>
                    <IconButton
                      onClick={() =>
                        addPlayerToTeam(
                          props.teamIndex,
                          props.potentialMembers[index]
                        )
                      }
                    >
                      <CheckIcon sx={{ ...styles.icon, color: "green" }} />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        removePlayerToTeam(
                          props.teamIndex,
                          props.potentialMembers[index]
                        )
                      }
                    >
                      <CloseIcon sx={{ ...styles.icon, color: "red" }} />
                    </IconButton>
                  </Box>
                );
              })}
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
    fontWeight: "bold",
  },
  data: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: TeamSelectButton.isSmallScreen ? "25%" : "16.67%",
    gap: "3%",
    padding: "1%",
    borderRadius: "10px",
  },
  modalData: {
    margin: "1%",
    width: "80%",
    fontWeight: "700",
    fontSize: "calc(1em + 1vw)",
    color: "#9146D8",
    textAlign: "center",
  },
  memberName: {
    fontWeight: "700",
    fontSize: "calc(0.3em + 0.8vw)",
    color: "black",
    width: "90%",
    height: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
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
    borderRadius: "10px", // Rounded corners
    marginLeft: "2em",
    width: "auto", // Auto width to accommodate text
    padding: "10px 20px", // Padding inside the button to increase width
    fontSize: "0.875rem", // Adjust font size as needed
    lineHeight: 1.25, // Adjust line height to ensure text fits on one line
    textTransform: "none", // If you don't want the text to be all uppercase
    // Add more padding on small screens if needed
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
  avatar: {
    width: "70px",
    height: "70px",
    objectFit: "contain",
  },
  icon: {
    width: "40px",
    height: "40px",
  },
};
