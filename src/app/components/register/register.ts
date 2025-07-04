import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';
import { AuthService } from '../../services/auth-service/auth-service';
import { User } from '../../models/user';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  fb=inject(FormBuilder);
  authService=inject(AuthService);
  private router=inject(Router);

  rememberMe = signal(false);

  onRegister(){
    if(this.registerForm.invalid) return;

    const {userName , email ,password} =this.registerForm.value;

    const newUser:User={
      username:userName,
      email,
      password
    };

    this.authService.register(newUser)
    this.router.navigate(['/login'])
  }

  registerForm:FormGroup= this.fb.group({
    userName:['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_]{4,15}$/) ]],
    email:['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)]],
    password:['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    confirmPassword:['',[Validators.required]]
  },
{validators:confirmPasswordValidator('password','confirmPassword')})

  onSubmit(){
    console.log(this.registerForm.value);
  }
}
