import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const BootstrapInput = styled(InputBase)(({ theme }) => ({

  '& .MuiInputBase-input': {
    borderRadius: '1em',
    margin: 'auto',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '3px solid #000000',
    fontSize: 'calc(0.8vw + 0.1em)',
    padding: '5px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),

    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha("#ffffff", 0.25)} 0 0 0 0.2rem`,
      borderColor: "D5FD51",
    },
  },
}));

export default function CustomizedInputs({ id }) {
  return (
    <div>
          <BootstrapInput label='password' fullWidth id={ id } />
    </div>
  );
}