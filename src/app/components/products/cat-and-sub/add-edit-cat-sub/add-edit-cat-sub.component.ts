import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Icategory, ISubcategory } from 'src/app/interfaces/ipublic';
import { ProductsService } from 'src/app/services/products.service';
import { showError, toastShow } from 'src/app/shared/shared';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-edit-cat-sub',
  templateUrl: './add-edit-cat-sub.component.html',
  styleUrls: ['./add-edit-cat-sub.component.css']
})
export class AddEditCatSubComponent implements OnInit {

  @Input() editTheCat!: boolean;
  @Input() editTheSubCat!: boolean;
  @Input() itemCatEdit!: Icategory;
  @Input() itemSubCatEdit!: ISubcategory;
  @Input() statusCat!: boolean;
  @Input() statusSubCat!: boolean;
  @Input() resetFormCategory!: boolean;
  @Output() newCategory: EventEmitter<any> = new EventEmitter<any>();
  @Output() newSubCategory: EventEmitter<any> = new EventEmitter<any>();
  category: boolean = false;
  categories !: Icategory[];
  errors !: string[]
  // imagSrc: string = 'assets/img/overview.jpeg';
  // imagSrcSubCat: string = 'assets/img/overview.jpeg';
  url: string = environment.API;
  formCategory!: FormGroup;
  formSubCategory!: FormGroup;
  clicked: boolean = false;

  constructor(private prodService: ProductsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    // ********************* initialize the formCategory *******************
    this.formCategory = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      // logo: { 'name': '', 'file': '' },
      // description: [''],
      statut: [true]
    })

    // ********************** initialize the formSubCategory ******************
    this.formSubCategory = this.fb.group({
      category_id: ['', [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      // logo: { 'name': '', 'file': '' },
      // description: [''],
      statut: [true]
    })

    // ********************** get all categories *******************************
    this.prodService.getCategory().subscribe({
      next: allCategories => this.categories = allCategories,
      // error: err => this.errMsg = err
    })
  }

  ngOnChanges() {
    // chose witch modal to show cat or sub cat
    if (this.statusCat === true && this.statusSubCat === false) {
      this.category = true
    }
    // to show modal to add size
    else {
      this.category = false
    }
    // full modal category with information that we want to edit
    if (this.editTheCat === true) {
      // this.imagSrc = (this.itemCatEdit.image != null) ? this.url + this.itemCatEdit.image : 'assets/img/overview.jpeg';

      this.formCategory.patchValue({
        title: this.itemCatEdit['name'],
        // logo: { 'name': '', 'file': '' },
        // // description: this.itemCatEdit['description'],
        statut: this.itemCatEdit['statut']
      })
    }

    // full modal sub cat with information we want to edit
    if (this.editTheSubCat === true) {
      // this.imagSrcSubCat = (this.itemSubCatEdit.image != null) ? this.url + this.itemSubCatEdit.image : 'assets/img/overview.jpeg';
      this.formSubCategory.patchValue({
        title: this.itemSubCatEdit?.name,
        // // description: this.itemSubCatEdit?.description,
        statut: this.itemSubCatEdit?.statut,
        category_id: this.itemSubCatEdit?.category?.id,
      })
    }
  }

  // preview image of category
  // imagePreview(event: any) {
  //   const reader = new FileReader();

  //   if (event.target.files && event.target.files.length) {
  //     const [file] = event.target.files;
  //     reader.readAsDataURL(file);

  //     reader.onload = () => {

  //       // this.imagSrc = reader.result as string;

  //       this.formCategory.patchValue({
  //         // logo: { 'name': event.target.files[0]['name'], 'file': reader.result }
  //       });

  //     };

  //   }
  // }

  // preview image of subcategory
  // imagePreviewSubCat(event: any) {
  //   const reader = new FileReader();

  //   if (event.target.files && event.target.files.length) {
  //     const [file] = event.target.files;
  //     reader.readAsDataURL(file);

  //     reader.onload = () => {

  //       // this.imagSrcSubCat = reader.result as string;

  //       this.formSubCategory.patchValue({
  //         // logo: { 'name': event.target.files[0]['name'], 'file': reader.result }
  //       });

  //     };

  //   }
  // }


  // ********************** when we close modal we need to reset form category ******************
  clodeModal() {
    this.errors = []
    this.formCategory.reset()
    this.formCategory.patchValue({
      statut: true,
    })
    // this.imagSrc = 'assets/img/overview.jpeg'
  }

  // ********************** when we close modal we need to reset form sub-category ******************
  clodeModalSubCat() {
    this.errors = []
    this.formSubCategory.reset()
    this.formSubCategory.patchValue({
      statut: true,
    })
    // this.imagSrcSubCat = 'assets/img/overview.jpeg'
  }

  // ///////////////////////////////////////////// CATEGORY ////////////////////////////////////////////
  // ************************* function to add category ******************************
  addCatgory() {
    this.prodService.category(this.formCategory.getRawValue()).subscribe((res: Icategory) => {
      if (res) {
        this.clicked = false;
        this.newCategory.emit(res)
        toastShow('success', "Catégorie créée avec succès")
        this.errors = []
        this.formCategory.reset()
        this.formCategory.patchValue({
          statut: true,
        })
        // this.imagSrc = 'assets/img/overview.jpeg'
        document.getElementById("closeModalCategory")?.click()
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

  // ******************************* save edit category *********************************************
  saveEditCategory() {
    this.prodService.editCategory(this.itemCatEdit['id'], this.formCategory.getRawValue()).subscribe((res: Icategory) => {
      if (res) {
        this.clicked = false;
        this.newCategory.emit(res)
        toastShow('success', "Catégorie mise à jour avec succès")
        this.errors = []
        this.formCategory.reset()
        // this.imagSrc = 'assets/img/overview.jpeg'
        document.getElementById("closeModalCategory")?.click()
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
  // //////////////////////////////////////////////// END CATEGORY /////////////////////////////////////////////


  // /////////////////////////////////////////////////SUB CATEGORY /////////////////////////////////////////////
  addSubCatgory() {
    this.prodService.subCategory(this.formSubCategory.getRawValue()).subscribe((res: ISubcategory) => {
      if (res) {
        this.clicked = false;
        this.newSubCategory.emit(res)
        toastShow('success', "Sous-catégorie créée avec succès")
        this.errors = []
        this.formSubCategory.reset()
        this.formSubCategory.patchValue({
          statut: true,
        })
        
        // this.imagSrcSubCat = 'assets/img/overview.jpeg'
        document.getElementById("closeModalSubCategory")?.click()
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

  // ******************************* save edit sub-category *********************************************
  saveEditSubCategory() {
    this.prodService.editSubCategory(this.itemSubCatEdit['id'], this.formSubCategory.getRawValue()).subscribe((res: Icategory) => {
      if (res) {
        this.clicked = false;
        this.newSubCategory.emit(res)
        toastShow('success', "Sous-catégorie mise à jour avec succès")
        this.errors = []
        this.formSubCategory.reset()
        // this.imagSrcSubCat = 'assets/img/overview.jpeg'
        document.getElementById("closeModalSubCategory")?.click()
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
  // ///////////////////////////////////////////////END SUB CATEGORY /////////////////////////////////////////////

}
