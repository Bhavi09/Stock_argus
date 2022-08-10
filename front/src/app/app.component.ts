import { Component } from '@angular/core';
import { BackService } from './back.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';
  val$:any;
  constructor(private backservice:BackService){
    console.log("checking console....");
  }
  
  
  show_price(data:any){
    console.log("Before subscribe")
    this.backservice.getprice(data.stock).subscribe(
      {
        next:res => this.val$=res 
      }
    )
    console.log(typeof(parseInt(this.val$["Global Quote"]["05. price"])));
    const el = document.createElement('div');
    el.innerHTML = `${this.val$["Global Quote"]["05. price"]}`;
    const box = document.getElementById('cl');
    box?.appendChild(el);

  } 
  
  
  
  async add_userdetail(data:any){
    let price;
    console.log(typeof(data.qty));
    this.backservice.getprice(data.stock).subscribe(
      {
        next: res => this.val$ = res
      }
    )
    price = data.qty*parseInt(this.val$["Global Quote"]["05. price"])*79;
  
    this.backservice.adduser(data.firstname,data.mobile,data.stock,data.qty,price).subscribe({});
    window.location.reload();
  }
}