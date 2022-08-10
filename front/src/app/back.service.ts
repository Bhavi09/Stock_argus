import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackService {

  
  constructor(private _http:HttpClient) {}

  getprice(name:any):Observable<object>{
    return this._http.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${name}&apikey=TM0KKBA3TUNIU9US`); 
  }
  adduser(name:any,mobile:any,stock:any,qty:any,invested:any):Observable<object>{
    console.log("Add user function is called...");
    return this._http.get(`http://localhost:3000/user?name=${name}&id=${mobile}&stockname=${stock}&qty=${qty}&invested=${invested}`); 
  }

}
