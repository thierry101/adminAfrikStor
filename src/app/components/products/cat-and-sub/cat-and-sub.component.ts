import { Component, OnInit } from '@angular/core';
import { Icategory, ISubcategory } from 'src/app/interfaces/ipublic';
import { ProductsService } from 'src/app/services/products.service';
import { PublicService } from 'src/app/services/public.service';
import { showError, toastShow } from 'src/app/shared/shared';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-cat-and-sub',
  templateUrl: './cat-and-sub.component.html',
  styleUrls: ['./cat-and-sub.component.css']
})
export class CatAndSubComponent implements OnInit {

  // resetFormCat: boolean = false
  editCat: boolean = false;
  editSubCat: boolean = false;
  itemToEdit!: Icategory; //category
  subCatEdit!: ISubcategory;
  stateCat: boolean = this.publicService.changeTitleForCat;
  stateSubCat: boolean = this.publicService.changeTitleForSubCat;
  categories !: Icategory[];
  subCategories !: any[];
  url: string = environment.API;
  title!: string;
  errors!: string[];
  currentPage: number = 1;
  p: number = 1;
  page: number = 1;
  catFiltering!: string;
  subCatFiltering!: string;
  // lastPage!: number;

  constructor(private publicService: PublicService, private prodService: ProductsService) { }


  ngOnInit(): void {
    // **********  get all categories *************************
    // setTimeout(() => { this.ngOnInit() }, 1000 * 10)
    this.prodService.getCategory().subscribe({
      next: allCategories => this.categories = allCategories,
      // error: err => this.errMsg = err
    })
    // ********************** end *****************************

    // **********  get all sub categories *************************
    this.prodService.getSubCategory().subscribe({
      next: allSubCategories => this.subCategories = allSubCategories,
      // error: err => this.errMsg = err
    })
    // ********************** end *****************************
  }

  openModalCat() {
    this.stateCat = true;
    this.stateSubCat = false;
    this.editCat = false;
    this.title = "Ajouter une catégorie";
    // this.resetFormCat = true;
  }

  openModalSubCat() {
    this.stateCat = false;
    this.stateSubCat = true;
    this.editSubCat = false;
    this.title = "Ajouter une sous-catégorie"
  }
  // {
  //   next: allCategories => this.categories = allCategories,
  // }
  // /////////////////////////////////////////// BEGIN CATEGORY /////////////////////////////////////////////////////////
  //****************************** add a new created category to the table of all categories ********************* */
  addCat(cat: Icategory) {
    this.categories = this.categories.filter((obj: any) => obj !== this.itemToEdit)
    this.categories?.unshift(cat)
  }

  // ****************************** to edit category *******************************************
  editCategory(item: Icategory) {
    this.title = "Editer une catégorie"
    this.editCat = true
    this.stateCat = true;
    this.stateSubCat = false;
    this.editSubCat = false;
    this.itemToEdit = item;
  }

  // ******************************* change state of statut from the table of category *********************
  activeCategory(id: number, event: any) {
    const data = {
      'changeState': true,
      'newState': event.target.checked
    }
    this.prodService.editStateCategory(id, data).subscribe(res => {
      if (res) {
        toastShow('success', "Statut mise à jour avec succès")
      }
    },
      (error => {
        this.errors = []
        this.errors = error.error
        showError(error, error.status, this.errors, error.error)
      })
    )
  }

  // ********************************** delete category *******************************************
  deleteCategory(item: Icategory) {
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
          this.prodService.delCategory(item['id']).subscribe(res => {
            this.categories = this.categories.filter((obj: any) => obj !== item)
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
  // /////////////////////////////////////////// END CATEGORY /////////////////////////////////////////////////////////


  // /////////////////////////////////////////// BEGIN SUB-CATEGORY /////////////////////////////////////////////////////////
  //****************************** add a new created sub-category to the table of all sub-categories ********************* */
  addSubCat(subCat: ISubcategory) {
    this.subCategories = this.subCategories.filter((obj: any) => obj !== this.subCatEdit)
    this.subCategories?.unshift(subCat)
  }

  // ****************************** to edit sub-category *******************************************
  editSubCategory(item: ISubcategory) {
    this.title = "Editer une sous-catégorie"
    this.editCat = false
    this.stateCat = false;
    this.stateSubCat = true;
    this.editSubCat = true;
    this.subCatEdit = item;
  }

  // ******************************* change state of statut from the table of category *********************
  activeSubCategory(id: number, event: any) {
    const data = {
      'changeState': true,
      'newState': event.target.checked
    }
    this.prodService.editStateSubCategory(id, data).subscribe(res => {
      if (res) {
        toastShow('success', "Statut mise à jour avec succès")
      }
    },
      (error => {

      })
    )
  }

  // ********************************** delete category *******************************************
  deleteSubCategory(item: ISubcategory) {
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
          this.prodService.delSubCategory(item['id']).subscribe(res => {
            this.subCategories = this.subCategories.filter((obj: any) => obj !== item)
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

  // /////////////////////////////////////////// END SUB-CATEGORY /////////////////////////////////////////////////////////




}
