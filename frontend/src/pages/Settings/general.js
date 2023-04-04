import React from 'react'
import Box from "@mui/material/Box";
import Row from '../../components/Rows/row.js';


export default function general() {
  return (
    <Box sx={{
      paddingTop: '3vw',
      paddingBottom: '3vw',
      paddingLeft: '3vw',

    }}>
      <Row first={'Name'} second={'Reetesh Sudhakar'} third={'Edit'} emphSize={'0'}/>
      <Row first={'Email'} second={'reetesh.sudhakar@consultyourcommunity.org'} third={'Edit'} emphSize={'0'}/>
      <Row first={'Username'} second={'reetesh.sudhakar'} third={'Edit'} emphSize={'0'}/>
      <Row first={'Password'} second={'*****************'} third={'Edit'} emphSize={'0'}/>
      <Row first={'Contact'} second={'+1 (123) 456-7890'} third={'Edit'} emphSize={'0'}/>
      <Row first={'Identity Confirmation'} second={'Confirm your identity to streamline tournament registration, visibility, and account privileges on our website.'} third={'Complete'} emphSize={'0'}/>
      <Row first={'Activity Log'} second={'View a log of your activity over the past month. '} third={'View'} emphSize={'0'}/>
      <Row first={'Deactivate Account'} second={'WARNING: Deactivating your account deletes all information, and is irreversible. Ensure that you want to proceed before starting.'} third={'Deactivate'} emphSize={'1'}/>


  </Box>
  )
}