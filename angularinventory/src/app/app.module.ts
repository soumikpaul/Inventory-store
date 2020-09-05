import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//import { Injectable } from '@angular/core';  


import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatSortModule, MatIconModule, MatDialogModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DeleteComponent } from './delete/delete.component';
import { ChartComponent } from './chart/chart.component';
//import { UpdateComponent } from './update/update.component';
import { Ng6O2ChartModule } from 'ng6-o2-chart';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DeleteComponent,
    ChartComponent,
    //UpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatChipsModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    //Injectable
    Ng6O2ChartModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
