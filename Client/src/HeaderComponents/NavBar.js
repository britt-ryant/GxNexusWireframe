import React from "react";
import { AppBar, Box, Button, Typography } from "@mui/material";
import ExcelImport from "../StepperComponents/Steps/ExcelImport";
import ProgressStepper from '../StepperComponents/ProgressStepper';
import SettingsIcon from '@mui/icons-material/Settings';

//redux comp imports
import { useDispatch, useSelector } from "react-redux";
import {renderFile} from '../redux/fileUploadSlice';
import {navBarButtonClickReducer} from '../redux/renderSlice';





const tabs = ["Upload Data", "Cohorts", "Trainees", "Assignments", "Reports"];

export default function NavBar() {
  const render = useSelector(state => state.files.renderData)
  const navButtons = useSelector((state) => state.render.navButtons)
  const dispatch = useDispatch();

  const handleClick = (buttonIndex) => {
    console.log(buttonIndex);
    dispatch(navBarButtonClickReducer(buttonIndex))
  }

return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: "#00294d",
          display: "flex",
          flexDirection: "row",
          // justifyContent: "space-between",
          gap: 3,
        }}
      >
        {navButtons.map((button, index) => {
          return(<Button key={index} onClick={() => handleClick(index)} sx={{ color: "white" , marginLeft: 1}}>{button.text}</Button>)
        })}
        {/* {tabs.map((tab) => (
          tab === "Upload" ? <Button key={tab} sx={{ color: "white" }} onClick={() => dispatch(renderFile())}>{tab}</Button> : <Button key={tab} sx={{ color: "white" , marginLeft: 1}}>
          {tab}
        </Button>
        ))} */}

        <Button sx={{display: "flex", justifyContent: "space-between"}}></Button>
        <Button sx={{display: "flex", justifyContent: "space-between"}}></Button>
        <Button sx={{display: "flex", justifyContent: "space-between"}}></Button>
        <Button sx={{display: "flex", justifyContent: "space-between"}}></Button>
        <Button sx={{display: "flex", justifyContent: "space-between"}}></Button>
        <Button sx={{display: "flex", justifyContent: "space-between"}}></Button>
        <Button sx={{display: "flex", justifyContent: "space-between"}}></Button>
        <Button sx={{display: "flex", justifyContent: "space-between"}}></Button>
        <Button sx={{display: "flex", justifyContent: "space-between"}}></Button>
        <Button sx={{display: "flex", justifyContent: "space-between"}}></Button>
        <Button sx={{display: "flex", justifyContent: "space-between"}}></Button>
        {/* <Button sx={{display: "flex", justifyContent: "space-between"}}></Button> */}
        {/* <Button sx={{display: "flex", justifyContent: "space-between"}}></Button> */}
        <Box sx={{width: '2%'}}></Box>
        {/* <Button sx={{display: "flex", justifyContent: "space-between"}}></Button> */}
        <Button sx={{display: "flex", justifyContent: "space-between"}}><SettingsIcon sx={{color: "white"}}/></Button>
      </AppBar>
      {/* <ProgressStepper /> */}
      {/* {
        render ? <ExcelImport /> : null
      } */}
    </Box>
  )
}

