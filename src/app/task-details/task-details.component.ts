import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task, TaskHistory, TaskChanges } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  taskId!: string;
  task!: Task;
  updatedTask: Task = {
    _id: '',
    title: '',
    description: '',
    dueDate:new Date(),
    priority: 'low',
    status: 'to-do',
    historyLog: []
  }; // New variable to store the changes made in the form
  taskChanges: TaskChanges = {}; // Variable to store the changes between the task and form data

  constructor(private route: ActivatedRoute, private taskService: TaskService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.taskId = params['id'];
      this.getTaskDetails();
    });
  }

  getTaskDetails(): void {
    this.taskService.getTaskById(this.taskId).subscribe(task => {
      this.task = task;
      // Clone the task to capture the changes in the form
      this.updatedTask = { ...task };
    });
  }

  // Method to handle form submission
  onSubmit(): void {
    this.compareAndUpdateChanges(); 
    // Create a new history log entry with the current timestamp and changes
    const historyEntry: TaskHistory = {
      timestamp: new Date(),
      changes: this.taskChanges // Use the taskChanges to store the changes made in the form
    };
    console.log(historyEntry.changes);
    // Add the history entry to the task's history log
    if (!this.task.historyLog) {
      this.task.historyLog = []; // Initialize the history log if it doesn't exist
    }
    this.task.historyLog.push(historyEntry);

    // Call the updateTask method from the service
    this.taskService.updateTask(this.task).subscribe(
      () => {
        console.log('Task updated successfully!');
      },
      error => {
        console.error('Error updating task:', error);
      }
    );
  }

  // Helper method to compare form data with the original task and create the TaskChanges
  compareAndUpdateChanges(): void {
    this.taskChanges = {};

    if (this.task.title !== this.updatedTask.title) {
      this.taskChanges.title = this.updatedTask.title;
      this.task.title=this.updatedTask.title;
    }
    if (this.task.description !== this.updatedTask.description) {
      this.taskChanges.description = this.updatedTask.description;
      this.task.description=this.updatedTask.description;
    }
    if (this.task.dueDate !== this.updatedTask.dueDate) {
      this.taskChanges.dueDate = this.updatedTask.dueDate;
      this.task.dueDate=this.updatedTask.dueDate;
    }
    if (this.task.priority !== this.updatedTask.priority) {
      this.taskChanges.priority = this.updatedTask.priority;
      this.task.priority=this.updatedTask.priority;
    }
    if (this.task.status !== this.updatedTask.status) {
      this.taskChanges.status = this.updatedTask.status;
      this.task.status=this.updatedTask.status;
    }
  }

  // Method to reset the form to the original task details
  resetForm(): void {
    this.updatedTask = { ...this.task };
    this.compareAndUpdateChanges(); // Update the taskChanges when the form is reset
  }
}
