const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('../models/Task');
const auth = require('../middleware/auth'); // Middleware to authenticate requests


//User Registration Route
router.post('/register', async(req, res)=>{
    console.log("Currently in user api route, trying to create the user! ")
    const{username, email, password}=req.body;
    try{
        const passHash=await bcrypt.hash(password, 10);
        const newUser=new User({username, email, password:passHash});
        await newUser.save();
        console.log("User saved succesfully")
        res.status(201).send('User registered succesfully');
    } catch(err){
        console.error("User not saved, Error:",err.message)
        res.status(500).send('Server Error!');
    }
});

//User Login Route
router.post('/login', async(req,res)=>{
    console.log("Currently in Users api route, trying to login the user! ")
    const{email, password}=req.body;
    try{
        console.log("Trying to find the user! ")
        const user = await User.findOne({email});
        if (!user){
            console.log("Unable to authorize the user! ")
            return res.status(400).send("Invalid Credentials");
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            console.log("Invalid credentials trying to login! ")
            return res.status(400).send('Invalid Credentials');
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET, {expiresIn:'1h'});
        res.json({token});
    }catch(err){
        console.error("Login has failed, Error:",err.message)
        res.status(500).send("Server Error");
    }
});

//Task creation Route
router.post('/tasks', auth, async (req, res) => {
    console.log("Currently in Tasks api route, trying to create the task! ")
    const { title, description } = req.body;
    try {
      const newTask = new Task({ title, description, userId: req.user.id });
      await newTask.save();
      console.log("Task created succesfully")
      res.status(201).send('Task created successfully');
    } catch (err) {
      console.error("Some error in creating task, Error:",err.message)
      res.status(500).send('Server error');
    }
  });
  
  // Get Tasks Route
  router.get('/tasks', auth, async (req, res) => {
    console.log("Currently in Tasks api route, trying to get all the tasks! ")
    try {
      const tasks = await Task.find({ userId: req.user.id });
      console.log("Able to get all the tasks! ")
      res.json(tasks);
    } catch (err) {
      console.error("Some error in getting the tasks, Error:",err.message)
      res.status(500).send('Server error');
    }
  });
  
  // Update Task Route
  router.put('/tasks/:id', auth, async (req, res) => {
    console.log("Currently in Tasks api route, trying to udpate the task! ")
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
      const task = await Task.findById(id);
      if (!task) {
        console.log("Unable to find the task")
        return res.status(404).send('Task not found');
      }
      if (task.userId.toString() !== req.user.id) {
        console.log("Unable to authorize the task")
        return res.status(403).send('Unauthorized');
      }
      task.title = title || task.title;
      task.description = description || task.description;
      task.completed = completed !== undefined ? completed : task.completed;
      await task.save();
      console.log("Task updated succesfully")
      res.send('Task updated successfully');
    } catch (err) {
      console.error("Some error while updating the task, Error:",err.message)
      res.status(500).send('Server error');
    }
  });
  
  // Delete Task Route
  router.delete('/tasks/:id', auth, async (req, res) => {
    console.log("Currently in Tasks api route, trying to delete the task! ")
    const { id } = req.params;
    try {
      console.log("Trying to delete the task! ")
      const task = await Task.findById(id);
      if (!task) {
        console.log("Unable to find the task to be deleted")
        return res.status(404).send('Task not found');
      }
      if (task.userId.toString() !== req.user.id) {
        console.log("Unable to authorize the task to be deleted")
        return res.status(403).send('Unauthorized');
      }
      await task.deleteOne({ _id: id });
      console.log("Task deleted succesfully")
      res.send('Task deleted successfully');
    } catch (err) {
      console.error("Some error while deleting the task, Error:",err.message)
      res.status(500).send('Server error');
    }
  });

module.exports = router;