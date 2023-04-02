const Task = require("../models/Task");
const asyncHandler = require("../middleware/async");
const { createCustomError } = require("../errors/customError");

// Create a new Task   C => CRUD
const createTask = asyncHandler(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

// Get all Task     R => CRUD
const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({});
  res.status(201).json({ tasks });
});

//  Get a single Task
const getTask = asyncHandler(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });

  if (!task) {
    return next(
      createCustomError(`Task doesn't exist with id : ${taskID}`, 404)
    );
  }
  res.status(200).json({ task });
});

// Update Task Handler  U => CRUD
const updateTask = asyncHandler(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(
      createCustomError(`Task doesn't exist with id : ${taskID}`, 404)
    );
  }

  res.status(200).json({ task });
});

// Delete Task Handler  D => CRUD
const deleteTask = asyncHandler(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });

  if (!task) {
    return next(
      createCustomError(`Task doesn't exist with id : ${taskID}`, 404)
    );
  }

  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
