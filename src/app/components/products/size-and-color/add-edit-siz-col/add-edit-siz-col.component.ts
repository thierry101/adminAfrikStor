import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Isize } from 'src/app/interfaces/ipublic';
import { ProductsService } from 'src/app/services/products.service';
import { showError, toastShow } from 'src/app/shared/shared';

@Component({
  selector: 'app-add-edit-siz-col',
  templateUrl: './add-edit-siz-col.component.html',
  styleUrls: ['./add-edit-siz-col.component.css']
})
export class AddEditSizColComponent implements OnInit {

  @Input() statusSize!: boolean;
  @Input() editSize!: boolean;
  // @Input() statusCol!: boolean;
  // @Input() editColor!: boolean;
  @Input() itemSizeEdit!: Isize;
  @Output() newSize: EventEmitter<any> = new EventEmitter<any>();
  color: boolean = false;
  errors!: string[];
  formSize!: FormGroup;
  formColor!: FormGroup;
  showColor!: string;
  clicked: boolean = false;

  constructor(private fb: FormBuilder, private prodService: ProductsService) { }

  ngOnInit(): void {
    this.formSize = this.fb.group({
      name: ['', [Validators.required]],
      statut: [true]
    });

    this.formColor = this.fb.group({
      name: ['', Validators.required],
      code: ['', [Validators.required]],
      statut: [true],
    })

  }

  ngOnChanges() {
    // ********************* full the modal of size that we want to edit ***************************
    if (this.editSize) {
      this.formSize.patchValue({
        name: this.itemSizeEdit?.name,
        statut: this.itemSizeEdit?.statut
      })
    }
  }

  // ////////////////////////////////////////////////////////// ABOUT SIZE //////////////////////////////////////
  // ********************** when we close modal we need to reset form category ******************
  clodeModal() {
    this.errors = []
    this.formSize.reset()
    this.formSize.patchValue({
      statut: true
    })
  }

  addSize() {
    this.prodService.size(this.formSize.getRawValue()).subscribe(
      (res: Isize) => {
        this.clicked = false;
        this.newSize.emit(res)
        toastShow('success', "Taille ajouté avec succès")
        this.errors = []
        this.formSize.reset()
        this.formSize.patchValue({
          statut: true
        })
        document.getElementById("closeModalSize")?.click()
      },
      (error) => {
        this.clicked = false;
        this.errors = []
        this.errors = error.error
        showError(error, error.status, this.errors, error.error)
      }
    )
  }

  editTheSize() {
    this.prodService.editSize(this.itemSizeEdit['id'], this.formSize.getRawValue()).subscribe((res: Isize) => {
      if (res) {
        this.clicked = false;
        this.newSize.emit(res)
        toastShow('success', "Taille mise à jour avec succès")
        this.errors = []
        this.formSize.reset()
        document.getElementById("closeModalSize")?.click()
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
  // ////////////////////////////////////////////////////////// END SIZE //////////////////////////////////////


  // ////////////////////////////////////////////////////////// ABOUT COLOR //////////////////////////////////////
  showColorBackground() {
    this.showColor = this.formColor.get('code')?.value
  }

  // ////////////////////////////////////////////////////////// END COLOR //////////////////////////////////////

}
