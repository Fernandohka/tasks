import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private apiUrl = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  get() : Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl + "/tasks")
  }

  getById(id: string): Observable<Task> {
    console.log("aaaa")
    let url = this.apiUrl + "/tasks/" + id
    console.log(url)
    return this.http.get<Task>(url)
  }

  post(task: Task): void {
    this.http.post(this.apiUrl + "/tasks", task)
  }

  delete(id: string): void {
    this.http.delete(this.apiUrl + "/tasks/" + id)
  }
}