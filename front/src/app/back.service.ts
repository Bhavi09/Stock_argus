import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackService {

  private subject = new Subject<any>();

  sendMessage(message:string)
  {
    this.subject.next(message);
  }
  getmessage():Observable<any>{
    return this.subject.asObservable();
  }
  constructor(private _http:HttpClient) {}

  getprice(name:any):Observable<object>{
    return this._http.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${name}&apikey=TM0KKBA3TUNIU9US`); 
  }
  adduser(name:any,mobile:any,stock:any,qty:any,invested:any):Observable<object>{
    console.log("Add user function is called...");
    return this._http.get(`http://localhost:3000/user?name=${name}&id=${mobile}&stockname=${stock}&qty=${qty}&invested=${invested}`); 
  }
  getstatus(mobile:any):Observable<object>{
    return this._http.get(`http://localhost:3000/getstatus?id=${mobile}`)
  }
  login(email:any,password:any):Observable<object>{
    console.log("back service login function called...")
    return this._http.get(`http://localhost:3000/login?email=${email}&password=${password}`);
  }
  signup(email:any,password:any):Observable<object>{
    return this._http.get(`http://localhost:3000/signup?email=${email}&password=${password}`);
  }
}
