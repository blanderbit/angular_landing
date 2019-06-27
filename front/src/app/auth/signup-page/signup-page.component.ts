import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {AuthService} from 'src/app/shared/auth.service';
import {Subscription} from 'rxjs';
import {Router, ActivatedRoute} from '@angular/router';
import {SignUpService} from "../../shared/sign-up.service";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  aSup: Subscription;
  networkingErr = false;
  limits = true;
  privacy = true;


  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private signUpService: SignUpService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      privacy: [false, [Validators.required, Validators.requiredTrue]],
      limits: [false, [Validators.required, Validators.requiredTrue]],
    });
  }

  onSubmit() {
    this.aSup = this.authService.register(this.form.value)
      .subscribe(
        () => this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        }),
        err => {
          this.networkingErr = true;
          console.log(err);
        }
      );
  }

  closeSignUp() {
    this.signUpService.setEvent({signUp: false, signIn: false, top: 0});
  }

  ngOnDestroy() {
    if (this.aSup) {
      this.aSup.unsubscribe();
    }
  }

}
