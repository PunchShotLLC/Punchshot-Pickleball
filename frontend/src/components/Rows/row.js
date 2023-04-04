import React from 'react'
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import { Link } from 'react-router-dom';
import { maxWidth } from '@mui/system';


export default function Row(props) {
  return (
      <Grid container spacing={1}>
        <Grid item xs>
          <Typography
            sx={{
                color: "black",
                fontFamily: "Inter",
                fontSize: "calc(.2em + 1vw)",
                fontWeight: "700",
                textAlign: "center",
                paddingTop: "1vw",
                maxWidth: '9em'
            }}
            >
            {props.first} 
              </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
              sx={{
                  color: "black",
                  fontFamily: "Inter",
                  fontSize: "calc(.2em + 1vw)",
                  fontWeight: "400",
                  textAlign: "left",
                  paddingTop: "1vw"
              }}
              >
                <b>{props.second.split(" ", props.emphSize)}</b> {props.second.replace(props.second.split(" ", props.emphSize), "")}
              </Typography>
        </Grid>
        <Grid item xs>
        <Link href="#">
          <Typography
            sx={{
                color: "#9146D8",
                fontFamily: "Inter",
                fontSize: "calc(.2em + 1vw)",
                fontWeight: "700",
                textAlign: "center",
                paddingTop: "1vw"
            }}
            >
                 {props.third} </Typography>
          </Link>
        </Grid>
    </Grid> 
  )
}