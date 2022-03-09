import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud-app';
  dataSource: any;
  addEmp : boolean = false;
  url= environment.user_api;

  displayedColumns: string[] = ['id', 'name', 'username', 'email'];

  constructor(private http: HttpClient,
    public router: Router){
      this.getEmployeeData().subscribe((response: any)=>{
        this.dataSource= response;            
          });
  }

  getEmployeeData(): Observable<any>  {
    return this.http.get<any>(this.url);
  }
}
