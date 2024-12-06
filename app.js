const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
let tasks = [
  {
    id: 1,
    title: "Comprar comida",
    description: "Lista de compras",
    status: "pendiente",
  },
];
// Obtener todas las tareas
app.get("/tasks", (req, res) => {
  res.json(tasks);
});
// Crear una nueva tarea
app.post("/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    ...req.body,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});
// Obtener una tarea por ID
app.get("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send("Tarea no encontrada");
  res.json(task);
});
// Eliminar una tarea
app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter((t) => t.id !== parseInt(req.params.id));
  res.status(204).send();
});
// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en 
 http://localhost:${PORT}`);
});
