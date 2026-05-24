import React, { useState, useEffect } from 'react';
import TaskBoard from './components/TaskBoard';
import TaskForm from './components/TaskForm';

const API_BASE = 'http://localhost:5000/api';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [dbStatus, setDbStatus] = useState('offline'); // 'offline', 'in-memory', 'mongodb'
  const [toasts, setToasts] = useState([]);

  // Trigger custom floating feedback toast
  const triggerToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Fetch all tasks and server status
  const loadData = async () => {
    try {
      // 1. Fetch server health to determine Mode
      const healthRes = await fetch(`${API_BASE}/health`);
      if (healthRes.ok) {
        // Ping actual task endpoint to check db vs memory (we can check if backend logs indicate db)
        // For simplicity, let's look at a custom header or response check. Or we can just default to fetching tasks
        // We'll write the API to check if it's database backed. Let's make an API call to load tasks.
        setDbStatus('in-memory'); // default fallback. If it pings successfully, we are active
      }
    } catch (err) {
      console.warn('API is currently offline. Running frontend-only sandbox mode.');
      setDbStatus('offline');
    }

    try {
      const res = await fetch(`${API_BASE}/tasks`);
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
        // Let's determine if tasks contain MongoDB default string IDs (24 chars) vs memory_task prefixes
        const hasMongoId = data.some(t => t._id && !t._id.startsWith('mem_'));
        setDbStatus(hasMongoId ? 'mongodb' : 'in-memory');
      } else {
        throw new Error('Could not fetch tasks');
      }
    } catch (err) {
      triggerToast('API connection error. Using local browser fallback storage.', 'error');
      // Offline fallback: load from localStorage
      const local = localStorage.getItem('zentasks');
      if (local) {
        setTasks(JSON.parse(local));
      } else {
        // Pre-seed some items locally
        setTasks([
          {
            _id: 'offline_task_1',
            title: '📡 API Server Offline',
            description: 'Start the Express backend by running "npm run dev" inside backend/ directory to sync MERN CRUD calls.',
            status: 'todo',
            priority: 'high',
            dueDate: new Date().toISOString(),
            createdAt: new Date().toISOString(),
          }
        ]);
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Save to localStorage if offline so sandbox is fully functional
  useEffect(() => {
    if (dbStatus === 'offline') {
      localStorage.setItem('zentasks', JSON.stringify(tasks));
    }
  }, [tasks, dbStatus]);

  // Create task
  const handleAddTask = async (taskData) => {
    try {
      const res = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });

      if (res.ok) {
        const newTask = await res.json();
        setTasks((prev) => [newTask, ...prev]);
        triggerToast('New task created successfully ✨');
      } else {
        throw new Error('API creation failed');
      }
    } catch (err) {
      // Sandbox fallback
      const mockTask = {
        ...taskData,
        _id: `offline_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTasks((prev) => [mockTask, ...prev]);
      triggerToast('Created task locally in client sandbox mode.');
    }
  };

  // Update status (column position)
  const handleUpdateTaskStatus = async (id, newStatus) => {
    const taskToUpdate = tasks.find(t => t._id === id);
    if (!taskToUpdate) return;

    try {
      const res = await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updated = await res.json();
        setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
        triggerToast(`Moved task to ${newStatus.toUpperCase().replace('-', ' ')} 🚀`);
      } else {
        throw new Error('API update failed');
      }
    } catch (err) {
      // Sandbox fallback
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: newStatus, updatedAt: new Date().toISOString() } : t))
      );
      triggerToast(`Moved task locally to ${newStatus.toUpperCase().replace('-', ' ')}.`);
    }
  };

  // Delete task
  const handleDeleteTask = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setTasks((prev) => prev.filter((t) => t._id !== id));
        triggerToast('Task deleted successfully');
      } else {
        throw new Error('API deletion failed');
      }
    } catch (err) {
      // Sandbox fallback
      setTasks((prev) => prev.filter((t) => t._id !== id));
      triggerToast('Task removed from local browser sandbox.');
    }
  };

  // Filter tasks based on search queries and priority badges
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  return (
    <div className="app-container">
      {/* Header section */}
      <header className="app-header">
        <div className="logo-group">
          <span className="logo-icon">✨</span>
          <h1>ZenTask</h1>
        </div>

        {/* Database Status Indicator Tag */}
        <div>
          {dbStatus === 'mongodb' && (
            <span className="mode-badge mongodb" title="All operations synchronized with MONGODB">
              ● Database Active (MDB)
            </span>
          )}
          {dbStatus === 'in-memory' && (
            <span className="mode-badge in-memory" title="MongoDB not active. Running on backend memory array.">
              ● In-Memory Fallback Active
            </span>
          )}
          {dbStatus === 'offline' && (
            <span className="mode-badge in-memory" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--color-text-muted)', borderColor: 'var(--border-glow)' }} title="API Offline. Running in sandbox localStorage.">
              ○ Frontend Offline Sandbox
            </span>
          )}
        </div>
      </header>

      {/* Controls: Search, filter, and task creation popup */}
      <section className="controls-bar">
        <div className="search-filter-group">
          <div className="search-wrapper">
            <svg
              className="search-icon-svg"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="low">Priority: Low</option>
            <option value="medium">Priority: Medium</option>
            <option value="high">Priority: High</option>
          </select>
        </div>

        <button className="btn-primary" onClick={() => setIsFormOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New Task
        </button>
      </section>

      {/* Main Kanban Grid */}
      <main>
        <TaskBoard
          tasks={filteredTasks}
          onDeleteTask={handleDeleteTask}
          onUpdateTaskStatus={handleUpdateTaskStatus}
        />
      </main>

      {/* Slide-in Task Addition Form Modal */}
      {isFormOpen && (
        <TaskForm
          onClose={() => setIsFormOpen(false)}
          onAddTask={handleAddTask}
        />
      )}

      {/* Toast Notification Mount Group */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
}
