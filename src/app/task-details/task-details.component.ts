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
    dueDate: new Date(),
    priority: 'Low',
    status: 'To-do',
    historyLog: []
  };
  taskChanges: TaskChanges = {};

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
      this.updatedTask = { ...task };
    });
  }


  onSubmit(): void {
    this.compareAndUpdateChanges();

    const hasChanges = Object.keys(this.taskChanges).length > 0;

    if (hasChanges) {
      const historyEntry: TaskHistory = {
        timestamp: new Date(),
        changes: this.taskChanges
      };

      this.task.historyLog.unshift(historyEntry);
       console.log("dis-befre")
      this.taskService.updateTask(this.task).subscribe(
        () => {
          console.log('Task updated successfully!');
        },
        error => {
          console.error('Error updating task:', error);
        }
      );
    } else {
      console.log('No changes to save.');
    }
  }
// comapring changes in task
  compareAndUpdateChanges(): void {
    this.taskChanges = {};

    if (this.task.title !== this.updatedTask.title) {
      this.taskChanges.title = this.updatedTask.title;
      this.task.title = this.updatedTask.title;
    }
    if (this.task.description !== this.updatedTask.description) {
      this.taskChanges.description = this.updatedTask.description;
      this.task.description = this.updatedTask.description;
    }
    if (this.task.dueDate !== this.updatedTask.dueDate) {
      this.taskChanges.dueDate = this.updatedTask.dueDate;
      this.task.dueDate = this.updatedTask.dueDate;
    }
    if (this.task.priority !== this.updatedTask.priority) {
      this.taskChanges.priority = this.updatedTask.priority;
      this.task.priority = this.updatedTask.priority;
    }
    if (this.task.status !== this.updatedTask.status) {
      this.taskChanges.status = this.updatedTask.status;
      this.task.status = this.updatedTask.status;
    }
  }

  resetForm(): void {
    this.updatedTask = { ...this.task };
    this.compareAndUpdateChanges();
  }
   // Check if the property exists in the changes object
  isCurrentProperty(changes: any, property: string): boolean {
    
    return changes && changes[property] !== undefined;
  }
 // If property exists in the changes object, return its value
    // Otherwise, return the default value from the current task
  getPropertyValue(changes: any, property: string, defaultValue: any): any {
    
    return changes && changes[property] !== undefined
      ? changes[property]
      : defaultValue;
  }
}