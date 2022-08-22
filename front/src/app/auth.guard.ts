import { Injectable } from '@angular/core';
import { UntypedFormArray } from '@angular/forms';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isUser = false;
  
  canActivate() {
    if(sessionStorage.getItem("status")=="true")
    {
    return true;
    }
    else
    {
      return false;
    }
  }

}
