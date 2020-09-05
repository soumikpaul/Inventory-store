import { Component, OnInit, IterableDiffers } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators, FormBuilder, FormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']

})
export class TestComponent implements OnInit {
  reg = new FormGroup({
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
    Area: new FormControl(''),
    Zone: new FormControl(''),
    Shelf: new FormControl('')
  });
  public items = [];
  public form = [];
  private url = 'assets/data/items.json';
  private url1= 'http://localhost:3000/item';
  //msg=0;
  message = 'Item has been added successfully.';
  msg = false;
  // data1 = [
  //   { 'Product Name': '' },
  //   { 'Produt Category': '' },
  //   { 'Price': '' }
  // ];
  constructor(private itemSer: ItemService, private http: HttpClient) {

  }
  ngOnInit() {
    this.itemSer.getItems()

      .subscribe(data => this.items = data);

  }

  // list() {
  //   console.log((this.items['item']).forEach((data) => this.form.push(data)));
  //   console.log(this.items);

  // }

  onSubmit() {

    let obj: any;
    obj = this.reg.value;
    console.log(obj);
    this.http.post(this.url1, obj).toPromise().then((data1: any) => {
      data1 = this.reg.value;
      this.msg = true;
    });
    this.reg.reset();
  }

}
