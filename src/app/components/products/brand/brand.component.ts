import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ibrand } from 'src/app/interfaces/ipublic';
import { ProductsService } from 'src/app/services/products.service';
import { showError, toastShow } from 'src/app/shared/shared';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  formBrand!: FormGroup;
  imagSrcBrand: string = 'assets/img/overview.jpeg';
  allBrands!: Ibrand[];
  logoToEdit!: Ibrand;
  errors!: string[];
  url = environment.API;
  editBrand: boolean = false;
  currentPage: number = 1;
  p: number = 1;
  brandFiltering!: string;
  clicked: boolean = false;

  constructor(private fb: FormBuilder, private prodService: ProductsService) { }

  ngOnInit(): void {
    this.editBrand = false;
    this.formBrand = this.fb.group({
      title: ['', Validators.required],
      logo: { 'name': '', 'file': '' },
      description: [''],
      statut: [true]
    });

    // **********  get all Brands *************************
    this.prodService.getBrand().subscribe({
      next: (res: any) => this.allBrands = res,
    });
  }

  resetForm() {
    this.imagSrcBrand = 'assets/img/overview.jpeg';
    this.editBrand = false;;
    this.formBrand.reset();
    this.formBrand.patchValue({
      statut: true
    })
  }

  // preview image of Brand
  imagePreviewSubCat(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imagSrcBrand = reader.result as string;

        this.formBrand.patchValue({
          logo: { 'name': event.target.files[0]['name'], 'file': reader.result }
        });
        event.target.value = null

      };

    }
  }

  // *********************************** REGISTER BRAND **********************************
  registerBrand() {
    // setTimeout(() => { this.ngOnInit() }, 1000 * 10)
    this.prodService.saveBrand(this.formBrand.getRawValue()).subscribe((res: Ibrand) => {
      if (res) {
        this.clicked = false;
        this.imagSrcBrand = 'assets/img/overview.jpeg';
        this.allBrands?.unshift(res)
        toastShow('success', "Marque créée avec succès")
        this.errors = []
        this.formBrand.reset()
        this.formBrand.patchValue({
          statut: true
        })
      }
    },
      (error => {
        this.clicked = false;
        this.errors = [];
        this.errors = error.error;
        showError(error, error.status, this.errors, error.error)
      }))
  }

  // *************************** SAVE EDIT BRAND ****************************************************
  fillInfoEdit(item: Ibrand) {
    this.logoToEdit = item
    this.editBrand = true;
    this.imagSrcBrand = this.url + item?.image;
    this.formBrand.patchValue({
      title: item?.name,
      description: item?.description,
      statut: item?.statut
    })
  }

  saveEditBrand() {
    this.prodService.editBrand(this.logoToEdit['id'], this.formBrand.getRawValue()).subscribe((res: Ibrand) => {
      if (res) {
        this.allBrands = this.allBrands.filter((obj: any) => obj !== this.logoToEdit)
        this.allBrands?.unshift(res)
        this.editBrand = false;
        toastShow('success', "Marque mise à jour avec succès")
        this.errors = []
        this.formBrand.reset()
        this.imagSrcBrand = 'assets/img/overview.jpeg'
        this.formBrand.patchValue({
          statut: true
        })
      }
    },
      (error => {
        this.errors = []
        this.errors = error.error
        showError(error, error.status, this.errors, error.error)
      })
    )
  }

  activeBrand(id: number, event: any) {
    const data = {
      'statut': true,
      'stateBrand': event.target.checked
    }
    this.prodService.editBrand(id, data).subscribe(res => {
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
  deleteBrand(item: Ibrand) {
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
          this.prodService.delBrand(item['id']).subscribe(res => {
            this.allBrands = this.allBrands.filter((obj: any) => obj !== item)
            Swal.fire(
              'Supprimer!',
              item['name'] + " supprimé(e) avec succès",
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
