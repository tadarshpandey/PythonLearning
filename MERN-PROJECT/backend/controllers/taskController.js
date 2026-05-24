import Task from '../models/taskModel.js';
import { isDbActive } from '../config/db.js';

// Pre-seeded tasks for In-Memory Fallback Mode
let inMemoryTasks = [
  {
    _id: 'mem_task_1',
    title: '🎨 Design ZenTask UI/UX Design System',
    description: 'Establish curated dark-mode HSL colors, global CSS rules, typography, and glassmorphism parameters for premium look & feel.',
    status: 'done',
    priority: 'high',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'mem_task_2',
    title: '🚀 Build React Vite Dashboard & Kanban Board',
    description: 'Assemble modular React components. Create state handlers, styling animations, and interactive task status sliders.',
    status: 'in-progress',
    priority: 'high',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'mem_task_3',
    title: '⚙️ Configure MongoDB Connection Boilerplate',
    description: 'Ready backend mongoose connection logic in backend/config/db.js. Add MONGO_URI setup in backend/.env to connect to live DB.',
    status: 'todo',
    priority: 'medium',
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'mem_task_4',
    title: '✨ Add Fluid Micro-animations & Gestures',
    description: 'Inject CSS Keyframe animations for exit, entry, cards moving columns, and glassmorphic card glowing hovers.',
    status: 'review',
    priority: 'low',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

// Generate simple mock unique IDs
const generateMockId = () => `mem_task_${Math.random().toString(36).substr(2, 9)}`;

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
export const getTasks = async (req, res) => {
  try {
    if (isDbActive()) {
      const tasks = await Task.find().sort({ createdAt: -1 });
      return res.status(200).json(tasks);
    } else {
      // In-Memory Mode
      // Sort by createdAt desc equivalent (newer tasks first)
      const sortedTasks = [...inMemoryTasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return res.status(200).json(sortedTasks);
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving tasks', error: error.message });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Public
export const createTask = async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    if (isDbActive()) {
      const newTask = await Task.create({
        title,
        description,
        status: status || 'todo',
        priority: priority || 'medium',
        dueDate: dueDate || null,
      });
      return res.status(201).json(newTask);
    } else {
      // In-Memory Mode
      const newTask = {
        _id: generateMockId(),
        title,
        description: description || '',
        status: status || 'todo',
        priority: priority || 'medium',
        dueDate: dueDate || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      inMemoryTasks.push(newTask);
      return res.status(201).json(newTask);
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

// @desc    Update an existing task
// @route   PUT /api/tasks/:id
// @access  Public
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, priority, dueDate } = req.body;

  try {
    if (isDbActive()) {
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { title, description, status, priority, dueDate },
        { new: true, runValidators: true }
      );

      if (!updatedTask) {
        return res.status(404).json({ message: `Task not found with id ${id}` });
      }

      return res.status(200).json(updatedTask);
    } else {
      // In-Memory Mode
      const index = inMemoryTasks.findIndex((t) => t._id === id);
      if (index === -1) {
        return res.status(404).json({ message: `Task not found with id ${id}` });
      }

      const existing = inMemoryTasks[index];
      const updatedTask = {
        ...existing,
        title: title !== undefined ? title : existing.title,
        description: description !== undefined ? description : existing.description,
        status: status !== undefined ? status : existing.status,
        priority: priority !== undefined ? priority : existing.priority,
        dueDate: dueDate !== undefined ? dueDate : existing.dueDate,
        updatedAt: new Date().toISOString(),
      };

      inMemoryTasks[index] = updatedTask;
      return res.status(200).json(updatedTask);
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Public
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    if (isDbActive()) {
      const deletedTask = await Task.findByIdAndDelete(id);

      if (!deletedTask) {
        return res.status(404).json({ message: `Task not found with id ${id}` });
      }

      return res.status(200).json({ message: 'Task deleted successfully', id });
    } else {
      // In-Memory Mode
      const index = inMemoryTasks.findIndex((t) => t._id === id);
      if (index === -1) {
        return res.status(404).json({ message: `Task not found with id ${id}` });
      }

      inMemoryTasks.splice(index, 1);
      return res.status(200).json({ message: 'Task deleted successfully from memory', id });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};
