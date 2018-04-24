import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { MainboardComponent } from './mainboard/mainboard.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [ 
// {path: '', redirectTo: 'snapshot', pathMatch: 'full'},
{ path: 'mainboard', component: MainboardComponent},
// ,canLoad: [AuthGuardService]
 { path: 'login', component: LoginComponent},
// {path: '**', component: SnapshotComponent }

];

@NgModule({
  imports: [
      
      RouterModule.forRoot(appRoutes)
    ],
  exports: [RouterModule],
  providers: [
  ]
})
export class AppRoutingModule {

}