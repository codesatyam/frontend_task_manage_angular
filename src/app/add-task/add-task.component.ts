import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  newTaskForm!: FormGroup; // Add the '!' here

  constructor(private formBuilder: FormBuilder, private taskService: TaskService) { }

  ngOnInit(): void {
    this.newTaskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['low', Validators.required],
      status: ['to-do', Validators.required]
    });
  }

  addTask(): void {
    const newTask = this.newTaskForm.value;
    this.taskService.addTask(newTask).subscribe(
      () => {
        this.newTaskForm.reset();
        console.log('Task added successfully!');
      },
      error => {
        console.error('Error adding task:', error);
      }
    );
  }
  
}
