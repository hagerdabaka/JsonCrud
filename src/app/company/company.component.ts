import { Component, Inject, Injectable, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { companyModel } from '../Model/companyModel';
import { PopupComponent } from '../popup/popup.component';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

constructor(private dialog:MatDialog , private api:ApiService){}
@ViewChild(MatPaginator) _paginator!:MatPaginator;
@ViewChild(MatSort) _sort!:MatSort;

finaldata:any;

companydata!: companyModel[];

displayColumns :string[]=["id","name","email","empCount","revenue","address","isActive","action"];


ngOnInit(): void {


  this.LoadCompany();
 }

Openpopup(id:any){

 const _popup= this.dialog.open(PopupComponent,
    {
      width:'500px',
      exitAnimationDuration:'1000ms',
      enterAnimationDuration:'1000ms',
      data:{
        id:id
      }
    }
    )

    _popup.afterClosed().subscribe(res=>{
      this.LoadCompany();
    })
}

LoadCompany(){
 this.api.Getallcompany().subscribe(response=>{
  this.companydata=response;
  this.finaldata=new MatTableDataSource<companyModel>(this.companydata);
  this.finaldata.paginator=this._paginator;
  this.finaldata.sort=this._sort;
 })
}

EditCompany(id: any) {
  this.Openpopup(id);
}

RemoveCompany(id: any) {
  alertify.confirm("Remove Company", "do you want remove this company?", () => {
    this.api.RemoveCompanyByCode(id).subscribe(r => {
      this.LoadCompany();
    });
  }, function () {

  })
}



}
