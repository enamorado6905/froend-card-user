import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SigninModule } from 'src/app/pages/components/auth/signin/signin.module';
import { AuthLayoutRoutes } from './auth-layout.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    HttpClientModule,
    SigninModule,
  ],
})
export class AuthLayoutModule {}
