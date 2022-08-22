import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackService {

  email="";
  constructor(private _http:HttpClient) {}

  communicatemessage(msg:any){
    console.log("Communicate message is called");
    this.email=msg;
  }
  getprice(name:any):Observable<object>{
    return this._http.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${name}&apikey=TM0KKBA3TUNIU9US`); 
  }
  adduser(email:any,stock:any,qty:any,invested:any):Observable<object>{
    console.log("Add user function is called...");
    return this._http.get(`http://localhost:3000/user?&id=${email}&stockname=${stock}&qty=${qty}&invested=${invested}`); 
  }
  getstatus(email:any):Observable<object>{
    console.log("Get status is called");
    return this._http.get(`http://localhost:3000/getstatus?id=${email}`)
  }
  login(email:any,password:any):Observable<object>{
    console.log("back service login function called...")
    return this._http.get(`http://localhost:3000/login?email=${email}&password=${password}`);
  }
  signup(email:any,password:any):Observable<object>{
    return this._http.get(`http://localhost:3000/signup?email=${email}&password=${password}`);
  }
}
