import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackService } from '../back.service';
import ls from "localstorage-slim";
@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  
  title = 'front';
  val$: any;
  chprice: any;
  stock = "";
  status$ = "";
  myForm!: FormGroup;
  email: any
  click = 0;
  price: any;
  pl: any;
  constructor(private backservice: BackService ,private router:Router) {
    console.log("Hello from stock department");
  }

  ngOnInit(): void {
    if(ls.get('#qwAs?.,s', { decrypt: true, secret: 88 })=="")
    {
      this.router.navigateByUrl('/');
    }
    this.email = ls.get('#qwAs?.,s', { decrypt: true, secret: 88 });
    console.log(this.email);
    this.myForm = new FormGroup({
      stock: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z ]*$")]),
      qty: new FormControl('', [Validators.required])
    })
  }
  show_price(Form: FormGroup) {
    console.log("Before subscribe")
    this.stock = Form.value.stock;
    const get = new Promise<any>((resolve, _reject) => {
      this.backservice.getprice(Form.value.stock).subscribe(
        {
          next: res => resolve(res)
        }
      )
    })
    get.then((value) => {
      this.val$ = value;
      this.price = parseInt(this.val$["Global Quote"]["05. price"]) * 79;
    })
  }



  add_userdetail(Form: FormGroup) {
    let pricef:any;
    console.log(typeof (Form.value.qty));
    const get = new Promise<any>((resolve, _reject) =>{
      this.backservice.getprice(Form.value.stock).subscribe(
        {
          next: res => resolve(res)
        }
      )
    })
    get.then((value) => {
      this.val$ = value;
      pricef = Form.value.qty * parseInt(this.val$["Global Quote"]["05. price"]) * 79;
      const get1 = new Promise<any>((resolve, _reject) => {
        this.backservice.adduser(this.email, Form.value.stock, Form.value.qty, pricef).subscribe(
          {
            next: res => resolve(res)
          }
        )
      })
      get1.then((value1)=>{
        if(value1["inres"]=="successfully updated")
        {
          const box1 = document.getElementById("alertnq");
          const el1 = document.createElement('div');
          el1.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
          Successfully buyed!!
         <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
       </div>`;
       box1?.append(el1); 
          Form.reset();
        }
        else{
          const box2 = document.getElementById("alertnq");
          const el2 = document.createElement('div');
          el2.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
          Enter correct name of stock
         <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
       </div>`;
       box2?.append(el2); 
          Form.reset();
        }
      })
    });
  }


  status() {
    const get = new Promise<any>((resolve, _reject) => {
      this.backservice.getstatus(this.email).subscribe(
        {
          next: res => resolve(res)
        }
      )
    })
    get.then((value) => {

      if (this.click == 0) {
        const box = document.getElementById('stocklist');
        const box2 = document.getElementById('overall');
        for (const element of value["inddif"]) {
          let color = "";
          if (element['diff'] > 0) {
            color = "success";
          }
          else color = "danger";
          const el = document.createElement('li');
          el.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");
          el.innerHTML = `${element['name']}
  <span class="badge bg-${color} rounded-pill">${element['diff']}</span>`;
          box?.appendChild(el);
        }
        console.log(value["P&L"])
        const el2 = document.createElement('div');
        el2.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center")

        if (parseInt(value["P&L"]) >= 0) {
          el2.innerHTML = `<div class="card opacity-75 text-bg-success mb-3 mx-auto" style="max-width: 24rem;">
    <div class="card-header">OVERALL</div>
    <div class="card-body">
      <h5 class="card-title">Profit of ${value["P&L"]}</h5>
    </div>
  </div>`;
        }
        else {
          el2.innerHTML = `<div class="card opacity-75 text-bg-danger mb-3 mx-auto" style="max-width: 24rem;">
  <div class="card-header">OVERALL</div>
  <div class="card-body">
    <h5 class="card-title">Loss of ${value["P&L"]}</h5>
  </div>`;
        }
        box2?.append(el2);
        this.click = 1;
      }
    })
  }


  sellstock(Form: FormGroup) {
    let color = "danger";
    let quote = "loss"
    const get = new Promise<any>((resolve, _reject) => {
      this.backservice.sell(this.email, Form.value.stock, Form.value.qty).subscribe(
        {
          next: res => resolve(res)
        }
      )
    })
    get.then((value) => {
      if (value["pl"] != "Please enter correct name or qty") {
        this.pl = value["pl"];
        console.log(typeof(value["pl"]));
        if (parseInt(this.pl) > 0) {
          color = "success";
          quote = "profit"
        }
        const box = document.getElementById('pl');
        const el = document.createElement('li');
        el.setAttribute("class", `list-group-item list-group-item-${color}`);
        el.innerHTML = `You have sell on the ${quote} of ${this.pl}`;
        box?.append(el);
        Form.reset();
      }
      else
      {
        const box1 = document.getElementById("alertnq");
        const el1 = document.createElement('div');
        el1.innerHTML = ` <div class="alert alert-danger alert-dismissible fade show" role="alert">
        Please enter correct name or quantity
       <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
     </div>`
     box1?.append(el1);
     Form.reset();
      }
    });
  }
  logout(){
    ls.remove("#qwAs?.,s");
    ls.remove("qsc@1!%^36");
    this.router.navigateByUrl('/');
  }
}
