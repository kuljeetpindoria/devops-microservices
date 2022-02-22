const express = require('express');
const router = express.Router();
const Student = require('../model/studentModel')
const mongoose = require('mongoose');
const { json, text } = require('body-parser');


// get request 
router.get('/', (req, res, next) => {
    Student.find()
        .then(result => {
            res.status(200).json({
                studentData: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

//get request using ID
router.get('/:id', (req, res, text) => {
    console.log(req.params.id);
    Student.findById(req.params.id)
        .then(result => {
            res.status(200).json({
                student: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

// post request
router.post('/', (req, res, next) => {
    const student = new Student({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender
    })
    student.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                newStudent: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({

            })
        })
})

// delete request
router.delete('/:id', (req, res, next) => {
    Student.remove({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                message: 'Student data deleted',
                list: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})


// put request
router.put('/:id', (req, res, next) => {
    Student.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender
        }
    })
        .then(result => {
            res.status(200).json({
                updatedStudent: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router;