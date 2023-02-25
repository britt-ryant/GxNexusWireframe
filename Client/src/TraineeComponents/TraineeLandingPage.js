import { Typography, Box, Button, Dialog, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTrainees, getTraineeById, getTraineesByCohort, setRenderAllTraineesReducer, setRenderCurrentTraineeReducer } from '../redux/traineeSlice';





const TraineeLandingPage = (props) => {

    const tableName = useSelector((state) => state.files.tableName);
    const showAllTrainees = useSelector((state) => state.trainee.renderAllTrainees);
    const renderSingleTrainee = useSelector((state) => state.trainee.renderCurrentTrainee);
    const columns = useSelector((state) => state.trainee.allTraineesColumns);
    const rows = useSelector((state) => state.trainee.allTrainees);
    const currentTraineeInfo = useSelector((state) => state.trainee.currentTrainee[0])

 

    const dispatch = useDispatch()

    React.useEffect(() => {
        console.log(`called`)
        dispatch(getAllTrainees({tableName})).then((res) => {
            dispatch(setRenderAllTraineesReducer(true))
        })
    },[])

    const handleGetAllTrainees = () => {
        dispatch(getAllTrainees({tableName}))
    }
    const handleGetOneTrainee = (empId) => {
        dispatch(getTraineeById({tableName, empId}))
    }
    const handleGetTraineesByCohort = (cohort) => {
        dispatch(getTraineesByCohort({tableName, cohort}))
    };

    const handleRowSelection = (event) => {
        console.log(event);
        let selectedTrainee = rows.find(obj => obj.id === event[0]);
        console.log(selectedTrainee)
        if(selectedTrainee){
            dispatch(getTraineeById({tableName, empId: selectedTrainee.EmpNumber})).then(() => {
                dispatch(setRenderCurrentTraineeReducer(true))
            })
        }
    }

    const handleDialogClose = () => {
        dispatch(setRenderCurrentTraineeReducer(false))
    }


    return(
        <>
            <Box sx={{ height: '50vh'}}>
                {/* <Button onClick={handleGetAllTrainees}>Get all</Button>
                <Button onClick={() => handleGetOneTrainee('100')}>ID</Button>
                <Button onClick={() => handleGetTraineesByCohort('O2A')}>Cohort</Button> */}

                <Box sx={{ height: 400, width: '100%'}}>
                    {showAllTrainees ? 
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOption={[5]}
                        // onCellEditCommit={editCells}
                        checkboxSelection
                        disableSelectionOnClick
                        onSelectionModelChange={handleRowSelection}
                    /> : null }
                    {currentTraineeInfo ? 
                    <Dialog
                      open={renderSingleTrainee}
                      onClose={handleDialogClose}
                      fullWidth >
                        <Paper>
                            <Typography>{currentTraineeInfo.FirstName} {currentTraineeInfo.LastName}</Typography>
                        </Paper>
                      </Dialog> : null}
      </Box>
                  </Box>
        </>
    )
}


export default TraineeLandingPage;