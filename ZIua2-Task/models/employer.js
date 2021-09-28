const mongoose = require('mongoose')

const employerSchema = new mongoose.Schema({
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
})

module.exports = mongoose.model('Employer', employerSchema)