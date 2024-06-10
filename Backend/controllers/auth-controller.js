const User = require("../models/user-models");
const bcrypt = require("bcrypt"); //for password hashing

//Home page
const home = async (req, res) => {
    try {
        res.status(200).end("This is Auth Login Page");
    }
    catch (error) {
        console.log(error);
    }
};

//Registration Page
const register = async (req, res, next) => {
    try {
        const { username, email, phone, password } = req.body;

        const userNameExist = await User.findOne({ username });
        if (userNameExist) {
            res.status(400).json({ msg: "Name already registered" });
        }

        const userEmailExist = await User.findOne({ email });
        if (userEmailExist) {
            res.status(400).json({ msg: "Email already registered" });
        }
        
        // hashing the pwd
        const saltRound = 10;
        const hash_password = await bcrypt.hash(password, saltRound);
        const userCreated = await User.create({ username, email, phone, password: hash_password });

        res.status(201).json({
            msg: "Registration Successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });
    }
    catch (error) {
        next(error)
    }
}

// Login Page
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (!userExist) {
            res.status(400).json({ msg: "Invalid Credentials!!" });
            next();
        }

        const user = await userExist.comparePassword(password);
        if (user) {
            res.status(200).json({
                msg: "Login successful :)",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        }
        else {
            res.status(401).json({ msg: "Invalid Credentials" })
        }


    } catch (error) {
        next(error);
    }
};

// user info
const user = async (req, res) => {
    try {
        const userData = req.user;
        // console.log(userData);
        res.status(200).json(userData)

    } catch (error) {
        console.log("Error from the route user", error)
    }
}

const allUser = async (req, res) => {
    try {
        User.find({}).select({ _id: 1, username: 1 })
            .then(users => res.json(users))
            .catch(err => res.status(500).json({ message: err.message }));
    } catch (error) {
        console.log("Error in fetching user", error);
    }
}

const updateFollowing = async (req, res) => {
    try {
        const userid = req.params.id;
        const updateData = {
            following: req.body.following
        }

        User.findByIdAndUpdate(userid, updateData, { new: true })
            .then(updatedFollowing => {
                if (!updatedFollowing) {
                    return res.status(404).json({ message: 'Error while updating following not found' });
                }
                res.json(updatedFollowing);
            })
            .catch(err => res.status(400).json({ message: err.message }));


    } catch (error) {
        console.log("Error while Updating the follwing", error)
    }
}

module.exports = { home, register, login, user, allUser, updateFollowing };

