export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'Low' | 'Medium' | 'High';
  status: 'To-do' | 'In-progress' | 'Completed';
  historyLog: TaskHistory[];
}

export interface TaskHistory {
  timestamp: Date;
  changes: TaskChanges;
}

export interface TaskChanges {
  title?: string;
  description?: string;
  dueDate?: Date;
  priority?: 'Low' | 'Medium' | 'High';
  status?: 'To-do' | 'In-progress' | 'Completed';
}
