import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ipublic } from 'src/app/interfaces/ipublic';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { showError, toastShow } from 'src/app/shared/shared';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  formProfile!: FormGroup;
  user!: Ipublic;
  url: string = environment.API;
  imagSrcProfile: string = 'assets/img/profile.jpg';
  errors!: string[]


  constructor(private authService: AuthenticationService, private fb: FormBuilder) { }

  ngOnInit(): void {
    // to refresh page
    // setTimeout(() => { this.ngOnInit() }, 1000 * 10)
    this.formProfile = this.fb.group({
      shop: [''],
      name: [''],
      surname: [''],
      email: [''],
      role: [''],
      statut: [''],
      password1: [''],
      password2: [''],
      password3: [''],
      phone: [''],
      mobileMoney: [''],
      image: { 'name': '', 'file': '' }
    })
    this.authService.user().subscribe(res => {
      this.user = res;
      this.formProfile = this.fb.group({
        name: res?.last_name,
        surname: res?.first_name,
        email: res?.email,
        role: res?.role,
        statut: res?.statut,
        phone: res?.phone,
        mobileMoney: res?.accountMoney,
        password1: '',
        password2: '',
        password3: '',
        image: { 'name': '', 'file': '' },
      })
      if (res?.image) {
        this.imagSrcProfile = this.url + res?.image
      }
      else {
        this.imagSrcProfile = 'assets/img/profile.jpg';
      }
    })

  }

  // preview image of pofile
  imagePreviewProfile(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imagSrcProfile = reader.result as string;

        this.formProfile.patchValue({
          image: { 'name': event.target.files[0]['name'], 'file': reader.result }
        });

      };

    }
  }

  // ****************************** to edit image profile ***********************************
  editImgProfile(user: Ipublic) {
    const data = {
      'profileImg': true,
      data: this.formProfile.getRawValue()
    }
    this.authService.editUser(user.id, data).subscribe(res => {
      toastShow('success', "Photo de profil mise à jour avec succès")
      this.errors = []
    }, (error => {
      this.errors = []
      this.errors = error.error
      showError(error, error.status, this.errors, error.error)
    }))
  }

  // ****************************** to edit information profile ***********************************
  editInformation(user: Ipublic) {
    const data = {
      'profileInfo': true,
      data: this.formProfile.getRawValue(),
    }
    this.authService.editUser(user.id, data).subscribe(res => {
      toastShow('success', "Informations mises à jour avec succès")
      this.errors = []
    }, (error => {
      this.errors = []
      this.errors = error.error
      showError(error, error.status, this.errors, error.error)
    }))
  }

  // ****************************** to edit password profile ***********************************
  editPassword(user: Ipublic) {
    const data = {
      'profilePassword': true,
      data: this.formProfile.getRawValue()
    }

    this.authService.editUser(user.id, data).subscribe(res => {
      toastShow('success', "Mot de passe mise à jour avec succès")
      this.errors = []
      this.formProfile.patchValue({
        password1: '',
        password2: '',
        password3: '',
      })
    }, (error => {
      this.errors = []
      this.errors = error.error
      showError(error, error.status, this.errors, error.error)
    }))
  }

}
