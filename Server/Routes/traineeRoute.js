const router = require("express").Router();
const { response } = require("express");
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:"Shsid107001!",
    database: 'GxNexus'
});



router.get('/:tableName/all', (req, res) => {
    console.log(`hit the route`, req.params)
    const dbQuery = `SELECT DISTINCT(EmpNumber), FirstName, LastName, City, TrainingPath FROM ${req.params.tableName}`;
    db.query(dbQuery, (error, response) => {
        if(error){
            console.log(`error`, error)
        } else {
            res.send(response)
        }
    })
})
router.get('/:tableName/:id', (req, res) => {
    console.log(`hit the route for id`, req.params)
    const dbQuery = `SELECT * FROM ${req.params.tableName} WHERE EmpNumber=${req.params.id}`
    db.query(dbQuery, (error, response) => {
        if(error){
            console.log(`error`, error)
        } else {
            res.send(response)
        }
    })

})
router.get('/:tableName/cohort/all', (req, res) => {
    console.log(`hit the route for cohort total`, req.params);
    // const dbQuery = `SELECT * FROM ${req.params.tableName} WHERE TrainingPath='${req.params.cohort}'`;
    const dbQuery = `SELECT DISTINCT TrainingPath, COUNT(EmpNumber) AS TotalStudents FROM ${req.params.tableName} GROUP BY TrainingPath`;
    db.query(dbQuery, (error, response) => {
        if(error){
            console.log(`error`, error)
        } else {
            // console.log(response)
            res.send(response)
        }
    })
})
router.get('/:tableName/cohort/:cohort', (req, res) => {
    console.log(`hit the route for cohort`, req.params);
    const dbQuery = `SELECT * FROM ${req.params.tableName} WHERE TrainingPath='${req.params.cohort}'`;
    db.query(dbQuery, (error, response) => {
        if(error){
            console.log(`error`, error)
        } else {
            res.send(response)
        }
    })
})


module.exports = router;
