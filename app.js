
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/student_tasks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Task Schema
const taskSchema = new mongoose.Schema({
  courseId: String,
  taskName: String,
  dueDate: Date,
  additionalDetails: String
});

const Task = mongoose.model('Task', taskSchema);

// Route to retrieve tasks for a specific course
app.get('/courses/:courseId/tasks', async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const tasks = await Task.find({ courseId });
    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this course.' });
    }
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
