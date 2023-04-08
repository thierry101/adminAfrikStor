import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { showError, SwallModal } from 'src/app/shared/shared';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin !: FormGroup;
  formSeller!: FormGroup;
  errors !: string[];
  email!: string;
  cls!: string;
  message!: string;
  clicked: boolean = false;
  public invalidLogin: boolean = false;

  constructor(private router: Router,
    private elementRef: ElementRef, private fb: FormBuilder,
    private authService: AuthenticationService) { }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = 'darkcyan';
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: [''],
      password: ['']
    });
    this.formSeller = this.fb.group({
      nameShop: [''],
      last_name: [''],
      first_name: [''],
      email: [''],
      type: ['Vendeur'],
      phone: [''],
      moneyPhone: [''],
      password: [''],
      password_confirm: [''],
      country: [''],
      city: [''],
      approve: [false],
    })
  }

  // to login user
  loginUser() {
    this.authService.login(this.formLogin.getRawValue()).subscribe((res: any) => {
      if (res) {
        this.clicked = false;
        window.localStorage.setItem('authToken', res['token']);
        window.localStorage.setItem('refresh_token', res['refresh_token']);
        var decoded = jwt_decode(res['token']);
        this.invalidLogin = false;
        if (Object(decoded)['role'] === 'Admin' || Object(decoded)['role'] === 'Root') {
          this.router.navigate(["/dashboard"])
            .then(() => {
              window.location.reload()
            })
        }
        else if (Object(decoded)['role'] === 'Validator') {
          this.router.navigate(['product/validation'])
            .then(() => {
              window.location.reload()
            })
        }
        else {
          this.router.navigate(['/product'])
            .then(() => {
              window.location.reload()
            })
        }
      }
    },
      // window.location.reload()
      (error => {
        this.clicked = false;
        this.errors = []
        this.errors = error.error
        this.invalidLogin = true;
        showError(error, error.status, this.errors, error.error)
      })
    )
  }

  // to lauch modal forgot password
  lauchModalForgot() {
    this.email = ''
    this.errors = []
  }

  // to send the link to reset password
  resetPassord() {
    this.authService.forgot({ 'email': this.email }).subscribe((res: any) => {
      if (res['message'] === 'success') {
        SwallModal('success', 'Email envoyé avec succès', "Un lien a été envoyé  à l'adresse " + ' ' + this.email + ' ' +
          "pour la réinitialisation de votre mot de passe")
        this.clicked = false;
        document.getElementById("closeModalForgot")?.click()
        this.email = ''

      }
    },
      (error => {
        this.clicked = false;
        this.errors = []
        this.errors = error.error
        showError(error, error.status, this.errors, error.error)
      })
    )
  }


  // *************************** REGISTER SELLER ****************************************
  registerSeller() {
    this.authService.registerSeller(this.formSeller.getRawValue()).subscribe((res) => {
      if (res['message'] === 'success') {
        this.formSeller.reset();
        SwallModal('success', 'Confirmez votre email', 'Veuillez consulter votre boite mail pour activer votre compte')
        this.clicked = false;
        document.getElementById("closeModalRegister")?.click();
        this.formSeller.patchValue({
          type: 'Vendeur',
          'approve': false
        })
        this.errors = []
      }
    },
      (error => {
        this.clicked = false;
        this.errors = []
        this.errors = error.error
        showError(error, error.status, this.errors, error.error)
      })
    )
  }

  // ************************ clear error when i click register account *******************
  clearError() {
    this.errors = [];
    this.formSeller.reset();
    this.formSeller.patchValue({
      type: 'Vendeur',
      'approve': false
    })
  }

}
