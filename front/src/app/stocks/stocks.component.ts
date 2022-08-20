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
  myForm!:FormGroup
  usermail =""
  constructor(private backservice:BackService) { 
  }

  ngOnInit(): void {
    this.backservice.getmessage().subscribe(message =>{
      this.usermail = message;
    })
    this.myForm = new FormGroup({
      name: new FormControl(this.usermail,[]),
      mobile: new FormControl('',[Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10),Validators.required]),
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
  const el = document.createElement('div');
  el.setAttribute('id','cls');
  el.innerHTML = `${this.val$["Global Quote"]["05. price"]}`;
  const box = document.getElementById('cl');
  box?.appendChild(el);
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

  this.backservice.adduser(Form.value.name,Form.value.mobile,Form.value.stock,Form.value.qty,price).subscribe({});
  Form.reset();
  });
}

status(Form:FormGroup)
{
  console.log(this.usermail);
  const get = new Promise<any>((resolve,_reject)=>{
    this.backservice.getstatus(Form.value.mobile).subscribe(
      {
        next:res => resolve(res)
      }
    )
  })
  get.then((value)=>{
    // console.log(value["inddif"]);

    console.log(value["stocksdetail"][1]['s_name']);
    const box = document.getElementById('stocklist');
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
  })
}
onSubmit(form:FormGroup)
{
  console.log('valid?', form.valid);
  console.log('name', form.value.name);
  console.log('mobile', form.value.mobile);
  console.log('stock', form.value.stock);
  console.log('qty',form.value.qty);
}
}
