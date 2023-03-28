import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: '#ffffff',
  }
});



export default function CustomizedTabs(props) {

  const [value, setValue] = React.useState(0);

  const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: 'none',
      fontFamily: 'Inter',
      fontWeight: 700,
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(2),
      color: '#000000',
      '&.Mui-selected': {
        color: '#fff',
        backgroundColor: props.color,
        borderTopLeftRadius: '.8rem',
        borderTopRightRadius: '.8rem'
  
      },
      '&.Mui-focusVisible': {
        backgroundColor: '#000000',
      },
    }),
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '70%' }}>
      <Box>
        <StyledTabs
          value={value}
          onChange={handleChange}
        >
          {props.data.map((tab) => (
            <StyledTab label={tab.name} key={tab.id*1000}  onClick={() => props.handleCallback(tab.id)}  />
          ))}
        </StyledTabs>
        <Box />
      </Box>
    </Box>
  );
}