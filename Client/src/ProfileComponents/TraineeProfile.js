import React from 'react';
//import MUI components
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Button, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


//import redux store and other components
import { useSelector, useDispatch } from 'react-redux';
import { renderDialogComponentReducer } from '../redux/renderSlice';
import { resetDialogRenderReducer } from '../redux/traineeSlice';


export default function TraineeProfile(){
    const tableName = useSelector((state) => state.files.tableName);
    const traineeInfo = useSelector((state) => state.trainee.currentTrainee);

    //data grid comp --> will need to reformat this but using the uploaded document colums for now
    const columns = useSelector((state) => state.files.columnName);



    const trainee = traineeInfo[0]

    const dispatch = useDispatch();

    const handleDialogClose = () => {
        dispatch(renderDialogComponentReducer());
        dispatch(resetDialogRenderReducer())

    }


    return(
        <>
            <Grid   container
                    component="mainProfile"
                    sx={{border: '2px solid black', height: '100vh'}}

                    // xs={50}
                    // justifyContent="center"
                    columnSpacing={2}
                    >
                <Grid item xs={0} mt={0}><Button onClick={handleDialogClose}><CloseIcon/></Button></Grid>
                <Grid item xs={2} mt={2} sx={{border: '2px solid black'}}>
                    <Typography>Trainee: {trainee.FirstName} {trainee.LastName}</Typography>
                    <Typography>Employee Number: {trainee.EmpNumber}</Typography>
                    <Typography>Gender: {trainee.URIGender}</Typography>
                    <Typography>City: {trainee.City}</Typography>
                    <Typography>Source: {trainee.Source}</Typography>
                </Grid>
                <Grid item xs={8} mt={2} sx={{border: '2px solid black'}}>
                    Rank Component
                    <Typography>Cohort: {trainee.TrainingPath}</Typography>
                    <Typography>Current Role: {trainee.CurrentRole}</Typography>
                    <Typography>Meeting Expectations: {trainee.MeetingExpectations}</Typography>
                </Grid>
                <Grid item lg={100} mt={2} sx={{border: '2px solid black', p:2}}>
                    stats
                    <DataGrid
                                rows={traineeInfo}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                // onRowClick={handleTraineeClick}
                                />

                </Grid>         
            </Grid>
        </>
    )
}