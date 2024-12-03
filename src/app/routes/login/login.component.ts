import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DarkModeService } from '@services/dark-mode.service';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, IconFieldModule, InputIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
  });
  darkModeService: DarkModeService = inject(DarkModeService);
  isRegister: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void { }

  toggleDarkMode(): void {
    this.darkModeService.updateDarkMode();
  }

  onRegisterClick(): void {
    this.isRegister = !this.isRegister;
    if (this.isRegister) {
      this.loginForm.addControl('confirmPassword', this.fb.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]));
    } else {
      this.loginForm.removeControl('confirmPassword');
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get confirmPassword() {
    return this.loginForm.get('confirmPassword');
  }

  onSubmit(): void {
    console.log('loginForm: ', this.loginForm);
    if (this.loginForm.valid) {
      console.log('Form Submitted:', this.loginForm.value);
      if (this.isRegister) {
        this.isRegister = false;
      } else {
        this.router.navigate(['/dashboard']);
      }
    } else {
      console.log('Form is invalid');
    }
  }


}
