import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  url = 'https://jsonplaceholder.typicode.com/users';

  displayedColumns: string[] = ['id', 'name', 'username', 'email'];
  dataSource: any;

  constructor(private http: HttpClient,
    public router: Router){
      this.getEmployeeData().subscribe((response: any)=>{
        // console.log(response)
        this.dataSource= response;            
          });
  }

  ngOnInit(): void {
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
