
import React, { useEffect } from 'react';
import { Todo } from '../types';

interface CelebrationModalProps {
  task: Todo | null;
  message: string;
  onClose: () => void;
}

const CelebrationModal: React.FC<CelebrationModalProps> = ({ task, message, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!task) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform transition-all duration-300 scale-95 animate-in fade-in-0 zoom-in-95"
        onClick={e => e.stopPropagation()}
      >
        <img 
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExejE2dHZjc2ZjcXVnczFicml1eDRiY3ZocDhva3l0dmR0ZmdnMHhjeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oz8xAFtqoGUE6vYVW/giphy.gif"
          alt="Celebration" 
          className="w-48 h-48 mx-auto rounded-lg mb-6"
        />
        <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">{message}</p>
        <p className="text-slate-600 dark:text-slate-300">You completed:</p>
        <p className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-6 break-words">"{task.text}"</p>
        <button
          onClick={onClose}
          className="bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 focus:ring-indigo-500 transition-all duration-200"
        >
          Awesome!
        </button>
      </div>
    </div>
  );
};

export default CelebrationModal;
