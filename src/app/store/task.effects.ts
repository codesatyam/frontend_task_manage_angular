import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TaskService } from '../task.service';
import * as TaskActions from './task.actions';

@Injectable()
export class TaskEffects {
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      switchMap(() =>
        this.taskService.getTasks().pipe(
          map((tasks) => TaskActions.loadTasksSuccess({ tasks })),
          catchError((error) =>
            of(TaskActions.loadTasksFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Define other effects for adding, updating, and deleting tasks

  constructor(private actions$: Actions, private taskService: TaskService) {}
}
