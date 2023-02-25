import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//import MUI components to state
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GradingIcon from '@mui/icons-material/Grading';
import CoPresentIcon from '@mui/icons-material/CoPresent';

const initialState = {
    navButtons: [
        {text: "Home", icon: null},
        {text: "Upload Data", icon: null},
        {text: "Cohorts", icon: null},
        {text: "Trainees", icon: null},
        {text: "Assignments", icon: null},
        {text: "Reports", icon: null},
        {text: "Setting", icon: null},
    ],
    clickedButton: "",
    drawerOpen: false,
}

export const renderSlice = createSlice({
    name: "render",
    initialState,
    reducers: {
        navBarButtonClickReducer: (state, action) => {
            state.clickedButton = state.navButtons[action.payload].text 
        },
        setDrawerOpenReducer: (state, action) => {
            state.drawerOpen = !state.drawerOpen;
        }
    }
})


export const {navBarButtonClickReducer, setDrawerOpenReducer} = renderSlice.actions;
export default renderSlice.reducer;