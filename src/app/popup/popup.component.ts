import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';
// import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  editdata: any;
  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.api.GetCompanybycode(this.data.id).subscribe(response => {
        this.editdata = response;
        this.companyform.setValue({
          id: this.editdata.id, gmail: this.editdata.gmail, personalNumber: this.editdata.personalNumber,name: this.editdata.name,
          lastName: this.editdata.lastName,dateOfBirth: this.editdata.dateOfBirth,
          category: this.editdata.category, isactive: this.editdata.isactive
        });
      });
    }
  }

  companyform = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    gmail: this.builder.control('', Validators.required),
    personalNumber: this.builder.control('', Validators.required),
    name: this.builder.control('', Validators.required),
    lastName: this.builder.control('', Validators.required),
    dateOfBirth: this.builder.control('', Validators.required),
    category: this.builder.control('', Validators.required),
    isactive: this.builder.control(true),
  });

  SaveCompany() {
    if (this.companyform.valid) {
      const Editid = this.companyform.getRawValue().id;
      if (Editid != '' && Editid != null) {
        this.api.UpdateComapny(Editid, this.companyform.getRawValue()).subscribe(response => {
          this.closepopup();
          // alertify.success("Updated successfully.")
        });
      } else {
        this.api.CreateComapny(this.companyform.value).subscribe(response => {
          this.closepopup();
          // alertify.success("saved successfully.")
        });
      }
    }
  }

  closepopup() {
    this.dialog.closeAll();
  }

}
