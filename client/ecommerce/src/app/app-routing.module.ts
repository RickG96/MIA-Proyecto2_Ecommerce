import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { LandingComponent } from './landing/landing.component';
import { SignupComponent } from './signup/signup.component';
import { OptionsComponent } from './options/options.component';
import { MyproductsComponent } from './myproducts/myproducts.component';
import { FeedComponent } from './feed/feed.component';
import { ProductComponent } from './product/product.component'


const routes: Routes = [
  {path: 'login', component: SigninComponent},
  {path: 'home', component: LandingComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'settings', component: OptionsComponent},
  {path: 'myproducts', component: MyproductsComponent},
  {path: 'feed', component: FeedComponent},
  {path: 'product', component: ProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
