
import React, { useState, useEffect, useCallback } from 'react';
import { Todo } from './types';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import CelebrationModal from './components/CelebrationModal';
import { getCelebrationMessage } from './services/geminiService';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
  const [celebrationTask, setCelebrationTask] = useState<Todo | null>(null);
  const [celebrationMessage, setCelebrationMessage] = useState<string>('');
  const [isCelebrating, setIsCelebrating] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const checkDueTimes = useCallback(() => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    setTodos(prevTodos => 
      prevTodos.map(todo => {
        if (todo.isCompleted) return { ...todo, isDue: false };

        const [dueHours, dueMinutes] = todo.dueTime.split(':').map(Number);
        const dueTimeTotalMinutes = dueHours * 60 + dueMinutes;
        
        const isDue = currentTime >= dueTimeTotalMinutes;
        
        if (isDue !== todo.isDue) {
          return { ...todo, isDue };
        }
        return todo;
      })
    );
  }, []);

  useEffect(() => {
    checkDueTimes();
    const intervalId = setInterval(checkDueTimes, 1000 * 30); // Check every 30 seconds
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addTodo = (text: string, dueTime: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      dueTime,
      isCompleted: false,
      isDue: false,
    };
    setTodos(prevTodos => [...prevTodos, newTodo].sort((a, b) => a.dueTime.localeCompare(b.dueTime)));
    checkDueTimes(); // check immediately after adding
  };

  const completeTodo = async (id: string) => {
    const taskToComplete = todos.find(todo => todo.id === id);
    if (!taskToComplete || isCelebrating) return;

    setIsCelebrating(true);
    setCelebrationTask(taskToComplete);
    
    // Optimistically update UI
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, isCompleted: true, isDue: false } : todo
      )
    );

    const message = await getCelebrationMessage(taskToComplete.text);
    setCelebrationMessage(message);
  };

  const deleteTodo = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };
  
  const closeCelebration = () => {
    setCelebrationTask(null);
    setCelebrationMessage('');
    setIsCelebrating(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <main className="max-w-2xl mx-auto px-4 py-8 sm:py-16">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 dark:text-white">
            To-Do <span className="text-indigo-600 dark:text-indigo-400">Sparkle</span>
          </h1>
          <p className="mt-3 text-lg text-slate-500 dark:text-slate-400">
            Conquer your tasks and get celebrated by AI!
          </p>
        </header>

        <TodoForm onAddTodo={addTodo} />
        
        <TodoList todos={todos} onComplete={completeTodo} onDelete={deleteTodo} />
      </main>
      
      <CelebrationModal 
        task={celebrationTask}
        message={celebrationMessage}
        onClose={closeCelebration}
      />
    </div>
  );
};

export default App;
