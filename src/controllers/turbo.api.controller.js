import axios from "axios";
import * as YAML from 'yaml';
import { handleError } from '../exceptions/errorHandler.js';

let users = [
  { id: 0, name: "Mike", email:"amph@gmail.com" },
  { id: 1, name: "Miguel", email:"miguel@gmail.com" },
  { id: 2, name: "Yeison", email:"yeison@gmail.com" },
];

export const user = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (!user) {
      res.status(404).json({ message: `User with ID ${id} not found.` });
    } else {
      res.json(user);
    }
  } catch (error) {
    handleError(error, res);
  }
};



export const getAllUsers = async (req, res) => {
  try {
    res.json(users);
  } catch (error) {
    handleError(error, res);
  }
};

export const post = (req, res) => {
  // Extract the new user's attributes from the request body
  const { name, email } = req.body;

  // Create a new user object
  const newUser = {
    id: users.length + 1,  // Generate an ID
    name: name,
    email: email
  };

  // Add the new user to the users array
  users.push(newUser);

  // Send a success response
  res.status(201).json({
    message: 'User added successfully',
    user: newUser
  });
};

export const put = (req, res) => {
  // Extract the user's ID from the request parameters
  const { id } = req.params;

  // Extract the updated user attributes from the request body
  const { name, email } = req.body;

  // Find the index of the user with the given ID
  const index = users.findIndex(user => user.id === Number(id));

  // If no user with the given ID is found, return a 404 (Not Found) response
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Update the user's attributes
  users[index].name = name || users[index].name;
  users[index].email = email || users[index].email;

  // Send a success response
  res.json({
    message: 'User updated successfully',
    user: users[index]
  });
};

export const del = (req, res) => {
  // Extract the user's ID from the request parameters
  const { id } = req.params;

  // Find the index of the user with the given ID
  const index = users.findIndex(user => user.id === Number(id));

  // If no user with the given ID is found, return a 404 (Not Found) response
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Remove the user from the array
  users.splice(index, 1);

  // Send a success response
  res.json({ message: 'User deleted successfully' });
};