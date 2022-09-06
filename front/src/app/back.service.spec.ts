import { TestBed } from '@angular/core/testing';
import { BackService } from "./back.service";
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
describe("BackService", () => {
  let service: BackService;
  let httpmock : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(BackService);
    httpmock = TestBed.inject(HttpTestingController);
  });
  
  it("should make a get request when /user is called",()=>{
    const dummyemail = "bhavimdell16@gmail.com";
    const dummystock = "IBM";
    const dummyqty = "10";
    const dummyinvested = "1000"
    service.adduser(dummyemail,dummystock,dummyqty,dummyinvested).subscribe(()=>{});
    const req = httpmock.expectOne('http://localhost:3000/user');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({id:dummyemail,stockname:dummystock,qty:dummyqty,invested:dummyinvested})
  });

});
