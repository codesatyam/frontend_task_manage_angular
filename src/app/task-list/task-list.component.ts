import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { saveAs } from 'file-saver';
import * as Papa from 'papaparse';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { loadTasks, deleteTask } from '../store/task.actions';
import { selectAllTasks } from '../store/task.reducer';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  sortByDueDateAscending = true; // Flag for sorting due date in ascending order
  sortByPriorityAscending = true; // Flag for sorting priority in ascending order
  sortByStatusAscending = true; // Flag for sorting status in ascending order

  constructor(
    private router: Router,
    private taskService: TaskService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.getTasks();
    this.store.pipe(select(selectAllTasks)).subscribe((tasks) => {
      this.tasks = tasks;
      console.log(tasks);
    });
    
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.store.dispatch(loadTasks({ tasks }));
    });
  }

  sortByDueDate(): void {
    this.sortByDueDateAscending = !this.sortByDueDateAscending;
    const sortedTasks = [...this.tasks].sort((a, b) => {
      const order = this.sortByDueDateAscending ? 1 : -1;
      return (
        order *
        ((a.dueDate ? new Date(a.dueDate).getTime() : 0) -
          (b.dueDate ? new Date(b.dueDate).getTime() : 0))
      );
    });
    this.tasks = sortedTasks;
  }

  sortByPriority(): void {
    this.sortByPriorityAscending = !this.sortByPriorityAscending;
    const priorityOrder: { [key: string]: number } = { 'Low': 0, 'Medium': 1, 'High': 2 };
    const sortedTasks = [...this.tasks].sort((a, b) => {
      const order = this.sortByPriorityAscending ? 1 : -1;
      return order * (priorityOrder[a.priority] - priorityOrder[b.priority]);
    });
    this.tasks = sortedTasks;
  }

  sortByStatus(): void {
    this.sortByStatusAscending = !this.sortByStatusAscending;
    const statusOrder: { [key: string]: number } = { 'To-do': 0, 'In-progress': 1, 'Completed': 2 };
    const sortedTasks = [...this.tasks].sort((a, b) => {
      const order = this.sortByStatusAscending ? 1 : -1;
      return order * (statusOrder[a.status] - statusOrder[b.status]);
    });
    this.tasks = sortedTasks;
  }

  editTask(id: string): void {
    this.router.navigate(['/task', id]);
  }

  deleteTask(taskId: string): void {
    if (!taskId) {
      console.error('Invalid taskId:', taskId);
      return;
    }

    this.taskService.deleteTask(taskId).subscribe(
      () => {
        console.log('Task deleted successfully!');
        this.store.dispatch(deleteTask({ taskId }));
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );
  }

  exportToCSV(): void {
    // Clone the tasks array to avoid modifying the original data
    const tasksWithClearProperty = this.tasks.map((task) => ({ ...task, clear: '' }));

    const csvData = Papa.unparse(tasksWithClearProperty, {
      quotes: true,
      delimiter: ',',
    });

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'tasks.csv');
  }
}
