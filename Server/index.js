const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");

const app = express();
const port = 3000;

app.use(cors({origin: "*"}));
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);


mongoose.connect('mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.6fe6e9q.mongodb.net/<DBNAME>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(res => {
  app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
  });
})
