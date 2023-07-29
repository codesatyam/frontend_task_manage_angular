import { createAction, props } from '@ngrx/store';
import { Task } from '../task.model';

export const loadTasks = createAction(
  '[Task List] Load Tasks',
  props<{ tasks: Task[] }>()
);
export const loadTasksFailure = createAction(
  '[Task List] Load Tasks Failure',
  props<{ error: any }>()
);
export const addTask = createAction(
  '[Add Task] Add Task',
  props<{ task: Task }>()
);
export const addTaskFailure = createAction(
  '[Add Task] Add Task Failure',
  props<{ error: any }>()
);
export const updateTask = createAction(
  '[Update Task] Update Task',
  props<{ task: Task }>()
);
export const updateTaskFailure = createAction(
  '[Update Task] Update Task Failure',
  props<{ error: any }>()
);
export const deleteTask = createAction(
  '[Delete Task] Delete Task',
  props<{ taskId: string }>()
);
export const deleteTaskFailure = createAction(
  '[Delete Task] Delete Task Failure',
  props<{ error: any }>()
);
export const loadTaskById = createAction(
  '[Task Details] Load Task by Id',
  props<{ taskId: string }>()
);
export const loadTaskByIdSuccess = createAction(
  '[Task Details] Load Task by Id Success',
  props<{ task: Task }>()
);
export const loadTasksByIdFailure = createAction(
  '[Task List] Load Task by Id Failure',
  props<{ error: any }>()
);
