const express = require('express')
const { rawListeners } = require('../models/employer')
const employer = require('../models/employer')
const router = express.Router()
const Employer = require('../models/employer')

// Getting all employees - GET
router.get('/', async(req, res) => {
    try {
        const employees = await Employer.find()
        res.json(employees)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})
// Get an employer by name - GET
router.get('/:Name', getEmployerByName, async(req, res) => {
    res.json(res.employer)
})
// Insert a new employer - POST
router.post('/', async(req, res) => {
    const employer = new Employer({
        Name: req.body.Name,
        Address: req.body.Address,
        Email: req.body.Email,
        Hire_date: req.body.Hire_date,
        Salary: req.body.Salary,
        Job_title: req.body.Job_title,
    })
    
    try {
        const newEmployer = await employer.save()
        res.status(201).json(newEmployer)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})
// Update an employer by PK - PUT
router.patch('/:id', getEmployer, async (req, res) => {
    if (req.body.Name != null){
        res.employer.Name = req.body.Name
    }
    if (req.body.Adress != null){
        res.employer.Adress = req.body.Adress
    }
    if (req.body.Email != null){
        res.employer.Email = req.body.Email
    }
    if (req.body.Salary != null){
        res.employer.Salary = req.body.Salary
    }
    if (req.body.Job_title != null){
        res.employer.Job_title = req.body.Job_title
    }

    try {
        const updateEmployer = await res.employer.save()
        res.json(updateEmployer)
    } catch (error) {
        res.status(400).json({message: err.message})
    }
})
// Delete an employer by PK - DELETE
router.delete('/:id', getEmployer,  async(req, res) => {
    try {
        await res.employer.remove()
        res.json({ message: 'Deleted employer' })
    } catch (err) {
        return res.status(500).json({ message: 'Cannot find employer' })
    }
})

async function getEmployer(req, res, next){
    let employer
    try {
        employer = await Employer.findById(req.params.id)
        if (employer == null){
            return res.status(404).json({ message: 'Cannot find employer'})
        }
    } catch (err) {
        return res.status(500).json({ message: 'Cannot find employer' })
    }

    res.employer = employer
    next()
}

async function getEmployerByName (req, res, next){
    let employer
    try {
        employer = await Employer.find({Name: {$gte: req.params.Name}})
        if (employer == null){
            return res.status(404).json({ message: 'Cannot find employer'})
        }
    } catch (err) {
        return res.status(500).json({ message: 'Cannot find employer' })
    }

    res.employer = employer
    next()
}
module.exports = router