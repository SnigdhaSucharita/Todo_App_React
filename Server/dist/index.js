"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const todo_1 = __importDefault(require("./routes/todo"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
app.use("/auth", auth_1.default);
app.use("/todo", todo_1.default);
mongoose_1.default.connect('mongodb+srv://Sucharita7:UJtNT36T8nBmunJb@cluster0.6fe6e9q.mongodb.net/Todo_App?retryWrites=true&w=majority')
    .then(res => {
    app.listen(3000, () => {
        console.log(`Server is running on port 3000`);
    });
});
