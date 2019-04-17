import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient){
    this.getTasks();
  } 

  getTasks(){
    return this._http.get('/tasks');
  }

  addTask(newtask){
    return this._http.post('/create', newtask)
  }

  deleteTask(task_id){
    return this._http.delete('/task/'+ task_id)
  }

  editTask(task){
    return this._http.put('/task/'+ task._id, task)
  }

} 