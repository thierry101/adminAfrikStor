import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PublicService } from 'src/app/services/public.service';
import { showError, toastShow } from 'src/app/shared/shared';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  formSetting!: FormGroup;
  imagSrcLogo: string = 'assets/img/logo.png';
  imagSrcFav: string = 'assets/img/logo.png';
  url: string = environment.API;
  errors!: string[];
  clicked: boolean = false;


  constructor(private publicService: PublicService, private fb: FormBuilder) { }

  ngOnInit(): void {
    // setTimeout(() => { this.ngOnInit() }, 1000 * 10)
    this.formSetting = this.fb.group({
      fav_icon: [{ 'name': '', 'file': '' }],
      logo: [{ 'name': '', 'file': '' }],
      phone: [''],
      mtnMoney: [''],
      orangeMoney: [''],
      email: [''],
      localisation: [''],
      link_whatsapp: [''],
      link_facebook: [''],
      link_messenger: [''],
    })
    this.publicService.getSettingSite().subscribe(res => {
      this.imagSrcLogo = this.url + res?.logo
      this.imagSrcFav = this.url + res?.fav_icon
      this.formSetting = this.fb.group({
        email: res?.email,
        phone: res?.phone,
        mtnMoney: res?.mtnMoney,
        orangeMoney: res?.orangeMoney,
        localisation: res?.localisation,
        link_whatsapp: res?.link_whatsapp,
        link_facebook: res?.link_facebook,
        link_messenger: res?.link_messenger,
        logo: { 'name': '', 'file': '' },
        fav_icon: { 'name': '', 'file': '' },
      })
    })
  }

  // preview image of logo
  imagePreviewLogo(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imagSrcLogo = reader.result as string;

        this.formSetting.patchValue({
          logo: { 'name': event.target.files[0]['name'], 'file': reader.result }
        });

      };

    }
  }

  // preview image of fav-icon
  imagePreviewFavIco(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imagSrcFav = reader.result as string;

        this.formSetting.patchValue({
          fav_icon: { 'name': event.target.files[0]['name'], 'file': reader.result }
        });

      };

    }
  }

  // ****************************** to edit information profile ***********************************
  editInformationSite() {
    const data = {
      'profileInfo': true,
      data: this.formSetting.getRawValue()
    }
    this.publicService.settingSite(data).subscribe(res => {
      toastShow('success', "Informations mises à jour avec succès")
      this.clicked = false;
      this.errors = []

    }, (error => {
      this.clicked = false;
      this.errors = []
      this.errors = error.error
      showError(error, error.status, this.errors, error.error)
    }))
  }

  // ****************************** to edit information profile ***********************************
  editLogoSite() {
    const data = {
      'siteLogo': true,
      data: this.formSetting.getRawValue()
    }
    this.publicService.settingSite(data).subscribe(res => {
      toastShow('success', "Logo mise à jour avec succès")
      this.clicked = false;
      this.errors = []
    }, (error => {
      this.clicked = false;
      this.errors = []
      this.errors = error.error
      showError(error, error.status, this.errors, error.error)
    }))
  }

  // ****************************** to edit information profile ***********************************
  editFavIcoSite() {
    const data = {
      'siteFavIco': true,
      data: this.formSetting.getRawValue()
    }
    this.publicService.settingSite(data).subscribe(res => {
      toastShow('success', "Fav-icon mise à jour avec succès")
      this.clicked = false;
      this.errors = []
    }, (error => {
      this.clicked = false;
      this.errors = []
      this.errors = error.error
      showError(error, error.status, this.errors, error.error)
    }))

  }

}
