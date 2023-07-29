import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Task } from '../task.model';
import * as TaskActions from './task.actions';

export interface TaskState {
  tasks: Task[];
  selectedTaskId: string | null;
}

export const initialState: TaskState = {
  tasks: [],
  selectedTaskId: null,
};

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasks, (state, { tasks }) => {
    return { ...state, tasks: tasks };
  }),
  on(TaskActions.loadTaskByIdSuccess, (state, { task }) => {
    return { ...state, selectedTaskId: task._id };
  }),
  on(TaskActions.addTask, (state, { task }) => {
    return { ...state, tasks: [...state.tasks, task] };
  }),
  on(TaskActions.updateTask, (state, { task }) => {
    const updatedTasks = state.tasks.map((t) => (t._id === task._id ? task : t));
    return { ...state, tasks: updatedTasks };
  }),
  on(TaskActions.deleteTask, (state, { taskId }) => {
    const updatedTasks = state.tasks.filter((t) => t._id !== taskId);
    return { ...state, tasks: updatedTasks };
  })
);

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectAllTasks = createSelector(
  selectTaskState,
  (state: TaskState) => state.tasks
);

export const selectSelectedTask = createSelector(
  selectTaskState,
  (state: TaskState) => {
    const selectedId = state.selectedTaskId;
    return selectedId ? state.tasks.find((task) => task._id === selectedId) : null;
  }
);

 





