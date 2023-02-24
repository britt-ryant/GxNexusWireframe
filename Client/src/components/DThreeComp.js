import React from 'react';
import * as d3 from 'd3';
import { useDispatch, useSelector } from 'react-redux';
import { renderBarGraph, sortAssignmentScoreData, getDataByAssessmentName, setGenerateInputData } from '../redux/tableSlice';
import { Paper, Typography , Box} from '@mui/material';
import {renderToString} from 'react-dom/server'

import ButtonComp from './ButtonComp';

//importing the pdf library
import jsPDF from 'jspdf';

const DThreeComp = (props) => {
    const tableName = useSelector((state) => state.files.tableName);
    const graphData = useSelector(state => state.files.uploadedTableData);
    const renderAssessment = useSelector(state => state.table.assessmentScore)
    const sortedData = useSelector(state => state.table.assessmentScoreData);
    const [excOnce, setExcOnce] = React.useState(false)

    const dispatch = useDispatch();

    React.useEffect(() => {
        if(props.print){
            printFunction()
        }
    }, [props])

    React.useEffect(() => {
        dispatch(getDataByAssessmentName({tableName: tableName, assessmentName: "ReduxTest"})).then((res) => {
            dispatch(setGenerateInputData("ReduxTest"));

        })
    },[])

    React.useEffect(() => {
        dispatch(sortAssignmentScoreData(graphData));
    }, [graphData]);

    React.useEffect(() => {
        graphProccessing()
    }, [sortedData]);

    const graphProccessing = () => {
        const data = sortedData.filter(({score}) => score > 0)
        const margin = {
            top: 20,
            right: 20, 
            bottom: 20,
            left: 100
        };
        const width = 800 - (margin.left + margin.right)
        const height = 550 - (margin.top + margin.bottom)

        const svg = d3.select(".test")

        svg.selectAll("*").remove();
        svg
            .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`)
            .attr('width', width)
            .attr('height', height)

        const xScale = d3
            .scaleLinear()
            .domain([0, 100])
            .range([0, width]);

        const group = svg
            .append('g')
            .attr('transform', `translate(${margin.left} ${margin.top})`);

        const yScale = d3
            .scaleBand()
            .domain(data.map(({ name }) => name))
            .range([0, height])
            .padding(0.5);

            const xAxis = d3
            .axisBottom(xScale);

            const yAxis = d3
            .axisLeft(yScale);

            group
            .append('g')
            .attr('transform', `translate(0 ${height})`)
            .call(xAxis);

            group
            .append('g')
            .call(yAxis);

            const groups = group
            .selectAll('g.group')
            .data(data, ({ name }) => name)
            .enter()
            .append('g')
            .attr('class', 'group')
            .attr('transform', ({ name }) => `translate(0 ${yScale(name)})`);
            
            groups
            .append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', ({ score }) => xScale(score))
            .attr('height', yScale.bandwidth());

    }

    const printFunction = () => {
        // console.log(`print me`)
        // let doc = new jsPDF();
        // doc.html(document.getElementById('test'));
        // // doc.addSvgAsImage()
        // doc.addSvgAsImage(document.getElementById('test'), 20, 20, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
        // doc.save('newTest')
        // let printContents = document.getElementById('printableArea').innerHTML;
        // let origionalContents = document.body.innerHTML;
        // document.body.innerHTML = printContents;
        // window.print();
        // document.body.innerHTML = origionalContents;
    }

        return(
            <>
                <Box sx={{display: "flex", flexDirection: "column", width: '100vw', justifyContent: 'center', alignItems: 'center'}}>
                <h1>Assessment Score</h1>
                <Paper id="printableArea" sx={{pt: 2, boxShadow: 5, margin: 2}}>
                        {/* <Typography variant='h4' sx={{border: '2px solid black'}}>Assessment Score Results For Cohort</Typography>  */}
                        <svg id="test" className="test" />
                    </Paper>
                <ButtonComp />
                </Box>
            </>
        )
    }

export default DThreeComp;