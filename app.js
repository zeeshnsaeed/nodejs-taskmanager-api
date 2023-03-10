const express = require("express");
const app = express();

const tasks = require("./routes/tasks");

const port = 8000;

// Middleware
app.use(express.json());

// Routes
app.get("/hello", (req, res) => {
  res.send("Task manager application");
});

app.use("/api/v1/tasks", tasks);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
