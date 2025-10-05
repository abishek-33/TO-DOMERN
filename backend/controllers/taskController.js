// backend/controllers/taskController.js
export const getTasks = (req, res) => {
  res.json([
    { id: 1, title: "Buy groceries", status: "Pending" },
    { id: 2, title: "Finish project", status: "Completed" }
  ]);
};

export const createTask = (req, res) => {
  const task = req.body;
  res.status(201).json({ message: "Task created", task });
};
