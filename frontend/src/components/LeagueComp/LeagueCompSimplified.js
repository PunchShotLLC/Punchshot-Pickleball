import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import * as React from "react";
import { borderRadius } from "@mui/system";


export const LeagueComp = (props) => {
    return (
      <Box sx={styles.main}>
            <img
                src={props.logo}
                width={'120vh'}
                height={'120vh'}
                style={{borderRadius:'20%', marginLeft:'2%'}}
            />
          <Box  sx={styles.side}>
              <Typography sx={styles.name}>{props.name}</Typography>
              <Box sx={styles.row}>
                  <Box sx={styles.data}>
                      <img src={require('../../assets/images/Team.png')} height={'30vh'} width={'33vh'} style={{border:'2px solid black', borderRadius:'50%'}}/>
                      <Typography sx={styles.info} >Your team: {props.teamName}</Typography>
                  </Box>
              </Box>
          </Box>
      </Box>
    );
  };
  
  const styles = {
      name: {
          fontSize: '3em'
      },
      side: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '10vh',
          marginBottom: '2%',
          marginLeft: '1%'
      },
      data: {
          display: 'flex',
          flexDirection: 'row',
          alignItems:'center',
      },
      data2: {
          display: 'flex',
          flexDirection: 'row',
          alignItems:'center',
          marginLeft: '-18%'
      },
      data3: {
          display: 'flex',
          flexDirection: 'row',
          alignItems:'center',
          marginLeft: '-6%'
      },
      main: {
          backgroundColor: "#F5F5F5",
          borderRadius: '10px',
          height: '16vh',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: '20px',
          marginBottom: '3%'
      },
      row: {
          display: 'flex',
          width: '90%',
          flexDirection: 'row',
      },
      info: {
          color: "black",
          width: '30vh',
          marginLeft: '2%',
          marginRight: '0%',
          fontSize: '1.2em'
      }
  }