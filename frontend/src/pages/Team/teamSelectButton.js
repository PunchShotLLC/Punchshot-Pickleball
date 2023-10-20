import * as React from 'react';
import './teamSelectButton.css'
import { Button } from '@mui/material';

export const TeamSelectButton = (props) => {
    return (
        <div className='team-select-button'>
            <h2 className='team-select-text'>{props.name}</h2>
            <p className='team-select-text'>{props.city}</p>
            <p className='team-select-text'>Captain: {props.captain}</p>
            {props.players.map((item, index) => (
                <p>{props.players[index]}</p>
            ))} 
            <Button onClick={props.onClick}>Requst to Join</Button>
        </div>
    )
}