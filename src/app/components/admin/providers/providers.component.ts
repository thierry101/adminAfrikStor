import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ibrand, Iprovider } from 'src/app/interfaces/ipublic';
import { ProductsService } from 'src/app/services/products.service';
import { PublicService } from 'src/app/services/public.service';
import { showError, toastShow } from 'src/app/shared/shared';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css'],
})
export class ProvidersComponent implements OnInit {

  title !: string;
  formProvider!: FormGroup;
  providers!: any;
  errors!: string[];
  editProvider: boolean = true;
  itemToEdit!: any;
  brands!: Ibrand[];
  providerFiltering!: string;
  currentPage: number = 1;
  p: number = 1;
  imagSrc: string = 'assets/img/overview.jpeg';
  url: string = environment.API;

  constructor(private fb: FormBuilder, private publicService: PublicService,
    private productService: ProductsService) { }

  ngOnInit(): void {
    // setTimeout(() => { this.ngOnInit() }, 1000 * 10)
    this.formProvider = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      state: ['Selectionner', [Validators.required]],
      product_name: ['', [Validators.required]],
      image: { 'name': '', 'file': '' },
      enterprise: ['', [Validators.required]],
      statut: [true,],
    });

    this.publicService.getProviders().subscribe(res => {
      this.providers = res
    })

    this.productService.getBrand().subscribe(res => {
      this.brands = res
    })

  }

  // preview image of product
  imagePreview(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imagSrc = reader.result as string;

        this.formProvider.patchValue({
          image: { 'name': event.target.files[0]['name'], 'file': reader.result }
        });

      };

    }
  }

  addProvider() {
    this.title = "Ajouter un fournisseur";
    this.imagSrc = 'assets/img/overview.jpeg';
    this.editProvider = false;
    this.formProvider.reset()
    this.formProvider.patchValue({
      statut: true,
    })
    this.errors = []
  }


  // // **************************************** to save provider ***********************************
  // saveProvider() {
  //   this.publicService.provider(this.formProvider.getRawValue()).subscribe((res: Iprovider) => {
  //     this.providers?.unshift(res)
  //     toastShow('success', "Fournisseur ajouté avec succès")
  //     this.errors = []
  //     this.imagSrc = 'assets/img/overview.jpeg';
  //     this.formProvider.reset()
  //     this.formProvider.patchValue({
  //       statut: true,
  //     })

  //   }, (error => {
  //     this.errors = []
  //     this.errors = error.error
  //     showError(error, error.status, this.errors, error.error)
  //   }))
  // }

  // ******************************************* fill information to edit provider *************************
  fillInfoToEdit(provider: Iprovider) {
    this.editProvider = true
    this.itemToEdit = provider;
    this.imagSrc = (provider.image != null) ? this.url + provider?.image : 'assets/img/overview.jpeg';
    this.errors = [];
    this.title = "Modifier les informations de : " + provider?.entreprise
    this.formProvider.patchValue({
      name: provider?.name,
      surname: provider?.surname,
      email: provider?.email,
      product_name: provider?.name_product,
      country: provider?.country,
      city: provider?.city,
      phone: provider?.phone,
      state: provider?.state,
      enterprise: provider?.entreprise,
      statut: provider?.statut,
      brand: this.itemToEdit?.brand.id,
    })
  }

  // ********************************** change state of provider *********************************
  changeStateProvider(item: Iprovider, eve: any) {
    const data = {
      'state': true,
      data: eve?.target.value
    }

    this.publicService.editProvider(item['id'], data).subscribe(res => {
      toastShow('success', "Etat mises à jour avec succès")
      this.errors = []
    },
      (error => {
        this.errors = []
        this.errors = error.error
        showError(error, error.status, this.errors, error.error)
      }))
  }

  // ********************************** change statut of provider *********************************
  changeStatutProvider(item: Iprovider, eve: any) {
    const data = {
      'statut': true,
      data: eve?.target.checked
    }

    this.publicService.editProvider(item['id'], data).subscribe(res => {
      toastShow('success', "Statut mises à jour avec succès")
      this.errors = []
    },
      (error => {
        this.errors = []
        this.errors = error.error
        showError(error, error.status, this.errors, error.error)
      }))
  }


  // ******************************** edit provider ***********************************
  editInfoProvider() {
    const data = {
      'other': true,
      data: this.formProvider.getRawValue()
    }
    this.publicService.editProvider(this.itemToEdit?.id, data).subscribe((res: Iprovider) => {
      if (res) {
        this.providers = this.providers.filter((obj: any) => obj !== this.itemToEdit)
        this.providers?.unshift(res)
        toastShow('success', "Fournisseur mis à jour avec succès")
        this.errors = []
        this.formProvider.reset()
        document.getElementById("closeModalProvider")?.click()
      }
    },
      (error => {
        this.errors = []
        this.errors = error.error
        showError(error, error.status, this.errors, error.error)
      }))
  }


  // ********************************** delete provider *******************************************
  deleteProvider(item: Iprovider) {
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
          this.publicService.delProvider(item['id']).subscribe(res => {
            this.providers = this.providers.filter((obj: any) => obj !== item)
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
