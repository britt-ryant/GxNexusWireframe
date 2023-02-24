import React from 'react';

//import functional components
import MainParent from './MainParent';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';






class MainRouter extends React.Component{
    render(){
        return(
            <>
                <Router>
                    <Routes>
                        <Route exact path='/' element={<MainParent />} />
                    </Routes>
                </Router>
            </>
        )
    }
}


export default MainRouter;