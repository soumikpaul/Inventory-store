import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemService } from '../item.service';
import { FormControl } from '@angular/forms';
import { MatSort, MatSortable, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormField } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import {UpdateComponent} from '../update/update.component';
import { identifierModuleUrl } from '@angular/compiler';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  items = [];
  form = [];
  dataSource: any = [];
  errorMsg: any;
  ProductName: any;
  index:any;
  displayedColumns: string[] = ['ProductName', 'ProductCategory', 'Price', 'Units', 'Location','actions'];
  
  constructor(private http: HttpClient, private itemSer: ItemService, public dialog: MatDialog) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {

    this.itemSer.getItems()
      .subscribe(data => {
        this.items = data;
      });
    (error) => {
      return this.errorMsg = error.message;
    };
    
  }

  list() {
     console.log(this.form);
    (this.items["item"]).forEach((data: any) => this.form.push(data));
    // console.log(this.items['item'][0]['ProductName']);
    this.dataSource = new MatTableDataSource(this.form);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  startEdit(id:number, ProductName: string, ProductCategory: string, Price: number, Units: number, Location: string) {
    const dialogRef = this.dialog.open(UpdateComponent, {
      data: {'id':id,'ProductName': ProductName, 'ProductCategory': ProductCategory, 'Price': Price, 'Units': Units, 'Location': Location}
    });
    this.ProductName=ProductName;

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        //console.log(this.ProductName);
        console.log(this.dataSource['data']);
        const foundIndex=this.dataSource['data'].findIndex(x => x.ProductName == this.ProductName);
        this.refreshTable();
      }
    });
  }

  deleteItem(id:number, ProductName: string, ProductCategory: string, Price: number, Units: number, Location: string) {
    //this.index = i;
    //this.id = id;
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {id: id, ProductName: ProductName, ProductCategory: ProductCategory, Price: Price}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refreshTable();
      }
    });
  }
  refreshTable()
  {
    this.itemSer.getItems()
      .subscribe(data => {
        this.items = data;
      });
      //console.log(this.items);
    (error) => {
      return this.errorMsg = error.message;
    };
    (this.items["item"]).forEach((data: any) => this.form.push(data));
    // console.log(this.items['item'][0]['ProductName']);
    this.dataSource = new MatTableDataSource(this.form);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}


