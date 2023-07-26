import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private router: Router, private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
       console.log(tasks);
    });
  }

  editTask(id: string): void {
    // Navigate to the edit task page, passing the task id as a parameter.
    this.router.navigate(['/task', id]);
  }

  deleteTask(taskId: string): void {
  // Check if the taskId is valid before making the delete request
  if (!taskId) {
    console.error('Invalid taskId:', taskId);
    return;
  }

  // Call the deleteTask method from the service
  this.taskService.deleteTask(taskId).subscribe(
    () => {
      console.log('Task deleted successfully!');
      // Refresh the task list after deletion (optional)
      this.getTasks();
    },
    error => {
      console.error('Error deleting task:', error);
    }
  );
}

}
