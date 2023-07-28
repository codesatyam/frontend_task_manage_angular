import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { saveAs } from 'file-saver';

import * as Papa from 'papaparse';

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

  constructor(private router: Router, private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      console.log(tasks);
    });
  }

  sortByDueDate(): void {
    this.sortByDueDateAscending = !this.sortByDueDateAscending;
    this.tasks.sort((a, b) => {
      const order = this.sortByDueDateAscending ? 1 : -1;
      return (
        order *
        ((a.dueDate ? new Date(a.dueDate).getTime() : 0) -
          (b.dueDate ? new Date(b.dueDate).getTime() : 0))
      );
    });
  }

  sortByPriority(): void {
    this.sortByPriorityAscending = !this.sortByPriorityAscending;
    const priorityOrder: { [key: string]: number } = { low: 0, medium: 1, high: 2 };
    this.tasks.sort((a, b) => {
      const order = this.sortByPriorityAscending ? 1 : -1;
      return order * (priorityOrder[a.priority] - priorityOrder[b.priority]);
    });
  }

  sortByStatus(): void {
    this.sortByStatusAscending = !this.sortByStatusAscending;
    const statusOrder: { [key: string]: number } = { 'to-do': 0, 'in-progress': 1, completed: 2 };
    this.tasks.sort((a, b) => {
      const order = this.sortByStatusAscending ? 1 : -1;
      return order * (statusOrder[a.status] - statusOrder[b.status]);
    });
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
        this.getTasks();
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
