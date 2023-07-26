export interface Task {
  _id: string;
    title: string;
    description: string;
    dueDate: Date;
    priority: 'low' | 'medium' | 'high';
    status: 'to-do' | 'in-progress' | 'completed';
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
    priority?: 'low' | 'medium' | 'high';
    status?: 'to-do' | 'in-progress' | 'completed';
  }
  