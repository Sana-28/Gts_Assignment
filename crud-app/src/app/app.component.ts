import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud-app';
  employeeData = [];
  url = 'https://jsonplaceholder.typicode.com/users';

  displayedColumns: string[] = ['id', 'name', 'username', 'email'];
  dataSource: any;

  constructor(private http: HttpClient,
    public router: Router){
      this.getEmployeeData().subscribe((response: any)=>{
        // console.log(response)
        this.dataSource= response;
          
            console.log(this.employeeData)
            
          });
  }

  onAdd(){
    console.log("Add Employee");
    this.router.navigate(['/add']);
  }

  getEmployeeData(): Observable<any>  {
    return this.http.get<any>(this.url);
  }

  // postUsers(user)
  // {
  //   return this.http.post(this.url, user);
  // }
  // updateUser(user) {
  //   return this.http.put(this.url + '/' + user.id, user);
  // }
}
