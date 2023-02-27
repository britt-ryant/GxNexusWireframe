import React from 'react';

//import MUI components
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Button, Grid } from '@mui/material';

//import redux store and other components
import { useSelector, useDispatch } from 'react-redux';



export default function CohortProfile(){
    const tableName = useSelector((state) => state.files.tableName);
    const cohort = useSelector((state) => state.trainee.currentCohort);

    const dispatch = useDispatch();



    return(
        <>
            <Grid   container
                    component="mainProfile"
                    sx={{height: '100vh', border: '2px solid black'}}
                    xs={20}
                    justifyContent="center"
                    >
                <Grid item xs={10} mt={30}>
                    <Typography>Cohort: {cohort[0].TrainingPath}</Typography>
                </Grid>         
            </Grid>
        </>
    )
}