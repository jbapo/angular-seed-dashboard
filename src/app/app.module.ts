import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { rootRouterConfig } from './app.routes';
import { AppCommonModule } from "./components/common/app-common.module";
import { AppComponent } from './app.component';

import { RoutePartsService } from './services/route-parts/route-parts.service';
import { NavigationService } from "./services/navigation/navigation.service";
import { AuthService } from './services/auth/auth.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from "./services/auth/auth.interceptor";


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppCommonModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false })
  ],
  declarations: [AppComponent],
  providers: [
    RoutePartsService, 
    NavigationService, 
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }