import * as React from 'react';
import './leagueButton.css'

export const LeagueButton = (props) => {
    return (
        <div className='league-select-button'>
            <h2 className='league-select-text'>{props.name}</h2>
            <p className='league-select-text'>{props.city}</p>
        </div>
    )
}