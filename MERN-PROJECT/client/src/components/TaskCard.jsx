import React from 'react';

const COLUMNS = ['todo', 'in-progress', 'review', 'done'];

export default function TaskCard({ task, onDelete, onUpdateStatus }) {
  const { _id, title, description, status, priority, dueDate } = task;

  const currentIdx = COLUMNS.indexOf(status);

  const moveLeft = () => {
    if (currentIdx > 0) {
      onUpdateStatus(_id, COLUMNS[currentIdx - 1]);
    }
  };

  const moveRight = () => {
    if (currentIdx < COLUMNS.length - 1) {
      onUpdateStatus(_id, COLUMNS[currentIdx + 1]);
    }
  };

  const formatDueDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: '2-digit',
    }).format(date);
  };

  return (
    <div className="task-card">
      <div className="task-card-header">
        <span className={`task-priority-badge ${priority}`}>{priority}</span>
        <button
          className="icon-btn delete"
          onClick={() => onDelete(_id)}
          title="Delete Task"
          aria-label="Delete Task"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>

      <h4 className="task-card-title">{title}</h4>
      
      {description && <p className="task-card-desc">{description}</p>}

      <div className="task-card-footer">
        <div className="due-date-display">
          {dueDate ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>{formatDueDate(dueDate)}</span>
            </>
          ) : (
            <span>No due date</span>
          )}
        </div>

        <div className="status-changer">
          <button
            className="status-arrow-btn"
            onClick={moveLeft}
            disabled={currentIdx === 0}
            title="Move back"
            aria-label="Move back status"
          >
            ←
          </button>
          <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', userSelect: 'none' }}>
            Shift
          </span>
          <button
            className="status-arrow-btn"
            onClick={moveRight}
            disabled={currentIdx === COLUMNS.length - 1}
            title="Move forward"
            aria-label="Move forward status"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
