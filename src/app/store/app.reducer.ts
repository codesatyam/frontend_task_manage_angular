import { ActionReducerMap } from '@ngrx/store';
import { taskReducer, TaskState } from './task.reducer';
import { AppState } from './app.state';

export const reducers: ActionReducerMap<AppState> = {
  tasks: taskReducer,
};
