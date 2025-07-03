import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  fb=inject(FormBuilder);

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
