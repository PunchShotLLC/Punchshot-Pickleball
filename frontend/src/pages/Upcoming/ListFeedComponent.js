import Box from "@mui/material/Box";
// import eventImage from './event.png';
import inGame from '../../assets/images/inGame.png';
import Typography from "@mui/material/Typography";

export const ListFeedComponent = (props) => {
    return (
        <Box sx={{display:"flex", height:"8vh", marginBottom:"10vh"}}>
            <Box component="img" sx={{height:"15vh", width:"auto"}} src={inGame} />
            <Box sx={{borderLeft:"2px solid rgba(145, 70, 216, 1)", marginLeft:"0.5vw", paddingLeft:"0.5vw", display:"flex", flexDirection:"column", height:"14vh", width:"40vw" }}>
                <Typography sx={{fontSize:"calc(0.14em + 1vw)", color: "#9146D8", fontWeight: 'bold'}}>{props.eventTitle}</Typography>
                <Typography sx={{color:"black", fontSize:"calc(0.06em + 1vw)"}}>{`Events Offered: ${props.eventTypes}`}</Typography>
                <Typography sx={{color:"black", fontSize:"calc(0.06em + 1vw)"}}>{`Registration Cost: ${props.cost}`}</Typography>
                <Typography sx={{color:"black", fontSize:"calc(0.06em + 1vw)"}}>{`Dates: ${props.dates}`}</Typography>
            </Box>
        </Box>
    )
}