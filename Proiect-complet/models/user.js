const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = Schema ({

    email: {
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String,
        require: true
    }

})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema)