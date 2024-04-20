import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { TaskService } from './task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public tasks: Task[];
  public editTask: Task;
  public deleteTask: Task;

  constructor(private taskService: TaskService){}

  ngOnInit() {
    this.getTasks();
  }

  public getTasks(): void {
    this.taskService.getTasks().subscribe(
      (response: Task[]) => { // zmiana Employee na Task
        this.tasks = response;
        console.log(this.tasks);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddTask(addForm: NgForm): void { // zmiana onAddEmployee na onAddTask
    document.getElementById('add-task-form').click(); // zmiana 'add-employee-form' na 'add-task-form'
    this.taskService.addTask(addForm.value).subscribe( // zmiana employeeService na taskService oraz addEmployee na addTask
      (response: Task) => { // zmiana Employee na Task
        console.log(response);
        this.getTasks();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateTask(task: Task): void { // zmiana onUpdateEmployee na onUpdateTask oraz Employee na Task
    this.taskService.updateTask(task).subscribe( // zmiana employeeService na taskService oraz updateEmployee na updateTask
      (response: Task) => { // zmiana Employee na Task
        console.log(response);
        this.getTasks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteTask(taskId: number): void { // zmiana onDeleteEmployee na onDeleteTask
    this.taskService.deleteTask(taskId).subscribe( // zmiana employeeService na taskService oraz deleteEmployee na deleteTask
      (response: void) => {
        console.log(response);
        this.getTasks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchTasks(key: string): void { // zmiana searchEmployees na searchTasks
    console.log(key);
    const results: Task[] = []; // zmiana Employee na Task
    for (const task of this.tasks) { // zmiana employees na tasks
      if (task.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || task.description.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || task.priority.toLowerCase().indexOf(key.toLowerCase()) !== -1) { // zmiana jobTitle na priority
        results.push(task);
      }
    }
    this.tasks = results; // zmiana employees na tasks
    if (results.length === 0 || !key) {
      this.getTasks();
    }
  }

  public onOpenModal(task: Task, mode: string): void { // zmiana onOpenModal na onOpenModal oraz Employee na Task
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addTaskModal'); // zmiana addEmployeeModal na addTaskModal
    }
    if (mode === 'edit') {
      this.editTask = task;
      button.setAttribute('data-target', '#updateTaskModal');
    }
    if (mode === 'delete') {
      this.deleteTask = task;
      button.setAttribute('data-target', '#deleteTaskModal');
    }
    container.appendChild(button);
    button.click();
  }
}
