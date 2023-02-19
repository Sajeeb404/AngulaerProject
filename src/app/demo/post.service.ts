import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';



const httpOption = {

  headers: new HttpHeaders({
    'conten-Type':'application/json'

  })
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url1 = 'http://localhost:3000/userlist';  

  constructor(private httpService:HttpClient) { }

  getTask():Observable<User[]>{
    const tasks = this.httpService.get<User[]>(this.url1);
    return tasks;
  }


  addTask(task: User) {
    return this.httpService.post<User>(this.url1, task, httpOption);
  }


  updateReminder(task: User) {
    return this.httpService.put<User>(this.url1 + '/' + task.id, task, httpOption);
  }


  delete(task: User): Observable<User> {
    return this.httpService.delete<User>(this.url1 + '/' + task.id);
  }

  



}
