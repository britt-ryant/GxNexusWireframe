import React from 'react';

//import redux store and components
import { useDispatch, useSelector } from 'react-redux';

//import components
import TraineeProfile from './TraineeProfile';
import CohortProfile from './CohortProfile';

export default function ProfileManager(){
    const trainee = useSelector((state) => state.trainee.renderCurrentTrainee);
    const cohort = useSelector((state) => state.trainee.renderCurrentCohort);

    return(
        <>
        {trainee ? <TraineeProfile /> : null}
        {cohort ? <CohortProfile /> : null} 
        </>
    )
}