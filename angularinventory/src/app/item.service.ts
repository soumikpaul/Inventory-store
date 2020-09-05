import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
//import { Iitems } from './items';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
//import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Iitems} from './items';
@Injectable({
  providedIn: 'root'
})
export class ItemService {

  dataChange: BehaviorSubject<Iitems[]> = new BehaviorSubject<Iitems[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  baseurl: any;
  private url = 'assets/data/items.json';
  constructor(private http: HttpClient) { }
  getItems(): Observable<Iitems[]> {
    //console.log(this.http.get<Iitems[]>(this.url));
    return this.http.get<Iitems[]>(this.url)
      .pipe(catchError((this.errorHandler)
      ));

  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  updateIssue (issue: Iitems,id:number): Observable<Iitems[]>{
    this.dialogData = issue;
    this.baseurl= `http://localhost:3000/item/${id}`;
    return this.http.patch<Iitems[]>(this.baseurl,issue);
  }

  deleteIssue (id: number): Observable<Iitems[]>{
    console.log(id);
    this.baseurl=`http://localhost:3000/item/${id}`;
    return this.http.delete<Iitems[]>(this.baseurl);
  }


}
