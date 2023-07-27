import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.store';

const getTaskFeatureState = createFeatureSelector<TaskState>('tasks');

export const getTasks = createSelector(
  getTaskFeatureState,
  (state) => state.tasks
);

export const getLoading = createSelector(
  getTaskFeatureState,
  (state) => state.loading
);

export const getError = createSelector(
  getTaskFeatureState,
  (state) => state.error
);

// Define other selectors for accessing specific task, selected task, etc.
