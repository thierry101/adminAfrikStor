import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Iadvert, Ibrand } from 'src/app/interfaces/ipublic';
import { ProductsService } from 'src/app/services/products.service';
import { PublicService } from 'src/app/services/public.service';
import { showError, toastShow } from 'src/app/shared/shared';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-advertising',
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.css']
})
export class AdvertisingComponent implements OnInit {
  allBrands!: Ibrand[];
  allAdverts!: Iadvert[];
  errors!: string[];
  formAdvertising !: FormGroup;
  imagSrcAdvert: string = 'assets/img/overview.jpeg';
  editOrNot: boolean = false;
  url = environment.API;
  itemEdit!: Iadvert;
  advertFiltering!: string;
  currentPage: number = 1;
  p: number = 1;
  clicked: boolean = false;

  constructor(private fb: FormBuilder, private prodService: ProductsService,
    private pubService: PublicService) { }


  ngOnInit(): void {
    // setTimeout(() => { this.ngOnInit() }, 1000 * 10)
    this.formAdvertising = this.fb.group({
      title: ['', [Validators.required]],
      brand_id: ['', Validators.required],
      beginDate: ['', Validators.required],
      endDate: ['', Validators.required],
      banner: { 'name': '', 'file': '' },
      statut: [true]
    })
    // **********  get all Brands *************************
    this.prodService.getBrand().subscribe({
      next: (res: any) => this.allBrands = res,
    });

    // **********  get all adverts *************************
    this.pubService.getAdverts().subscribe({
      next: (res: any) => this.allAdverts = res,
    });
  }


  // preview image of Brand
  imagePreviewAdvert(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imagSrcAdvert = reader.result as string;

        this.formAdvertising.patchValue({
          banner: { 'name': event.target.files[0]['name'], 'file': reader.result }
        });
        event.target.value = null

      };

    }
  }

  resetForm() {
    this.editOrNot = false;
    this.formAdvertising.reset();
    this.imagSrcAdvert = 'assets/img/overview.jpeg';
    this.formAdvertising.patchValue({
      statut: true
    })
  }

  saveAdvert() {
    this.pubService.advert(this.formAdvertising.getRawValue()).subscribe(res => {
      this.clicked = false;
      toastShow('success', "Publicité créée avec succès")
      this.allAdverts.unshift(res)
      this.formAdvertising.reset();
      this.formAdvertising.patchValue({
        statut: true
      })
      this.imagSrcAdvert = 'assets/img/overview.jpeg';
    },
      (error => {
        this.clicked = false;
        this.errors = []
        this.errors = error.error
        showError(error, error.status, this.errors, error.error)
      }))
  }

  fillEditItem(item: Iadvert) {
    this.editOrNot = true;
    this.itemEdit = item;
    this.imagSrcAdvert = this.url + item['img']
    this.formAdvertising.patchValue({
      title: item['title'],
      brand_id: item['brand']['id'],
      beginDate: item['begin_date'],
      endDate: item['end_date'],
      banner: { 'name': '', 'file': '' },
      statut: item['statut'],
    })
  }

  editAdvert() {
    const data = {
      'state': true,
      'data': this.formAdvertising.getRawValue()
    }
    this.pubService.editadvert(this.itemEdit['id'], data).subscribe(res => {
      this.clicked = false;
      this.editOrNot = false;
      this.allAdverts = this.allAdverts.filter((obj: any) => obj !== this.itemEdit)
      this.allAdverts.unshift(res)
      toastShow('success', "Publicité mise à jour avec succès")
      this.errors = []
      this.formAdvertising.reset();
      this.formAdvertising.patchValue({
        statut: true
      })
      this.imagSrcAdvert = 'assets/img/overview.jpeg';
    },
      (error => {
        this.clicked = false;
        this.errors = []
        this.errors = error.error
        showError(error, error.status, this.errors, error.error)
      }))
  }

  activeAdvert(id: number, event: any) {
    const data = {
      'statut': true,
      'stateAdvert': event.target.checked
    }
    this.pubService.editadvert(id, data).subscribe(res => {
      if (res) {
        toastShow('success', "Statut changé avec succès")
        this.errors = []
      }
    },
      (error => {
        this.errors = []
        this.errors = error.error
        showError(error, error.status, this.errors, error.error)
      }))
  }


  // *************************** DELETE USER **************************************************
  deleteAdvert(item: Iadvert) {
    if (item) {
      Swal.fire({
        title: 'Êtes-vous sûr de vouloir supprimer?',
        // text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui!',
        cancelButtonText: 'Non'
      }).then((result) => {
        if (result.isConfirmed) {
          this.pubService.delAdvert(item['id']).subscribe(res => {
            this.allAdverts = this.allAdverts.filter((obj: any) => obj !== item)
            Swal.fire(
              'Supprimer!',
              item['title'] + " supprimé(e) avec succès",
              'success'
            )
          },
            (error => {
              this.errors = []
              this.errors = error.error
              showError(error, error.status, this.errors, error.error)
            })
          )
        }
      })
    }
  }



}
