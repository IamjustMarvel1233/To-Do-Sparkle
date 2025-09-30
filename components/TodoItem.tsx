
import React from 'react';
import { Todo } from '../types';
import { CheckIcon, TrashIcon, ClockIcon } from './icons';

interface TodoItemProps {
  todo: Todo;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onComplete, onDelete }) => {
  const dueStateClasses = todo.isDue && !todo.isCompleted
    ? 'border-yellow-400 dark:border-yellow-500 ring-4 ring-yellow-400/20 dark:ring-yellow-500/20 animate-pulse'
    : 'border-slate-200 dark:border-slate-700';

  const completedStateClasses = todo.isCompleted
    ? 'bg-slate-100 dark:bg-slate-800/50 opacity-60'
    : 'bg-white dark:bg-slate-800';
    
  // Format time for display (e.g., 5:30 PM)
  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <li
      className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 shadow-sm ${completedStateClasses} ${dueStateClasses}`}
    >
      <div className="flex flex-col">
        <span className={`text-lg ${todo.isCompleted ? 'line-through text-slate-500' : 'text-slate-800 dark:text-slate-100'}`}>
          {todo.text}
        </span>
        <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mt-1">
          <ClockIcon className="w-4 h-4" />
          <span>{formatTime(todo.dueTime)}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {todo.isCompleted ? (
          <button
            onClick={() => onDelete(todo.id)}
            aria-label="Delete task"
            className="p-2 rounded-full text-slate-400 hover:bg-red-100 dark:hover:bg-red-900/50 hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => onComplete(todo.id)}
            aria-label="Complete task"
            className="p-2 rounded-full text-slate-400 hover:bg-green-100 dark:hover:bg-green-900/50 hover:text-green-600 dark:hover:text-green-500 transition-colors duration-200"
          >
            <CheckIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
