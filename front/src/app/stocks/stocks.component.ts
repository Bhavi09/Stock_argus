import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackService } from '../back.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  title = 'front';
  val$:any;
  chprice:any;
  stock ="";
  status$="";
  myForm!:FormGroup;
  email:any
  click=0;
  price:any;
  constructor(private backservice:BackService) { 
    console.log("HEllo from stock department");
  }

  ngOnInit(): void {
    this.email = sessionStorage.getItem('email');
    console.log(this.email);
    this.myForm = new FormGroup({
      stock : new FormControl('',[Validators.required]),
      qty : new FormControl('',[])
  })
}
show_price(Form:FormGroup){
  console.log("Before subscribe")
  this.stock = Form.value.stock;
  const get = new Promise<any>((resolve,_reject)=>{
    this.backservice.getprice(Form.value.stock).subscribe(
      {
        next:res => resolve(res)
      }
    )
  })
  get.then((value)=>{
  this.val$ = value;
  this.price = parseInt(this.val$["Global Quote"]["05. price"])*79;
  })
} 



add_userdetail(Form:FormGroup){
  let price;
  console.log(typeof(Form.value.qty));
  const get = new Promise<any>((resolve,_reject)=>{
    this.backservice.getprice(Form.value.stock).subscribe(
      {
        next:res => resolve(res)
      }
    )
  })
  get.then((value)=>{
  this.val$ = value;
  price = Form.value.qty*parseInt(this.val$["Global Quote"]["05. price"])*79;

  this.backservice.adduser(this.email,Form.value.stock,Form.value.qty,price).subscribe({});
  Form.reset();
  });
}

status()
{
  const get = new Promise<any>((resolve,_reject)=>{
    this.backservice.getstatus(this.email).subscribe(
      {
        next:res => resolve(res)
      }
    )
  })
  get.then((value)=>{

    if(this.click==0)
    {
    const box = document.getElementById('stocklist');
    const box2 = document.getElementById('overall');
    for(const element of value["inddif"])
    {
      let color="";
      if(element['diff']>0)
      {
        color = "success";
      }
      else color = "danger";
  const el = document.createElement('li');
  el.setAttribute("class","list-group-item d-flex justify-content-between align-items-center");
  el.innerHTML = `${element['name']}
  <span class="badge bg-${color} rounded-pill">${element['diff']}</span>`;
  box?.appendChild(el);
  }
  console.log(value["P&L"])
  const el2 = document.createElement('div');
  el2.setAttribute("class","list-group-item d-flex justify-content-between align-items-center")
  
  if(parseInt(value["P&L"])>=0)
  {
    el2.innerHTML = `<div class="card opacity-75 text-bg-primary mb-3 mx-auto" style="max-width: 24rem;">
    <div class="card-header">OVERALL</div>
    <div class="card-body">
      <h5 class="card-title">Profit of ${value["P&L"]}/h5>
    </div>
  </div>`;
  }
  else {el2.innerHTML = `<div class="card opacity-75 text-bg-danger mb-3 mx-auto" style="max-width: 24rem;">
  <div class="card-header">OVERALL</div>
  <div class="card-body">
    <h5 class="card-title">Loss of ${value["P&L"]}</h5>
  </div>`;}
  box2?.append(el2);
  this.click=1;
}
  })
}
}
