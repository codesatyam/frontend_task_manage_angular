import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState, taskAdapter } from './task.reduces';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

const { selectAll } = taskAdapter.getSelectors();

export const selectAllTasks = createSelector(selectTaskState, selectAll);
