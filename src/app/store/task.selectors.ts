import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectAllTasks = createSelector(
  selectTaskState,
  (state: TaskState) => state.tasks
);

export const selectSelectedTaskId = createSelector(
  selectTaskState,
  (state: TaskState) => state.selectedTaskId
);

export const selectSelectedTask = createSelector(
  selectAllTasks,
  selectSelectedTaskId,
  (tasks, selectedTaskId) =>
    selectedTaskId ? tasks.find((task) => task._id === selectedTaskId) : null
);
