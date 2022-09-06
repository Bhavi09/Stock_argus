import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientModule,FormsModule,ReactiveFormsModule,HttpClientTestingModule],
      declarations: [ SignupComponent ],
      providers:[HttpClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have div element with class container py-4',()=>{
    const el = fixture.debugElement.query(By.css('.container.py-4'));
    expect(el).toBeTruthy();
  });


  it('should have class form-label for form3Example3 field',()=>{
    const el = fixture.debugElement.query(By.css('.form-outline label.form-label'));
    expect(el).toBeTruthy();
    expect(el.nativeElement.getAttribute('for')).toEqual('form3Example3');
  });


  it('should bind the email to its formcontrol',()=>{
    const el = fixture.debugElement.query(By.css('#form3Example3'));
    const val = component.myForm.get('email');
    const dummyemail = "bhavimdell16@gmail.com";
    val?.setValue(dummyemail);
    fixture.detectChanges();
    expect(el.nativeElement.value).toEqual(dummyemail);
  });

  
});
