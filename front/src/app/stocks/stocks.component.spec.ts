import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StocksComponent } from './stocks.component';
import {HttpClientModule,HttpClient} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('StocksComponent', () => {
 ;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,HttpClientModule,FormsModule
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
  it("checking button working",async()=>{
    const fixture = TestBed.createComponent(StocksComponent);
    const component = fixture.componentInstance;
    const de = fixture.debugElement;
    const btn = de.query(By.css('#btnsubmit'));
    const el = de.query(By.css('#clsecond'));
    btn.triggerEventHandler('click',{});
    fixture.detectChanges();
    expect(component.stock).toEqual(el.nativeElement.innerHTML);
  });
});
