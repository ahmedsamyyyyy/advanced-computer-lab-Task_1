// #Task route solution
const userModel = require('../Models/User.js');
const { default: mongoose } = require('mongoose');

const createUser = async(req, res) => {
    //add a new user to the database with 
    //Name, Email and Age

    const { Name, Email, Age } = req.body;

    const newUser = new userModel({ Name, Email, Age });
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const getUsers = async(req, res) => {
    //retrieve all users from the database
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message  });   
    }
}
const updateUser = async(req, res) => {
    try {
        // Extract the Name, Email, and Age from the request body
        const { Name, Email, Age } = req.body;

        // Update the user by searching with email and returning the updated user
        const updatedUser = await userModel.findOneAndUpdate({ Email: Email }, // Find user by email
            { Name: Name, Age: Age }, // Update name and age
            { new: true } // Return the updated document
        );

        // If no user is found, return a 404 error
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return the updated user data
        res.status(200).json(updatedUser);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: error.message });
    }
};

module.exports = updateUser;


const deleteUser = async(req, res) => {
    // Delete a user from the database by email
    try {
        const { Email } = req.body; // Assuming the email is passed in the request body

        // Find the user by email and delete them
        const deletedUser = await userModel.findOneAndDelete({ Email });

        // If the user is not found, return a 404 error
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return a success message if the user was deleted
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: error.message });
    }
};

module.exports = deleteUser;

module.exports = { createUser, getUsers, updateUser,  deleteUser  };
