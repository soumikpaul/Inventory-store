import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: ItemService) { }

  up = new FormGroup({
    ProductName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*')
    ]),
    ProductCategory: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    Price: new FormControl(''),
    Units: new FormControl(''),
  });
  ngOnInit() {
    console.log(this.data);

  }

  Submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(dummyData): void {

    let ProductName = dummyData.ProductName;
    let ProductCategory = dummyData.ProductCategory;
    let Price = dummyData.Price;
    let Units = dummyData.Units;
    let id = this.data.id;
    //const foundIndex=this.data.findIndex(x => x.ProductName == ProductName);
    let newObj = this.up.value;
    console.log(newObj);
    let finalObj = newObj;

    if (ProductName == "") {
      ProductName = newObj.ProductName;
    }
    if (ProductCategory == "") {
      ProductCategory = newObj.ProductCategory
    }
    if (Price == "") {
      Price = newObj.Price;
    }
    if (Units == "") {
      Units = newObj.Units;
    }
    console.log("hello" + ProductName + ProductCategory + Price + Units);
    // const finalObj={
    //   id:id,
    finalObj.ProductName = ProductName;
    finalObj.ProductCategory = ProductCategory;
    finalObj.Price = Price;
    finalObj.Units = Units;
    //   //Location:Location
    // };

    console.log(this.data);
    this.dataService.updateIssue(finalObj, id)
      .subscribe((data) => {
        console.log("data:: ", data);
        console.log("Updated");

      });

  }

}


