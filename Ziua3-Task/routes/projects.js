const express = require('express')
const router = express.Router()
const Project = require('../models/project')

// Getting all projects - GET
router.get('/', async(req, res) => {
    try {
        const projects = await Project.find()
        res.json(projects)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})
// Insert a new project - POST
router.post('/', async(req, res) => {
    const project = new Project({
        project_name: req.body.project_name,
        start_date: req.body.start_date,
        planned_end_datetime: req.body.planned_end_datetime,
        description: req.body.description,
        project_code: req.body.project_code,
    })
    
    try {
        const newProject = await project.save()
        res.status(201).json(newProject)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// Update an employer by PK - PUT
router.patch('/:id', getProject, async (req, res) => {
    if (req.body.project_name != null){
        res.project.project_name = req.body.project_name
    }
    if (req.body.start_date != null){
        res.project.start_date = req.body.start_date
    }
    if (req.body.planned_end_datetime != null){
        res.project.planned_end_datetime = req.body.planned_end_datetime
    }
    if (req.body.description != null){
        res.project.description = req.body.description
    }
    if (req.body.project_code != null){
        res.project.project_code = req.body.project_code
    }

    try {
        const updateProject = await res.project.save()
        res.json(updateProject)
    } catch (error) {
        res.status(400).json({message: err.message})
    }
})
// Delete an employer by PK - DELETE
router.delete('/:id', getProject,  async(req, res) => {
    try {
        await res.project.remove()
        res.json({ message: 'Deleted employer' })
    } catch (err) {
        return res.status(500).json({ message: 'Cannot find employer' })
    }
})

async function getProject(req, res, next){
    let project
    try {
        project = await Project.findById(req.params.id)
        if (project == null){
            return res.status(404).json({ message: 'Cannot find project'})
        }
    } catch (err) {
        return res.status(500).json({ message: 'Cannot find project' })
    }

    res.project = project
    next()
}

module.exports = router ;
