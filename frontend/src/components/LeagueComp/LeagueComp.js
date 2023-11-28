import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { borderRadius } from "@mui/system";
import { Button } from "@mui/material";

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

  //   const StyledTitle = styled("header")({
  //     display: "flex",
  //     alignItems: "center",
  //     textAlign: "center",
  //     alignSelf: "center",

  //     fontWeight: "700",
  //     fontSize: "calc(2em + 1vw)",
  //     lineHeigth: "4.8125em",
  // })

  //   if (props.showLeague) {
  //     return (
  //       <Box sx={styles.main}>
  //         <Box onClick={props.onClick} sx={styles.side}>
  //           <Typography sx={styles.name}>{props.name}</Typography>
  //           {/* <StyledTitle> {props.name} </StyledTitle> */}
  //           <Box sx={styles.row}>
  //             <Box sx={styles.data}>
  //               <img
  //                 src={require("../../assets/images/Team.png")}
  //                 alt="team"
  //                 height={"50%"}
  //                 width={"30%"}
  //                 style={{ border: "2px solid black", borderRadius: "50%" }}
  //               />
  //               <Typography sx={styles.info}>
  //                 {props.teamsSignedUp}/{props.numberOfTeams} Teams
  //               </Typography>
  //             </Box>
  //             <Box sx={styles.data}>
  //               <img
  //                 alt="clock"
  //                 src={require("../../assets/images/Clock.png")}
  //                 height={"50%"}
  //                 width={"10%"}
  //                 style={{ borderRadius: "50%" }}
  //               />
  //               <Typography sx={styles.info}>
  //                 {new Date(props.startDate).toLocaleDateString()}
  //               </Typography>
  //             </Box>
  //             <Box sx={styles.data}>
  //               <img
  //                 alt="location"
  //                 src={require("../../assets/images/location.png")}
  //                 height={"50%"}
  //                 width={"10%"}
  //                 style={{ borderRadius: "50%" }}
  //               />
  //               <Typography sx={styles.info}>{props.city}</Typography>
  //             </Box>
  //             {props.allowStart ? (
  //               <Box sx={styles.data}>
  //                 <Button onClick={startLeague}>START</Button>
  //               </Box>
  //             ) : null}
  //             {isBeforeToday(props.startDate) ? (
  //               <Box sx={styles.data}>
  //                 <Typography sx={styles.info}>
  //                   Note: The start date of this league has passed.
  //                 </Typography>
  //               </Box>
  //             ) : null}
  //             {props.teamsSignedUp < props.numberOfTeams ? (
  //               <Box sx={styles.data}>
  //                 <Typography sx={styles.info}>
  //                   Note: League is not at capacity
  //                 </Typography>
  //               </Box>
  //             ) : null}
  //           </Box>

  //           {/* Render the starting stuff if the user is 'test'
  //           Render the date warning message if the date is passed the starting date of the league */}
  //         </Box>
  //       </Box>
  //     );
  //   } else {
  //     return null;
  //   }
  // };

  // const styles = {
  //   name: {
  //     fontSize: "calc(1.5em + 1vw)",
  //   },
  //   side: {
  //     display: "flex",
  //     flexDirection: "column",
  //     justifyContent: "space-between",
  //     height: "10vh",
  //     marginBottom: "2%",
  //     marginLeft: "1%",
  //   },
  //   data: {
  //     display: "flex",
  //     flexDirection: "row",
  //     alignItems: "center",
  //     width: "16.67%",
  //   },
  //   main: {
  //     backgroundColor: "#F5F5F5",
  //     borderRadius: "10px",
  //     height: "16vh",
  //     cursor: "pointer",
  //     display: "flex",
  //     flexDirection: "row",
  //     alignItems: "center",
  //     borderRadius: "20px",
  //     marginBottom: "3%",
  //   },
  //   row: {
  //     display: "flex",
  //     flexDirection: "row",
  //   },
  //   info: {
  //     color: "black",
  //     width: "20vh",
  //     fontSize: "1.2em",
  //   },
  // };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (props.showLeague) {
    return (
      <Box sx={styles.main}>
        <Box onClick={props.onClick} sx={styles.side}>
          <Typography sx={styles.name}>{props.name}</Typography>
          <Box sx={styles.row}>
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
          </Box>
        </Box>
      </Box>
    );
  } else {
    return null;
  }
};

const styles = {
  name: {
    fontSize: "calc(1.5em + 1vw)",
  },
  side: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "10vh",
    marginBottom: LeagueComp.isSmallScreen ? "2%" : "1%",
    marginLeft: LeagueComp.isSmallScreen ? "1%" : "2%",
  },
  data: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: LeagueComp.isSmallScreen ? "25%" : "16.67%",
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
    marginBottom: LeagueComp.isSmallScreen ? "2%" : "3%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
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
};
