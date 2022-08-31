import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StocksComponent } from './stocks/stocks.component';

const routes: Routes = [
{
  path:'stock',
  component:StocksComponent,
  canActivate:[AuthGuard]

},
{
  path:'',
  component:LoginComponent
},
{
  path:'signup',
  component:SignupComponent
},
{
  path:'**',
  component:LoginComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
