import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../shared/api.service';
// import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  id:string ="";
  formDefaultData!:any
  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ApiService,private activatedRoute:ActivatedRoute,
    private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:Params)=>{
      var id = params["id"];
      this.api.GetCompanybycode(id).subscribe((response:any) =>{
        console.log(response)
        this.formDefaultData = response;
        this.companyform.setValue({
          id: this.formDefaultData.id, name: this.formDefaultData.name, empcount: this.formDefaultData.empcount,
          revenue: this.formDefaultData.revenue, address: this.formDefaultData.address, isactive: this.formDefaultData.isactive
        });
      })
    })
  }

  companyform = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    name: this.builder.control('', Validators.required),
    empcount: this.builder.control('', Validators.required),
    revenue: this.builder.control('', Validators.required),
    address: this.builder.control('', Validators.required),
    isactive: this.builder.control(true),
  });

  SaveCompany() {
    if (this.companyform.valid) {
      const Editid = this.companyform.getRawValue().id;
      if (Editid != '' && Editid != null) {
        this.api.UpdateComapny(Editid, this.companyform.getRawValue()).subscribe(response => {
          this.router.navigate(['/'])
          this.toastr.success('Updated successfully');
        });
      } else {
        this.api.CreateComapny(this.companyform.value).subscribe(response => {
          this.closepopup();
          this.toastr.success('Added successfully');
        });
      }
    }
  }

  closepopup() {
    this.dialog.closeAll();
  }

}
