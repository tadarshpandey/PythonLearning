import React from 'react';
import TaskCard from './TaskCard';

const COLUMNS = [
  { id: 'todo', label: 'Todo', colorClass: 'todo' },
  { id: 'in-progress', label: 'In Progress', colorClass: 'in-progress' },
  { id: 'review', label: 'Review', colorClass: 'review' },
  { id: 'done', label: 'Done', colorClass: 'done' },
];

export default function TaskBoard({ tasks, onDeleteTask, onUpdateTaskStatus }) {
  return (
    <div className="kanban-grid">
      {COLUMNS.map((column) => {
        const columnTasks = tasks.filter((task) => task.status === column.id);

        return (
          <div key={column.id} className="kanban-column">
            <div className="column-header">
              <div className="column-title-group">
                <span className={`column-bullet ${column.colorClass}`}></span>
                <h2>{column.label}</h2>
              </div>
              <span className="column-count">{columnTasks.length}</span>
            </div>

            <div className="task-cards-list">
              {columnTasks.length > 0 ? (
                columnTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onDelete={onDeleteTask}
                    onUpdateStatus={onUpdateTaskStatus}
                  />
                ))
              ) : (
                <div className="empty-col-message">
                  No tasks here
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
