import React from 'react';

import {Box, Button} from '@mui/material';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MultilineChartIcon from '@mui/icons-material/MultilineChart';


import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Tooltip from '@mui/material/Tooltip';




 const ButtonComp = () => {
    const buttonText = [{text: 'Bar Graph', icon: <BarChartIcon />}, {text: 'Line Chart', icon: <ShowChartIcon /> }, {text: "Multiple Line Chart", icon: <MultilineChartIcon />}, {text: "Bubble Graph", icon: <BubbleChartIcon />}, {text: "Trending", icon: <TrendingUpIcon />}]
    return(
        <>
        {/* <Box>
            {buttonText.map((button) => {
                return <Button variant='contained' sx={{margin: 3}}>{button.text}{button.icon}</Button>
            })}
        </Box> */}
        <ToggleButtonGroup
            // value={alignment}
            exclusive
            // onChange={handleAlignment}
            aria-label="text alignment"
    >
    <Tooltip title="Bar Graph" placement="bottom">
      <ToggleButton value="left" aria-label="left aligned">
        <BarChartIcon />
      </ToggleButton>

    </Tooltip>
      <ToggleButton value="center" aria-label="centered">
        <BubbleChartIcon />
      </ToggleButton>
      <ToggleButton value="right" aria-label="right aligned">
        <ShowChartIcon />
      </ToggleButton>
      <ToggleButton value="justify" aria-label="justified">
        <TrendingUpIcon />
      </ToggleButton>
    </ToggleButtonGroup>
        </>
    )

}

export default ButtonComp