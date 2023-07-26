import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, TaskHistory, TaskChanges } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private backendUrl = 'http://localhost:5000/api/tasks'; // Replace 'your_backend_url_here' with the actual backend URL.

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.backendUrl);
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.backendUrl}/${id}`);
  }

  addTask(newTask: Task): Observable<Task> {
    return this.http.post<Task>(this.backendUrl, newTask);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.backendUrl}/${id}`);
  }

  updateTask(task: Task): Observable<Task> {
    // Call the updateTask API endpoint on the backend to save the changes
    return this.http.put<Task>(`${this.backendUrl}/${task._id}`, task);
  }
  
}

