const express = require("express");
const jwt = require("jsonwebtoken");
const { Todo } = require("../db/index");
const { authenticateJwt, SECRET } = require("../middleware/index");

const router = express.Router();

router.post('/todos', authenticateJwt, (req, res) => {
    const { title, description } = req.body;
    const done = false;
    const userId = req.userId;
  
    const newTodo = new Todo({ title, description, done, userId });
  
    newTodo.save()
      .then((savedTodo) => {
        res.status(201).json(savedTodo);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Failed to create a new todo' });
      });
  });
  
  
  router.get('/todos', authenticateJwt, (req, res) => {
    const userId = req.userId;
  
    Todo.find({ userId })
      .then((todos) => {
        res.json(todos);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Failed to retrieve todos' });
      });
  });
  
  router.patch('/todos/:todoId/done', authenticateJwt, (req, res) => {
    const { todoId } = req.params;
    const userId = req.userId;
  
    Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
      .then((updatedTodo) => {
        if (!updatedTodo) {
          return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(updatedTodo);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Failed to update todo' });
      });
  });

  router.put('/todos/:todoId', authenticateJwt, (req, res) => {
    const { todoId } = req.params;
    const userId = req.userId;
    const updatedData = req.body;
  
    Todo.findOneAndUpdate({ _id: todoId, userId }, updatedData)
      .then((updatedTodo) => {
        if (!updatedTodo) {
          return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(updatedTodo);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Failed to update todo' });
      });
  });

  router.delete("/todos/:todoId", authenticateJwt, (req, res) => {
    const todoId = req.params.todoId;
    const userId = req.userId;
    Todo.deleteOne({ _id: todoId })
      .then(() => {
        res.json({ message: "Data deleted"});
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to delete the data" });
      });
  })
  
  module.exports = router;
