import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';


export const getAllTrainees = createAsyncThunk(
    'trainee/getAll',
    async(payload) => {
        console.log(payload);
        const response = await fetch(`http://localhost:5000/trainees/${payload.tableName}/all`)
        if(response.ok){
            const data = await response.json();
            console.log(data)
            return data
        } else {
            console.log(`Error getting distinct trainees`)
        }
    }
);

export const getTraineeById = createAsyncThunk(
    'trainee/getOne',
    async(payload) => {
        console.log(payload);
        const response = await fetch(`http://localhost:5000/trainees/${payload.tableName}/${payload.empId}`)
        if(response.ok){
            const data = await response.json()
            return data
        } else {
            console.log(`Error getting distinct trainees`)
        }
    }
);

export const getTraineesByCohort = createAsyncThunk(
    'trainee/getOneCohort',
    async(payload) => {
        console.log(payload);
        const response = await fetch(`http://localhost:5000/trainees/${payload.tableName}/cohort/${payload.cohort}`)
        if(response.ok){
            const data = await response.json()
            return data
        } else {
            console.log(`Error getting distinct trainees`)
        }
    }
);

export const getTotalCohorts = createAsyncThunk(
    'trainee/allCohorts',
    async(payload) => {
        console.log(payload);
        const response = await fetch(`http://localhost:5000/trainees/${payload.tableName}/cohort/all`)
        if(response.ok){
            const data = await response.json();
            console.log(data)
            return data
        } else {
            console.log(`Error getting distinct trainees`)
        }
    }
);





const initialState = {
    currentTraineeId: "",
    allTrainees: [],
    allTraineesColumns: [
        {field: "EmpNumber", headerName: "Employee Id", width: 100, editable: false},
        {field: "FirstName", headerName: "First Name", width: 100, editable: false},
        {field: "LastName", headerName: "Last Name", width: 100, editable: false},
        {field: "City", headerName: "City", width: 100, editable: false},
        {field: "TrainingPath", headerName: "Training Path", width: 100, editable: false},
    ],
    allCohorts: [],
    allCohortColumns: [
        {field: "TrainingPath", headerName: "Cohort Name", width: 200, editable: false},
        {field: "TotalStudents", headerName: "Number of Trainees", width: 200, editable: false}
    ],
    currentTrainee: [],
    currentCohort: [],
    renderAllTrainees: false,
    renderCurrentTrainee: false,
    renderCurrentCohort: false
};


export const traineeSlice = createSlice({
    name: "trainees",
    initialState,
    reducers: {
        setSelectedTraineeReducer: (state, action) => {
            state.currentTraineeId = action.payload;
        },
        setRenderAllTraineesReducer: (state, action) => {
            state.renderAllTrainees = action.payload;
        },
        setRenderCurrentTraineeReducer: (state, action) => {
            state.renderCurrentTrainee = action.payload;
        },
        setRenderCurrentCohortReducer: (state, action) => {
            state.renderCurrentCohort = action.payload;
        },
        resetDialogRenderReducer: (state, action) => {
            state.renderCurrentTrainee = false;
            state.renderCurrentCohort = false;
        }
    },
    extraReducers: {
        [getAllTrainees.pending]: (state, action) => {
            console.log(`getting distinct trainees`)
        },
        [getAllTrainees.fulfilled]: (state, action) => {
            console.log(`fulfilled`, action.payload)
            action.payload.forEach((element, index) => {
                element.id = index;
            });
            state.allTrainees = action.payload;
        },
        [getTraineeById.pending]: (state, action) => {
            console.log(`getting distinct trainee`)
        },
        [getTraineeById.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.currentTrainee = action.payload;
            state.renderCurrentTrainee = true;
        },
        [getTraineesByCohort.pending]: (state, action) => {
            console.log(`getting distinct cohort`)
        },
        [getTraineesByCohort.fulfilled]: (state, action) => {
            state.currentCohort = action.payload;
            state.renderCurrentCohort = true;
        },
        [getTotalCohorts.pending]: (state, action) => {
            console.log(`Getting all cohorts`)
        },
        [getTotalCohorts.fulfilled]: (state, action) => {
            console.log(action.payload)
            action.payload.forEach((element, index) => {
                element.id = index;
            });
            state.allCohorts = action.payload;
        }
    }
});


export const {setSelectedTraineeReducer, setRenderAllTraineesReducer, setRenderCurrentTraineeReducer, setRenderCurrentCohortReducer, resetDialogRenderReducer} = traineeSlice.actions;
export default traineeSlice.reducer;

