import express from 'express';
import { Todo } from "../db/index";
import { authenticateJwt, SECRET } from "../middleware/index";

const router = express.Router();

interface todoDetails {
  title: string;
  description: string;
}

router.post('/todos', authenticateJwt, (req, res) => {
    const input: todoDetails = req.body;
    const done: boolean = false;
    const userId = req.headers.userId;
  
    const newTodo = new Todo({ title: input.title, description: input.description, done, userId });
  
    newTodo.save()
      .then((savedTodo) => {
        res.status(201).json(savedTodo);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Failed to create a new todo' });
      });
  });
  
  
  router.get('/todos', authenticateJwt, (req, res) => {
    const userId = req.headers.userId;
  
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
    const userId = req.headers.userId;
  
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
    const userId = req.headers.userId;
    const updatedData: todoDetails = req.body;
  
    Todo.findOneAndUpdate({ _id: todoId, userId }, updatedData, { new: true })
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
    const userId = req.headers.userId;
    Todo.deleteOne({ _id: todoId, userId })
      .then(() => {
        res.json({ message: "Data deleted"});
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to delete the data" });
      });
  })
  
export default router;
