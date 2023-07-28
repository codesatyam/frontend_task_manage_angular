import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Task } from '../task.model';
import * as TaskActions from './task.actions';

export interface TaskState extends EntityState<Task> {}

export const taskAdapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialState: TaskState = taskAdapter.getInitialState();

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => taskAdapter.setAll(tasks, state)),
  on(TaskActions.addTask, (state, { task }) => taskAdapter.addOne(task, state)),
  on(TaskActions.deleteTask, (state, { taskId }) => taskAdapter.removeOne(taskId, state)),
  on(TaskActions.updateTask, (state, { task }) => taskAdapter.updateOne({ id: task._id, changes: task }, state))
);
