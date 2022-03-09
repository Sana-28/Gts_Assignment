import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ActionDialogComponent } from '../action-dialog/action-dialog.component';
import { MatTable } from '@angular/material/table';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  url = environment.user_api;

  displayedColumns: string[] = ['id', 'name', 'username', 'email','action'];
  dataSource: any;
  @ViewChild(MatTable, { static: true })
  table!: MatTable<any>;

  constructor(private http: HttpClient,
    public router: Router,
    public dialog: MatDialog){
      this.getEmployeeData().subscribe((response: any)=>{
        this.dataSource= response;            
          });
  }

  ngOnInit(): void {
  }

  getEmployeeData(): Observable<any>  {
    return this.http.get<any>(this.url);
  }

  openDialog(action: any,obj: any) {
    obj.action = action;

    const dialogRef = this.dialog.open(ActionDialogComponent, {
      width: '250px',
      data:obj
    });
    dialogRef.afterClosed().subscribe((result: { event: string; data: any; }) => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  // onAdd(){
  //   console.log("Add Employee");
  //   //this.router.navigate(['/add']);
  // }

  addRowData(row_obj: { name: any; username: any; email: any;}){
    var d = new Date();
    this.dataSource.push({
      id:d.getTime(),
      name:row_obj.name,
      username: row_obj.username,
      email: row_obj.email
    });
    this.table.renderRows();
  }

  updateRowData(row_obj: { id: any; name: any;  username: any; email: any;}){
    this.dataSource = this.dataSource.filter((value: { id: any; name: any; username: any; email: any;},key: any)=>{
      if(value.id == row_obj.id){
        value.name = row_obj.name;
        value.username = row_obj.username;
        value.email = row_obj.email;
      }
      return true;
    });
  }
  deleteRowData(row_obj: { id: any; }){
    this.dataSource = this.dataSource.filter((value: { id: any; },key: any)=>{
      return value.id != row_obj.id;
    });
  }
}
