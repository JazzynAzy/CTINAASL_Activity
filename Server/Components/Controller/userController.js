const User = require("../models/userModel");

const userController = {
  //get all users
  getAllUsers: async (request, response) => {
    try {
      const users = await User.find();
      response.status(200).json(users);
    } catch (error) {
      console.log("Error retrieving users:", error); //server-side log
      response.status(500).json({
        message: "Error retrieving users",
        error: error.message,
      });
    }
  },

  //create a new user
  createUser: async (request, response) => {
    const { name, email, password } = request.body;

    try {
      //check is a user already exists with the same email
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return response.status(409).json({
          message: "User with this email already exists.",
          success: false,
        });
      }

      const user = new User({
        name: name,
        email: email,
        password: password,
      });

      await user.save();
      console.log(`[USER-CREATION] New user created: ${email}`); //server-side log
      response.status(201).json({
        message: "User created successfully",
        success: true,
        user,
      });
    } catch (error) {
      console.log("Error creating user:", error); //server-side log
      response.status(500).json({
        message: "Error creating user",
        error: error.message,
      });
    }
  },

  //update a user
  updateUser: async (request, response) => {
    try {
      const user = await User.findById(request.params.id);

      if (!user) {
        return response.status(404).json({
          message: "User not found",
          success: false,
        });
      }

      const { name, email, password } = request.body;

      user.name = name;
      user.email = email;
      user.password = password;

      await user.save();
      console.log(`[USER-UPDATE] User updated: ${email}`); //server-side log
      response.status(200).json({
        message: "User updated successfully",
        success: true,
        user,
      });
    } catch (error) {
      console.log("Error updating user:", error); //server-side log
      response.status(500).json({
        message: "Error updating user",
        error: error.message,
      });
    }
  },

  //delete a user
  deleteUser: async (request, response) => {
    try {
      const deletedUser = await User.findByIdAndDelete(request.params.id);
      if (!deletedUser) {
        return response.status(404).json({
          message: "User not found",
          success: false,
        });
      }

      console.log(`[USER-DELETION] User deleted with ID: ${request.params.id}`); //server-side log
      response.status(200).json({
        message: "User deleted successfully",
        success: true,
      });
    } catch (error) {
      console.log("Error deleting user:", error); //server-side log
      response.status(500).json({
        message: "Error deleting user",
        error: error.message,
      });
    }
  },
};

module.exports = userController;
