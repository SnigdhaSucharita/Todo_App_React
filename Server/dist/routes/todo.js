"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../db/index");
const index_2 = require("../middleware/index");
const router = express_1.default.Router();
router.post('/todos', index_2.authenticateJwt, (req, res) => {
    const input = req.body;
    const done = false;
    const userId = req.headers.userId;
    const newTodo = new index_1.Todo({ title: input.title, description: input.description, done, userId });
    newTodo.save()
        .then((savedTodo) => {
        res.status(201).json(savedTodo);
    })
        .catch((err) => {
        res.status(500).json({ error: 'Failed to create a new todo' });
    });
});
router.get('/todos', index_2.authenticateJwt, (req, res) => {
    const userId = req.headers.userId;
    index_1.Todo.find({ userId })
        .then((todos) => {
        res.json(todos);
    })
        .catch((err) => {
        res.status(500).json({ error: 'Failed to retrieve todos' });
    });
});
router.patch('/todos/:todoId/done', index_2.authenticateJwt, (req, res) => {
    const { todoId } = req.params;
    const userId = req.headers.userId;
    index_1.Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
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
router.put('/todos/:todoId', index_2.authenticateJwt, (req, res) => {
    const { todoId } = req.params;
    const userId = req.headers.userId;
    const updatedData = req.body;
    index_1.Todo.findOneAndUpdate({ _id: todoId, userId }, updatedData, { new: true })
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
router.delete("/todos/:todoId", index_2.authenticateJwt, (req, res) => {
    const todoId = req.params.todoId;
    const userId = req.headers.userId;
    index_1.Todo.deleteOne({ _id: todoId, userId })
        .then(() => {
        res.json({ message: "Data deleted" });
    })
        .catch((err) => {
        res.status(500).json({ error: "Failed to delete the data" });
    });
});
exports.default = router;
