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

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontFamily: 'Inter',
    fontWeight: 700,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(2),
    color: 'rgba(255, 255, 255, 0.8)',
    '&.Mui-selected': {
      color: '#fff',
      backgroundColor: '#A1C038',
      borderTopLeftRadius: '.8rem',
      borderTopRightRadius: '.8rem'

    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }),
);

export default function CustomizedTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '60%' }}>
      <Box>
        <StyledTabs
          value={value}
          onChange={handleChange}
        >
          <StyledTab label="All" sx={{
            padding: 0
          }}/>
          <StyledTab label="Singles" />
          <StyledTab label="Doubles" />
          <StyledTab label="Novice" />
          <StyledTab label="Intermediate"/>
          <StyledTab label="Advanced" />
        </StyledTabs>
        <Box />
      </Box>
    </Box>
  );
}