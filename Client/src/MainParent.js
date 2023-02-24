import React from 'react';

//import components
import Header from './HeaderComponents/Header';
import NavBar from './HeaderComponents/NavBar';



export default class MainParent extends React.Component{
    render(){
        return(
            <>
                <Header />
                <NavBar />
            </>
        )
    }
}