import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackService } from '../back.service';
import { AuthGuard } from '../auth.guard';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm!: FormGroup;
  constructor(private router: Router, private backservice: BackService, private authg :AuthGuard) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }
  tostock(Form: FormGroup) {
    const get = new Promise<any>((resolve, _reject) => {
      console.log("Checked Promise...")
      this.backservice.login(Form.value.email, Form.value.password).subscribe(
        {
          next: res => resolve(res)
        }
      )
    })
    get.then((value) => {
      if (value["message"] == "User logged in") {
        console.log("Before Subject: "+Form.value.email);
        sessionStorage.setItem('email',Form.value.email);
        this.backservice.communicatemessage(Form.value.email);
        this.authg.isUser = true;
        sessionStorage.setItem('status',"true");
        this.router.navigateByUrl('/stock');
      }
      else{
        sessionStorage.setItem('status',"false");
      }
    });
  }

}
