const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//creatring schema for user registration
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        default: false,
    },
    following: {
        type: Array,
    }

});

//JWT token generation
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.admin
        },
        process.env.JWT_KEY,
        {
            expiresIn:"30d",
        }

    );
    } catch (error) {
        console.error(error);
    }
}

//pwd compare
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};


const User = new mongoose.model("User", userSchema);
module.exports = User;