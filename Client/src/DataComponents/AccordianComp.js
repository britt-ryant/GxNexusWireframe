import React from 'react';

//MUI components
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid } from "@mui/x-data-grid";

//import redux components
import {useSelector, useDispatch} from 'react-redux';
import { getTotalCohorts, getAllTrainees, getTraineeById, getTraineesByCohort } from '../redux/traineeSlice';
import { renderDialogComponentReducer } from '../redux/renderSlice';





export default function AccordionComp(){
    const tableName = useSelector((state) => state.files.tableName)

    const traineeColumns = useSelector((state) => state.trainee.allTraineesColumns);
    const allTrainees = useSelector((state) => state.trainee.allTrainees);

    const cohortColumns = useSelector((state) => state.trainee.allCohortColumns);
    const allCohorts = useSelector((state) => state.trainee.allCohorts);


    const dispatch = useDispatch();
    
    


    React.useEffect(() => {

        if(allTrainees.length === 0 && allCohorts.length === 0 && tableName){
            console.log(`useEffect`)
            dispatch(getTotalCohorts({tableName}));
            dispatch(getAllTrainees({tableName}))
        }
    },[]);

    const handleCohortClick = (event) => {
        console.log(event)
        dispatch(getTraineesByCohort({tableName, cohort: event.row.TrainingPath})).then((res) => {
            dispatch(renderDialogComponentReducer());
        })
    };

    const handleTraineeClick = (event) => {
        console.log(event);
        dispatch(getTraineeById({tableName, empId: event.row.EmpNumber})).then(() => {
            dispatch(renderDialogComponentReducer());
        })
    
    }

    //Should rework this comoponent to have half the render code, needs to map accordians based on state
    return(
        <>
                <Grid item xs={20} mt={-20}>
                    <Grid container justifyContent="center" spacing={10}>
                        <Grid item xs={5}>
                        <div>
                            <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Trainees</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                rows={allTrainees}
                                columns={traineeColumns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                onRowClick={handleTraineeClick}
                                />
                                </div>
                            </AccordionDetails>
                            </Accordion>
                        </div>
                        </Grid>
                        <Grid item xs={5}>
                        <div>
                            <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>Cohorts</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                rows={allCohorts}
                                columns={cohortColumns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                onRowClick={handleCohortClick}
                                />
                                </div>
                            </AccordionDetails>
                            </Accordion>
                        </div>
                        </Grid>
                    </Grid>
                </Grid>
        </>
    )
}