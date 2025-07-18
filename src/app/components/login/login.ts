import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule ,CommonModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  fb=inject(FormBuilder);
  authService=inject(AuthService);
  router=inject(Router)
  loginFailed = signal(false);
  

  onLogin(){

  const {email,password} =this.loginForm.value;
  const success= this.authService.login(email,password)

    if(success){
      this.loginFailed.set(false);
      this.router.navigate(['/']);
    } else{
      this.loginFailed.set(true)
    }
  }

  loginForm:FormGroup=this.fb.group({
    email:['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)]],
    password:['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
  })

  onSubmit(){
    console.log(this.loginForm.value);

  }
}
