import { createReducer, on } from '@ngrx/store';
// import { Task } from '../task.model';
import * as TaskActions from './task.actions';
import { TaskState } from './task.store';

export const initialState: TaskState = {
  tasks: [],
  selectedTask: null,
  loading: false,
  error: null,
};

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasks, (state) => ({ ...state, loading: true })),
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    loading: false,
  })),
  on(TaskActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  // Define other reducer cases for adding, updating, and deleting tasks
);
