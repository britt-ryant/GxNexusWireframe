import * as React from "react";

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
import { useSelector, useDispatch } from "react-redux";
import { navBarButtonClickReducer } from "../redux/renderSlice";
import { getTotalCohorts, getAllTrainees } from "../redux/traineeSlice";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function Landing() {
    const dataLoaded = useSelector((state) => state.files.fileUploaded);
    const tableName = useSelector((state) => state.files.tableName)

    const traineeColumns = useSelector((state) => state.trainee.allTraineesColumns);
    const allTrainees = useSelector((state) => state.trainee.allTrainees);

    const cohortColumns = useSelector((state) => state.trainee.allCohortColumns);
    const allCohorts = useSelector((state) => state.trainee.allCohorts);


    const dispatch = useDispatch();

    React.useEffect(() => {

        if(allTrainees.length === 0 && allCohorts.length === 0 && dataLoaded){
            dispatch(getTotalCohorts({tableName}));
            dispatch(getAllTrainees({tableName}))
        }
    },[])

    const renderAccordians = () => {
        return(
            <React.Fragment>
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
                                />
                                </div>
                            </AccordionDetails>
                            </Accordion>
                        </div>
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    };

    const renderUploadDataButton = () => {
        return(
            <React.Fragment>
                  <Grid item>
                    <Button variant="contained" endIcon={<AddIcon />} onClick={renderUploadDataPage}>
                        Upload Data
                    </Button>
                </Grid>
            </React.Fragment>
        )
    };

    const renderUploadDataPage = () => {
        console.log(`go to upload data page`);
        dispatch(navBarButtonClickReducer(1))
    }


  return (
    <div>
      <Grid
        container
        component="main"
        sx={{ height: "100vh" }}
        xs={20}
        justifyContent="center"
      >
        <Grid item xs={10} mt={30}>
          <TextField
            id="input-with-icon-textfield"
            label="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={10} mt={-20}>
          <Grid container justifyContent="center" spacing={10}>
            <Grid item>
              <Button variant="contained" endIcon={<AddIcon />}>
                Create a Trainee
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" endIcon={<AddIcon />}>
                Create a Cohort
              </Button>
            </Grid>
            {!dataLoaded ? renderUploadDataButton() : null}
          </Grid>
        </Grid>
        {dataLoaded && allTrainees.length !== 0 && allCohorts.length !== 0 ? renderAccordians() : null}
      </Grid>
    </div>
  );
}