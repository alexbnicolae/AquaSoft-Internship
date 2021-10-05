const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Project = require('../models/project')


const employerSchema = Schema({
    Name: {
        type: String,
        require: true,
    },
    Adress: {
        type: String,
        require: true,
    },
    Email: {
        type: String,
        require: true,
    },
    Hire_date: {
        type: Date,
        require: true,
    },
    Salary:{
        type: Number,
        require: true,
    },
    Job_title:{
        type: String,
        require: true,
    },

    project_id: {
        type: Schema.Types.ObjectId,
        ref: "Project",
    }
})

module.exports = mongoose.model('Employer', employerSchema)
