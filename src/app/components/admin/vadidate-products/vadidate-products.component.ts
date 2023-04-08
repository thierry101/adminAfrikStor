import { Component, OnInit } from '@angular/core';
import { Iproduct } from 'src/app/interfaces/ipublic';
import { ProductsService } from 'src/app/services/products.service';
import { showError, toastShow } from 'src/app/shared/shared';

@Component({
  selector: 'app-vadidate-products',
  templateUrl: './vadidate-products.component.html',
  styleUrls: ['./vadidate-products.component.css']
})
export class VadidateProductsComponent implements OnInit {
  products !: Iproduct[];
  product !: Iproduct;
  errors!: string[];
  otherImagSrcProduct: any[] = [];
  colorImagSrcProduct: any[] = [];
  sizes: any[] = [];
  colors: any[] = [];
  textRejet: string = '';
  productValid!: boolean;
  validFiltering!: string;
  currentPage: number = 1;
  p: number = 1;
  clicked: boolean = false;

  constructor(private prodService: ProductsService) { }

  ngOnInit(): void {
    // setTimeout(() => { this.ngOnInit() }, 1000 * 10)
    this.prodService.getProductValidation().subscribe(res => {
      this.products = res
    },
      (error => {
        this.errors = []
        this.errors = error.error
        showError(error, error.status, this.errors, error.error)
      })
    )
  }

  validateProduct(item: any) {
    this.product = item
    let otherImgs = item?.tabOtherImgs
    let colors = item?.colors
    let colorImgs = item?.colorimgs
    this.sizes = item?.sizes
    if (otherImgs) {
      this.otherImagSrcProduct = JSON.parse(otherImgs);
    }

    if (colors) {
      this.colors = JSON.parse(colors)
    }

    if (colorImgs.length > 0) {
      this.colorImagSrcProduct = JSON.parse(colorImgs);
    }
  }

  reserModal() {
    this.textRejet = '';
  }

  sendStatutValidate(item: any, event: any) {
    let stateValidate = event.target.value
    if (stateValidate === 'true') {
      this.productValid = true
    } else {
      this.productValid = false
    }
    let data = {
      "user": item?.user,
      "text": this.textRejet,
      'article': item?.title,
      'productValid': this.productValid
    }
    this.prodService.validateProd(item?.id, data).subscribe(res => {
      if (res != 'false') {
        this.clicked = false;
        this.products = this.products.filter((obj: any) => obj !== item)
        this.products?.unshift(res)
        toastShow('success', 'Article validé')
        document.getElementById('closeModalProduct')?.click()
      } else {
        this.clicked = false;
        toastShow('success', 'Message envoyé avec succès')
        document.getElementById('modalProdRejet')?.click()
      }
    },
      (error => {
        this.clicked = false;
        this.errors = []
        this.errors = error.error
        showError(error, error.status, this.errors, error.error)
      }))
  }

}
