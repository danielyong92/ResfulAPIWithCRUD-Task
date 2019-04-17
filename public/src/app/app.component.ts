import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'public';
  tasks = [];
  num: number;
  randNum: number;
  str: string;
  first_name: string;
  description = [];
  showtitle = "";
  showdescription = "";
  newTask: any;//or newTask: {title:'', description:''};
  showEditForm = false;
  editTask: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.newTask = { title: "", description: "" }
  }

  allTasks() {
    let alltasks = this._httpService.getTasks();
    alltasks.subscribe(data => {

      console.log("Got out tasks!", data)
      this.tasks = data['tasks'];
      console.log(`*****${this.tasks}*****`)
    })
  }

  getDescription(task) {
    console.log("////////////" + task)
    this.showtitle = task['title']
    this.showdescription = task['description']
    console.log('////////////there');
    console.log(this.showdescription);
  }

  onSubmit(){
    let observable = this._httpService.addTask(this.newTask);
    observable.subscribe(data => {
      console.log("data from Post back", data);
      this.newTask = {title:"", description:""}
      this.allTasks();
    })
  }

  editOnClick(task){ //this just to enable to form when press EDIT
    task.showEditForm = true;
    this.editTask = task; //editTask was empty, but now it has info from HTML to know to edit which specific task
  }

  onEdit(task){
    task.showEditForm = false;
    let observable = this._httpService.editTask(task);
    observable.subscribe(data => {
      
    })
  }


  delete(task_id){
    let observable = this._httpService.deleteTask(task_id);
    observable.subscribe(data => {
      this.allTasks();
    })
  }

  onButtonClick(): void {
    console.log(`Click event is working`);
  }

  onButtonClickEvent(event: any): void {
    console.log(`Click event is working with event: ${event}`);
  }




}
