import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StocksComponent } from './stocks.component';
import {HttpClientModule,HttpClient} from '@angular/common/http'
import { By } from '@angular/platform-browser';

describe('StocksComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,HttpClientModule
      ],
      declarations: [
        StocksComponent
      ],
      providers:[HttpClient]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(StocksComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


  xit("checking button working",async()=>{
    const fixture = TestBed.createComponent(StocksComponent);
    const component = fixture.componentInstance;
    const de = fixture.debugElement;
    const btn = de.query(By.css('#btnsubmit1'));
    btn.triggerEventHandler('click',{});
    fixture.detectChanges();
    expect(component.price).not.toEqual(0);
  });


  it('Should have a div element with class container',()=>{
    const fixture = TestBed.createComponent(StocksComponent);
    const el = fixture.debugElement.query(By.css('div.container'));
    expect(el).toBeTruthy();
  });


  it('Should have column inside row with div row text-white',()=>{
    const fixture = TestBed.createComponent(StocksComponent);
    const el = fixture.debugElement.query(By.css('.row > div.col > div.text-white'));
    expect(el).toBeTruthy();
  })


  it('Input attribute of stockfield',()=>{
    const fixture = TestBed.createComponent(StocksComponent);
    const el = fixture.debugElement.query(By.css('.px-2  form.justify-content-center  div.--stockname  select.form-control'));
    expect(el).toBeTruthy();
    expect(el.nativeElement.getAttribute('type')).toEqual('text');
  })


  it("Should have a button element having a name STATUS",()=>{
    const fixture = TestBed.createComponent(StocksComponent);
    const el = fixture.debugElement.query(By.css('form.justify-content-center div.cl-btn button.--status'));
    expect(el.nativeElement.innerHTML).toEqual('STATUS');
  });

  it("Should call sellstock function when the SELL button is called",()=>{

    const fixture = TestBed.createComponent(StocksComponent);
    const component = fixture.componentInstance;
    const fnc = spyOn(component,"sellstock");
    const el = fixture.debugElement.query(By.css('form.justify-content-center div.cl-btn button.--sell'));
    el.triggerEventHandler('click',null);
    expect(fnc).toHaveBeenCalled();
  })

});
