import React from 'react';

//import MUI components
import { Button, Typography } from '@mui/material';

//import redux components
import { useDispatch, useSelector } from 'react-redux';
import { navBarButtonClickReducer, renderExtraPagesReducer } from '../redux/renderSlice';


export default function TopNavButtons(props){
    const topNavButtons = useSelector((state) => state.render.navButtons);

    const dispatch = useDispatch()

    const handleTopButtonClick = (index) => {
        console.log(index);
        if(index === 0){
            dispatch(navBarButtonClickReducer(index))
        } else {
            dispatch(renderExtraPagesReducer(index));
        }
    }
    return (
        <>
            {topNavButtons.map((button, index) => {
                // console.log(button)
                return <Button key={index} sx={{color: "white"}} onClick={() => handleTopButtonClick(index)}>{button.text}</Button>
            })}
        </>
    )
}