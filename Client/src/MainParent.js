import React from 'react';

//import redux comp
import { connect, useDispatch } from 'react-redux';
import {PURGE} from 'redux-persist';

//import components
import Header from './HeaderComponents/Header';
import NavBar from './HeaderComponents/NavBar';
import HomePage from './unusedComponents/HomePage';
import ProgressStepper from './StepperComponents/ProgressStepper';
import TraineeLandingPage from './TraineeComponents/TraineeLandingPage';
import Nav from './NewComp/Nav';

//import MUI
import { Box } from '@mui/system';
import { Button, Dialog, Grid, Typography } from '@mui/material';
import Landing from './NewComp/LandingPage';
import { getTotalCohorts, getTraineesByCohort, resetDialogRenderReducer } from './redux/traineeSlice';
import { renderDialogComponentReducer } from './redux/renderSlice';
import ProfileManager from './ProfileComponents/ProfileManager';
import CloseIcon from '@mui/icons-material/Close';


//bring in redux state as props
const stateToProps = (state) => {
    return state
}

class MainParent extends React.Component{
    constructor(props){
        super(props);
        this.showState = this.showState.bind(this);
        this.handlePurge = this.handlePurge.bind(this);
        this.getOneCohort = this.getOneCohort.bind(this);
        this.getAllCohorts = this.getAllCohorts.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        
    }
    componentRender(){
        switch(this.props.render.clickedButton){
            case "Upload Data":
                return <ProgressStepper />
            case "Cohorts":
                return console.log(`render cohorts`);
            case "Trainees":
                return <TraineeLandingPage />;
            case "Assignments": 
                return console.log(`render assignments`);
            case "Reports":
                return console.log(`render Reports`);
            case "Setting":
                return console.log(`render settings`);
            default: 
                return <Landing />
        }
    };

    handlePurge(){
        const {dispatch} = this.props;
            dispatch({
              type: PURGE,
              key: "root",
              result: () => null,
            });
    }

    getOneCohort(cohort){
        const {dispatch} = this.props;
        let tableName = this.props.files.tableName;
        dispatch(getTraineesByCohort({tableName, cohort}))
    };
    getAllCohorts(){
        const {dispatch} = this.props;
        let tableName = this.props.files.tableName;
        dispatch(getTotalCohorts({tableName}))
    };

    showState(){
        console.log(this.props.render.navButtons);
    };

    handleDialogClose(){
        const {dispatch} = this.props;
        dispatch(renderDialogComponentReducer());
        dispatch(resetDialogRenderReducer())
    }
    render(){
        return(
            <>
                <Box sx={{flexGrow: 1, border: '2px solid black'}} >
                    <Dialog open={this.props.render.renderDialog} 
                            onClose={this.handleDialogClose} 
                            // fullWidth
                            fullScreen
                            >
                            {/* <Button sx={{width: '2px'}} onClick={this.handleDialogClose}><CloseIcon /></Button> */}
                            <Header />
                            <ProfileManager />
                    </Dialog>
                    <Grid container spacing={2} key={1} >
                        <Grid item xs={2} mt={10}>
                            <Nav />
                        </Grid>
                        <Grid item xs={8} key={2}>
                            {this.componentRender()}
                            <Button onClick={this.handlePurge}>PURGE</Button>
                        </Grid>
                    </Grid>
                </Box>
            </>
        )
    }
}

export default connect(stateToProps)(MainParent)