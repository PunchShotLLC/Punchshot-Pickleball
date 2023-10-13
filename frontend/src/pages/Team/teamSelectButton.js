import * as React from 'react';
import './teamSelectButton.css'

export const TeamSelectButton = (props) => {
    return (
        <div className='team-select-button' onClick={props.onClick}>
            <h2 className='team-select-text'>{props.name}</h2>
            <p className='team-select-text'>{props.city}</p>
        </div>
    )
}