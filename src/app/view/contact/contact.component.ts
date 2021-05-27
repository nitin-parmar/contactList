import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/service/api.service';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  displayedColumns: string[] = ['avatar', 'email', 'phone', 'company'];
  dataSource:any;
  cotactList:any;

  @ViewChild(MatPaginator) paginator:MatPaginator | undefined
  
  constructor( private api: ApiService, private snack: UtilityService ) { }
  
  ngOnInit(): void {
    this.showContact()
  }

  showContact(){
    this.api.getContact().subscribe((resp: HttpResponse<any>)=> {
      if(!resp.ok){
        this.snack.openSnackBar('Somthing went wrong', 'Close');
        return
      }
      this.dataSource = resp.body;
      this.cotactList = new MatTableDataSource(this.dataSource);
      this.cotactList.paginator = this.paginator;

    }, (error: HttpErrorResponse)=> {
      if (error.status === 404 || error.status === 400) {
        this.snack.openSnackBar(error.error.message, 'Close');
      }else {
        this.snack.openSnackBar(error.message, 'Close');

      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.cotactList.filter = filterValue.trim().toLowerCase();
    console.log(this.cotactList)
    if (this.cotactList.paginator) {
      this.cotactList.paginator.firstPage();
    }
  } 

}
