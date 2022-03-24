import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
  ordersForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.ordersForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remeber: ['', Validators.required]
    });
  }
  get f() { return this.ordersForm.controls; }
  error: any
  onSubmit() {
    this.submitted = true;
    if (this.ordersForm.invalid) {
      return;
    }
    this.loading = true;
    if (this.f.username.value == 'user@navtech.com' && this.f.password.value == 'User@123' && this.f.remeber.value == true) {
      this.router.navigate(['/orders']);
    }
    else {
      this.error = 'UserName or Password is incorrect'
    }
  }
}
