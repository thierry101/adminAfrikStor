import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { showError, SwallModal } from 'src/app/shared/shared';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  formSetPassword!: FormGroup;
  errors!: string[]

  constructor(private elementRef: ElementRef, private fb: FormBuilder, private router: Router,
    private authService: AuthenticationService, private activatedRoute: ActivatedRoute) { }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = 'darkcyan';
  }

  ngOnInit(): void {
    this.formSetPassword = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirm: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  createNewPassword() {
    const formData = this.formSetPassword.getRawValue();
    const data = {
      ...formData,
      token: this.activatedRoute.snapshot.params['token'] //'token' will be write like in the app.routing
    }
    this.authService.reset(data).subscribe((res: any) => {
      if (res['message'] === 'success') {
        SwallModal('success', 'Mot de passe changé', 'Votre mot de passe a été changé avec succès')
        this.router.navigate(['/login'])
      }
    },
      (error => {
        this.errors = []
        this.errors = error.error
        showError(error, error.status, this.errors, error.error)
      })
    )
  }

}
