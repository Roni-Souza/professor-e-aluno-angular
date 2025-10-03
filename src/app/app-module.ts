import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NavBarComponent } from './nav-bar-component/nav-bar-component';
import { HomeComponent } from './home-component/home-component';
import { FooterComponent } from './footer-component/footer-component';
import { DisciplinaComponent } from './disciplina-component/disciplina-component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfessorComponent } from './professor-component/professor-component';
import {  HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    App,
    NavBarComponent,
    HomeComponent,
    FooterComponent,
    DisciplinaComponent,
    ProfessorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
