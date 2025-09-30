
export interface Todo {
  id: string;
  text: string;
  dueTime: string; // Stored as "HH:mm"
  isCompleted: boolean;
  isDue: boolean;
}
