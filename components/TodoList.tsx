
import React from 'react';
import { Todo } from '../types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onComplete, onDelete }) => {
  const pendingTodos = todos.filter(todo => !todo.isCompleted);
  const completedTodos = todos.filter(todo => todo.isCompleted);

  if (todos.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
        <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300">No tasks yet!</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Add a new task above to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {pendingTodos.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 text-slate-700 dark:text-slate-300">To Do</h2>
          <ul className="space-y-3">
            {pendingTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} onComplete={onComplete} onDelete={onDelete} />
            ))}
          </ul>
        </div>
      )}

      {completedTodos.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 text-slate-700 dark:text-slate-300">Completed</h2>
          <ul className="space-y-3">
            {completedTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} onComplete={onComplete} onDelete={onDelete} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TodoList;
