import { Component, OnInit } from '@angular/core';
import { Iproduct } from 'src/app/interfaces/ipublic';
import { ProductsService } from 'src/app/services/products.service';
import { showError, toastShow } from 'src/app/shared/shared';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  title!: string;
  event!: any;
  itemEdit!: Iproduct;
  editProduct: boolean = false;
  userProducts: Iproduct[] = [];
  rejectsProducts: Iproduct[] = [];
  productFiltering!: string;
  errors!: string[];
  currentPage: number = 1;
  p: number = 1;

  constructor(private prodService: ProductsService) { }

  ngOnInit(): void {
    // ********************************** get all products for the current user ********************
    // setTimeout(() => { this.ngOnInit() }, 1000 * 10)
    this.prodService.getProducts().subscribe((res: any) => {
      this.userProducts = res?.validsProd

    })
  }


  openModalProduct(event: any) {
    this.title = "Ajouter un article";
    this.editProduct = false;
    this.event = event
  }

  editItem(item: Iproduct) {
    this.title = "Editer l'article " + item['title'];
    this.editProduct = true;
    this.itemEdit = item;
  }

  //****************************** add a new created category to the table of all categories ********************* */
  addNewProduct(prod: Iproduct) {
    this.userProducts = this.userProducts.filter((obj: any) => obj !== this.itemEdit)
    this.userProducts?.unshift(prod)
  }


  // *************************** edit state of product ******************************************
  changeStateProduct(id: number, event: any) {
    const data = {
      'statut': true,
      'value': event.target.checked
    }
    this.prodService.editProduct(id, data).subscribe(res => {
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
  deleteProduct(item: any) {
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
          this.prodService.delProduct(item['id']).subscribe(res => {
            this.userProducts = this.userProducts.filter((obj: any) => obj !== item)
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
