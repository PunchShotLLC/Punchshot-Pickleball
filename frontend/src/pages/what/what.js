import React from "react";
import Box from "@mui/material/Box";
import { flexbox, height, margin } from "@mui/system";
import { Divider } from "@mui/material";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { positions } from "@mui/system";
import { sizing } from "@mui/system";
import { grid } from "@mui/system";
import { display } from "@mui/system";
import zIndex from "@mui/material/styles/zIndex";
import { Table } from "@mui/material";
import downArrow from "../../assets/images/image10.png";
import courtPicture from "../../assets/images/Rectangle27.png";
import { ImageList } from "@mui/material";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import rightArrow from "../../assets/images/rightArrow.svg";
import courtDiagram from "../../assets/images/courtDiagram.png";
import equipmentButton from "../../assets/images/equipmentButton.png";
import whatToWearButton from "../../assets/images/whatToWearButton.png";
import "./what.scss";
import Button from "@mui/material/Button";

export const What = () => {
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "black",
          display: "flex",
          width: "100%",
          height: "50.69vh",
          zIndex: "1",
          flexDirection: "column",
        }}
      >
        <Box
          className="TopBlackBox"
          sx={{
            position: "relative",
            zIndex: "2",
            backgroundColor: "black",
            width: "100%",
          }}
        >
          <Grid container spacing={1.8}>
            <Box
              className="LeftSectionTop"
              sx={{
                display: "flex",
                flexDirection: "row",
                position: "relative",
                zIndex: "3",
                backgroundColor: "black",
                width: "56%",
                height: "51.19vh",
              }}
            >
              <Box
                className="LeftLeftSection"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  zIndex: "3",
                  backgroundColor: "black",
                  width: "100%",
                  height: "51.19vh",
                }}
              >
                <Box
                  className="topLeftLeft"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    zIndex: "3",
                    position: "relative",
                    width: "100%",
                  }}
                >
                  <Box
                    className="topLeftLeftColumnSection"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      zIndex: "3",
                      backgroundColor: "black",
                      width: "100%",
                    }}
                  >
                    <Typography
                      align="left"
                      sx={{
                        paddingLeft: "3.88%",
                        paddingTop: "1.33%",
                        fontSize: "calc(1.55em + 1vw)",
                        fontWeight: 700,
                        fontFamily: "inter",
                        zIndex: "4",
                        color: "white",
                      }}
                    >
                      PICKLEBALL, SIMPLIFIED
                    </Typography>
                    <Typography
                      align="left"
                      sx={{
                        paddingLeft: "3.88%",
                        paddingRight: "20%",
                        fontSize: "calc(0.29em + 1vw)",
                        fontWeight: 400,
                        fontFamily: "inter",
                        zIndex: "4",
                        color: "white",
                      }}
                    >
                      Fun, social and friendly. The rules are simple and the
                      game is easy for beginners to learn, but can develop into
                      a quick, fast-paced, competitive game for experienced
                      players.
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      width: "30%",
                    }}
                  >
                    <Typography
                      align="right"
                      sx={{
                        fontStyle: "italic",
                        fontSize: "calc(0.19em + 1vw)",
                        fontWeight: 400,
                        fontFamily: "inter",
                        zIndex: 4,
                        color: "#D5FD51",
                        paddingRight: "37%",
                        paddingTop: "10%",
                      }}
                    >
                      Fig 1.
                    </Typography>
                    <Typography
                      align="right"
                      sx={{
                        fontSize: "calc(0.16em + 1vw)",
                        fontWeight: 400,
                        fontFamily: "inter",
                        zIndex: 4,
                        color: "white",
                        paddingRight: "10%",
                      }}
                    >
                      A pickleball
                    </Typography>
                    <Typography
                      align="right"
                      sx={{
                        fontSize: "calc(0.16em + 1vw)",
                        fontWeight: 400,
                        fontFamily: "inter",
                        zIndex: 4,
                        color: "white",
                        paddingRight: "5%",
                      }}
                    >
                      court layout.
                    </Typography>
                  </Box>
                </Box>
                <Box
                  className="BottomOfLeftLeft"
                  sx={{
                    position: "relative",
                    zIndex: "4",
                    display: "flex",
                    flexDirection: "row",
                    paddingLeft: "2.33%",
                    paddingRight: "8%",
                    paddingTop: "4.5%",
                  }}
                >
                  <Button
                    sx={{
                      display: "flex",
                      position: "relative",
                      width: "50%",
                      height: "93%",
                    }}
                  >
                    <img
                      className="handBallPaddle"
                      src={equipmentButton}
                      position="relative"
                      width="100%"
                      height="100%"
                      zIndex="5"
                    />
                  </Button>
                  <Button
                    sx={{
                      display: "flex",
                      position: "relative",
                      width: "50%",
                      height: "93%",
                    }}
                  >
                    <img
                      className="courtPlay"
                      src={whatToWearButton}
                      position="relative"
                      width="100%"
                      height="100%"
                      zIndex="5"
                    />
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box
              className="RightSectionTop"
              sx={{
                position: "relative",
                zIndex: "3",
                backgroundColor: "black",
                width: "44%",
                height: "51.19vh",
              }}
            >
              <img
                className="courtDiagram"
                src={courtDiagram}
                position="relative"
                zIndex="5"
                width="98%"
                height="92%"
                align="center"
              />
            </Box>
          </Grid>
        </Box>
      </Box>

      <Box
        className="BottomWhiteBox"
        sx={{
          position: "relative",
          zIndex: "2",
          backgroundColor: "white",
          width: "100%",
        }}
      >
        <Grid
          container
          spacing={1.8}
          paddingTop={"5vh"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Box
            sx={{
              backgroundColor: "#9146D8",
              width: "38vh",
              height: "19.5vh",
              marginBottom: "3vh",
            }}
          >
            <Typography
              align="left"
              sx={{
                paddingLeft: "4.33%",
                paddingTop: "1%",
                fontSize: "calc(1.4em + 1vw)",
                fontWeight: 700,
                fontFamily: "inter",
                zIndex: 4,
                color: "white",
              }}
            >
              EDUCATORS
            </Typography>
            <Typography
              align="left"
              sx={{
                paddingLeft: "4.33%",
                paddingRight: "3%",
                fontSize: "calc(0.12em + 1vw)",
                fontWeight: 400,
                fontFamily: "inter",
                zIndex: 4,
                color: "white",
                paddingBottom: "4.2%",
              }}
            >
              FIND A MENTOR, OR SHARE YOUR <br /> PASSION WITH OTHERS
            </Typography>

            <img
              className="rightArrow"
              src={rightArrow}
              zIndex="5"
              align="right"
              marginBottom={0}
            />
          </Box>

          <Box
            sx={{
              backgroundColor: "black",
              width: "38vh",
              height: "19.5vh",
              marginBottom: "3vh",
            }}
          >
            <Typography
              align="left"
              sx={{
                paddingLeft: "4.33%",
                paddingTop: "1%",
                fontSize: "calc(1.4em + 1vw)",
                fontWeight: 700,
                fontFamily: "inter",
                zIndex: 4,
                color: "white",
              }}
            >
              RULES
            </Typography>
            <Typography
              align="left"
              sx={{
                paddingLeft: "4.33%",
                paddingRight: "3%",
                fontSize: "calc(0.12em + 1vw)",
                fontWeight: 400,
                fontFamily: "inter",
                zIndex: 4,
                color: "white",
                paddingBottom: "4.2%",
              }}
            >
              CHECK OUT THE OFFICIAL RULES AND REGULATIONS
            </Typography>

            <img
              className="rightArrow"
              src={rightArrow}
              zIndex="5"
              align="right"
              marginBottom={0}
            />
          </Box>

          <Box
            sx={{
              backgroundColor: "#9146D8",
              width: "38vh",
              height: "19.5vh",
              marginBottom: "3vh",
            }}
          >
            <Typography
              align="left"
              sx={{
                paddingLeft: "4.33%",
                paddingTop: "1%",
                fontSize: "calc(1.4em + 1vw)",
                fontWeight: 700,
                fontFamily: "inter",
                zIndex: 4,
                color: "white",
              }}
            >
              STRATEGIES
            </Typography>
            <Typography
              align="left"
              sx={{
                paddingLeft: "4.33%",
                paddingRight: "3%",
                fontSize: "calc(0.12em + 1vw)",
                fontWeight: 400,
                fontFamily: "inter",
                zIndex: 4,
                color: "white",
                paddingBottom: "4.2%",
              }}
            >
              LEVEL UP YOUR GAME WITH A VARIETY OF STRATEGIES
            </Typography>

            <img
              className="rightArrow"
              src={rightArrow}
              zIndex="5"
              align="right"
              marginBottom={0}
            />
          </Box>

          <Box
            sx={{
              backgroundColor: "black",
              width: "38vh",
              height: "19.5vh",
              marginBottom: "3vh",
            }}
          >
            <Typography
              align="left"
              sx={{
                paddingLeft: "4.33%",
                paddingTop: "1%",
                fontSize: "calc(1.4em + 1vw)",
                fontWeight: 700,
                fontFamily: "inter",
                zIndex: 4,
                color: "white",
              }}
            >
              PLACES 2 PLAY
            </Typography>
            <Typography
              align="left"
              sx={{
                paddingLeft: "4.33%",
                paddingRight: "3%",
                fontSize: "calc(0.12em + 1vw)",
                fontWeight: 400,
                fontFamily: "inter",
                zIndex: 4,
                color: "white",
                paddingBottom: "4.2%",
              }}
            >
              JOIN THE COMMUNITY AND FIND LEAGUES IN YOUR AREA
            </Typography>

            <img
              className="rightArrow"
              src={rightArrow}
              zIndex="5"
              align="right"
              marginBottom={0}
            />
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};
