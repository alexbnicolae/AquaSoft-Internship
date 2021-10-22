const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Employer = require("../models/employer")

const projectSchema = Schema ({

    project_name: {
        type: String,
        require: true
    },

    start_date: {
        type: Date,
        require: true
    },

    planned_end_datetime: {
        type: Date,
        require: true
    },

    description: {
        type: String,
        require: true
    },

    project_code: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Project', projectSchema)