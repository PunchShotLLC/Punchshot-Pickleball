import Box from "@mui/material/Box";
import eventImage from './event.png';
import Typography from "@mui/material/Typography";

export const FeedItem = (props) => {
    return (
        <Box sx={{display:"flex", height:"8vh", marginBottom:"10vh"}}>
            <Box component="img" sx={{height:"15vh", width:"auto"}} src={eventImage} />
            <Box sx={{borderLeft:"2px solid rgba(145, 70, 216, 1)", marginLeft:"0.5vw", paddingLeft:"0.5vw", display:"flex", flexDirection:"column", justifyContent:"space-between", height:"15vh", width:"15vw" }}>
                <Typography sx={{fontSize:"calc(0.05em + 1vw)"}}>{props.message}</Typography>
                <Typography sx={{color:"#9146D8", fontSize:"calc(0.05em + 1vw)"}}>{props.date}</Typography>
                <Typography sx={{color:"#9146D8", fontSize:"calc(0.05em + 1vw)"}}>{`Author | ${props.author}`}</Typography>
            </Box>
        </Box>
    )
}