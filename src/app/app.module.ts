import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Add these imports
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';

const appRoutes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'add', component: AddTaskComponent },
  { path: 'task/:id', component: TaskDetailsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    AddTaskComponent,
    TaskDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule, // Add this line
    ReactiveFormsModule, // Add this line
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
