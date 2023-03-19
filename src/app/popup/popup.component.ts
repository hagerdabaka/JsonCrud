import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs'
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit{
  
 editdata:any;

 constructor(private builder: FormBuilder,
              private api:ApiService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA ) public data:any){}



  ngOnInit(): void {
    if (this.data.id !='' && this.data.id != null){
      this.api.GetCompanyByCode(this.data.id).subscribe(res=>{
        this.editdata=res;
        this.companyform.setValue({
          id: this.editdata.id,
          name: this.editdata.name,
          email: this.editdata.email,
          empCount: this.editdata.empCount,
          revenue:this.editdata.revenue,
          address: this.editdata.address,
          isActive: this.editdata.isActive    
        })
      })
    }
  }

  companyform = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),
    empCount: this.builder.control('', Validators.required),
    revenue: this.builder.control('', Validators.required),
    address: this.builder.control('', Validators.required),
    isActive: this.builder.control(true),
  });

  SaveCompany(){
    
    if(this.companyform.valid){
      const editId= this.companyform.getRawValue().id;
      if(editId != '' && editId != null){
        this.api.Updatecompany(editId,this.companyform.getRawValue()).subscribe(res=>{
          console.log(res);
          this.closepopup();
          alertify.success('updated Successfully. ');
        }) 
      }
      else{
      this.api.Createcompany(this.companyform.value).subscribe(res=>{
        console.log(res);
        this.closepopup();
        alertify.success(' Saved Successfully.')
      })
    }
   }
  }

  closepopup(){
  this.dialog.closeAll()
  }
}

