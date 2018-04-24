import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { AlertsModule } from 'angular-alert-module';
import { CanvasComponent } from './canvas/canvas/canvas.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AppRoutingModule } from './app.routing.module';
import { MainboardComponent } from './mainboard/mainboard.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    LoginComponent,
    NavigationComponent,
    MainboardComponent

  ],
  imports: [
    //NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    AlertsModule.forRoot(),
    AppRoutingModule,

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
