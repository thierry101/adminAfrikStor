import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ibrand, Icategory, Icolor, Iproduct, Isize, ISubcategory } from 'src/app/interfaces/ipublic';
import { ProductsService } from 'src/app/services/products.service';
import { showError, SwallModal, toastShow } from 'src/app/shared/shared';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {

  @Input() itemEdit!: Iproduct;
  @Input() editOrNot !: boolean;
  @Input() events!: any;
  @Output() newProduct: EventEmitter<any> = new EventEmitter<any>();
  formProduct!: FormGroup;
  showVariation: boolean = false;
  selectVariationColor: boolean = false
  selectVariationSize: boolean = false
  title!: string;
  categories !: Icategory[];
  subCategories !: ISubcategory[];
  brands!: Ibrand[];
  allColors!: Icolor[];
  allSizes!: Isize[];
  imagSrcProduct: string = 'assets/img/overview.jpeg';
  imagSecondSrcProduct: string = 'assets/img/overview.jpeg';
  otherImagSrcProduct: any[] = [];
  colorImagSrcProduct: any[] = [];
  colorForImg: any = [];
  errors!: string[];
  clicked: boolean = false;
  // base64String!: string;
  // sizesForVariation: any = [];
  // tableColorVariation: any = []; //table containt all product that variate with the color
  // tableSizeVariation: any = []; // table containt all product that variate with the size
  // srcimgColorVariation: string = 'assets/img/overview.jpeg';

  constructor(private prodService: ProductsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formProduct = this.fb.group({
      category_id: ['Select', [Validators.required]],
      sub_category_id: ['Choisir une sous-catégorie', [Validators.required]],
      brand_id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      sold_price: [''],
      mainIMg: [{ 'name': '', 'file': '' }, [Validators.required]],
      secondIMg: [{ 'name': '', 'file': '' }, [Validators.required]],
      tableOtherImg: [[], Validators.required],
      tableColorImg: [[], Validators.required],
      colors: [[]],
      sizes: [[]],
      description: ['', [Validators.required]],
      colorSelected: ['Choisir une couleur'],
      available: [true],
      // variationChoice: [false,],
      // colors_variation: [[]],
      // sizes_variation: [[]],
      // idSize_variation: ['Choisir une taille'],
      // priceSizeVariation: [''],
      // priceColorVariation: [''],
      // imgcolorProductVariation: [{ 'name': '', 'file': '' }],
      // imgsizeProductVariation: [{ 'name': '', 'file': '' }],
    });

  }


  ngOnChanges() {
    this.errors = []
    this.imagSrcProduct = 'assets/img/overview.jpeg';
    this.imagSecondSrcProduct = 'assets/img/overview.jpeg';
    this.otherImagSrcProduct = [];
    this.colorImagSrcProduct = [];
    this.formProduct?.patchValue({
      category_id: 'Select',
      sub_category_id: 'Choisir une sous-catégorie',
      brand_id: '',
      name: '',
      price: '',
      sold_price: '',
      mainIMg: { 'name': '', 'file': '' },
      secondIMg: { 'name': '', 'file': '' },
      tableOtherImg: [],
      tableColorImg: [],
      colors: [],
      sizes: [],
      description: '',
      colorSelected: 'Choisir une couleur',
      available: true,

    });

    if (this.editOrNot == true) {
      let otherImgs = this.itemEdit?.tabOtherImgs
      let colorImgs = this.itemEdit?.colorimgs
      let colors = this.itemEdit?.colors
      // console.log('this states is ', colorImgs)
      this.errors = []
      this.imagSrcProduct = environment.API + this.itemEdit?.mainImg;
      this.imagSecondSrcProduct = environment.API + this.itemEdit?.secondImg;
      if (colors) {
        this.colorForImg = JSON.parse(colors)
      }
      if (otherImgs) {
        this.otherImagSrcProduct = JSON.parse(otherImgs);
      }
      if (colorImgs.length > 0) {
        this.colorImagSrcProduct = JSON.parse(colorImgs);
      }
      this.formProduct?.patchValue({
        category_id: this.itemEdit?.category.id,
        sub_category_id: this.itemEdit?.subCategory.id,
        brand_id: this.itemEdit?.brand.id,
        name: this.itemEdit['title'],
        price: this.itemEdit?.price,
        sold_price: this.itemEdit?.sold_price,
        mainIMg: { 'name': '', 'file': '' },
        secondIMg: { 'name': '', 'file': '' },
        tableOtherImg: [],
        tableColorImg: [],
        colors: this.colorForImg,
        sizes: this.itemEdit?.sizes,
        description: this.itemEdit?.description,
        colorSelected: 'Choisir une couleur',
        available: this.itemEdit?.availability,

      });

    }


    // ********************** get all categories *******************************
    this.prodService.getCategory().subscribe({
      next: allCategories => this.categories = allCategories,
      // error: err => this.errMsg = err
    });

    // ********************** get all sub-categories *******************************
    this.prodService.getSubCategory().subscribe({
      next: allSubCategories => this.subCategories = allSubCategories,
      // error: err => this.errMsg = err
    });

    // ********************** get all brands *******************************
    this.prodService.getBrand().subscribe({
      next: allBrands => this.brands = allBrands,
      // error: err => this.errMsg = err
    })

    // *****************************get all colors ***************************** 
    this.prodService.getColors().subscribe((res: any) => {
      this.allColors = res?.colors
    });

    // *****************************get all sizes ***************************** 
    this.prodService.getSize().subscribe((res: any) => {
      this.allSizes = res
    })


  }


  // ***************************** preview main image of product ************************************
  imagePreview(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imagSrcProduct = reader.result as string;

        this.formProduct.patchValue({
          mainIMg: { 'name': event.target.files[0]['name'], 'file': reader.result }
        });
        event.target.value = null
      };

    }
  }

  // ***************************** preview second main image of product ************************************
  imagePreviewsecond(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imagSecondSrcProduct = reader.result as string;

        this.formProduct.patchValue({
          secondIMg: { 'name': event.target.files[0]['name'], 'file': reader.result }
        });
        event.target.value = null
      };

    }
  }



  // ***************************** preview color image of product ************************************
  imageColorPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      var fileAmount = event.target.files.length;
      for (let i = 0; i < fileAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.colorImagSrcProduct.push({
            'color': this.formProduct.get('colorSelected')?.value.split('@')[1],
            'hex': this.formProduct.get('colorSelected')?.value.split('@')[0],
            'img': event.target.result
          });
          this.formProduct.patchValue({
            colorSelected: 'Choisir une couleur',
          })
        }
        reader.readAsDataURL(event.target.files[i])
      }
      event.target.value = null;
    }
  }

  // ********************* remove image from table of colors images *******************************
  removeImgColor(i: number) {
    this.colorImagSrcProduct.splice(i, 1)
  }



  // ////////////////////////////////////// ABOUT SHOW OTHERS IMAGES ////////////////////////////
  // **************************** preview others images ******************************************
  otherImgPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      var fileAmount = event.target.files.length;
      for (let i = 0; i < fileAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          // const [, type] = event.target.result.split(';')[0].split('/');
          // console.log("the name file is", type)
          this.otherImagSrcProduct.push({ 'file': event.target.result });
        }
        reader.readAsDataURL(event.target.files[i])
      }
      event.target.value = null;
    }
  }

  // ********************* remove image from table of others images *******************************
  removeImg(i: number) {
    this.otherImagSrcProduct.splice(i, 1)
  }
  // ////////////////////////////////////// END ABOUT OTHERS IMAGES ////////////////////////////


  // *********************** filter sub-categorie from id of category *****************************
  filterSubCatId(id: number) {
    return this.subCategories?.filter(item => item.category.id === id)
  }

  //  *********************** to fill table of color for the variation *****************************
  addColorsVariation() {
    if (this.formProduct.get('colors')?.value != null && this.formProduct.get('colors')?.value.length > 0) {
      this.colorForImg = []
      for (let index = 0; index < this.formProduct.get('colors')?.value.length; index++) {
        const element = this.formProduct.get('colors')?.value[index];
        this.colorForImg.indexOf(element) === -1 ? this.colorForImg.push(element) : null
      }
    }
    // else {
    //   this.colorForImg = []
    // }
  }

  // ******************************* register product **************************************************
  registerProduct() {
    this.formProduct.patchValue({
      tableOtherImg: this.otherImagSrcProduct,
      tableColorImg: this.colorImagSrcProduct

    })
    this.prodService.saveProduct(this.formProduct.getRawValue()).subscribe(res => {
      this.newProduct.emit(res)
      this.clicked = false;
      toastShow('success', 'Article ajouté avec succès')
      this.errors = []
      this.imagSrcProduct = 'assets/img/overview.jpeg';
      this.imagSecondSrcProduct = 'assets/img/overview.jpeg';
      this.otherImagSrcProduct = [];
      this.colorImagSrcProduct = [];
      this.formProduct.patchValue({
        category_id: 'Select',
        sub_category_id: 'Choisir une sous-catégorie',
        brand_id: '',
        name: '',
        price: '',
        sold_price: '',
        mainIMg: { 'name': '', 'file': '' },
        secondIMg: { 'name': '', 'file': '' },
        tableOtherImg: [],
        tableColorImg: [],
        colors: [],
        sizes: [],
        description: '',
        colorSelected: 'Choisir une couleur',
        available: true,

      });

    },
      (error) => {
        this.clicked = false;
        this.errors = []
        this.errors = error.error
        showError(error, error.status, this.errors, error.error)
      })
  }

  // *********************************** save the edition of product ************************************
  editProduct() {
    this.formProduct.patchValue({
      tableOtherImg: this.otherImagSrcProduct,
      tableColorImg: this.colorImagSrcProduct

    })
    this.prodService.editProduct(this.itemEdit?.id, this.formProduct.getRawValue()).subscribe(res => {
      if (res) {
        this.clicked = false;
        this.newProduct.emit(res)
        document.getElementById('closeModalProduct')?.click()
        toastShow('success', 'Article modifié avec succès')
      }
    },
      (error) => {
        this.clicked = false;
        this.errors = []
        this.errors = error.error
        showError(error, error.status, this.errors, error.error)
      })
  }


























  //  *********************** to fill table of size for the variation *****************************
  // addSizessVariation() {
  //   if (this.formProduct.get('sizes')?.value != null && this.formProduct.get('sizes')?.value.length > 0) {
  //     for (let index = 0; index < this.formProduct.get('sizes')?.value.length; index++) {
  //       const element = this.formProduct.get('sizes')?.value[index];
  //       this.sizesForVariation.indexOf(element) === -1 ? this.sizesForVariation.push(element) : null
  //     }
  //   }
  // }

  // ************************ fill table of color variation ****************************************
  // fillTableColorVariation() {
  //   this.tableColorVariation.push({
  //     'color': this.formProduct.get('idColor_variation')?.value,
  //     'price': this.formProduct.get('priceColorVariation')?.value,
  //     'img': this.formProduct.get('imgcolorProductVariation')?.value
  //   })
  //   toastShow('success', 'Variation ajoutée avec succès')
  //   this.srcimgColorVariation = 'assets/img/overview.jpeg',
  //     this.formProduct.patchValue({
  //       idColor_variation: 'Choisir une couleur',
  //       priceColorVariation: '',
  //       imgcolorProductVariation: { 'name': '', 'file': '' }
  //     })
  //   this.formProduct.get('idColor_variation')?.reset
  //   this.formProduct.get('priceColorVariation')?.reset
  //   this.formProduct.get('imgcolorProductVariation')?.reset
  // }

  // ***************************** preview image of product color variation **************************
  // imageColorVariationPreview(event: any) {
  //   const reader = new FileReader();

  //   if (event.target.files && event.target.files.length) {
  //     const [file] = event.target.files;
  //     reader.readAsDataURL(file);

  //     reader.onload = () => {

  //       this.srcimgColorVariation = reader.result as string;

  //       this.formProduct.patchValue({
  //         imgcolorProductVariation: { 'name': event.target.files[0]['name'], 'file': reader.result }
  //       });

  //     };

  //   }
  // }

  // *************** get the state of variation before show fields *****************************
  // getVariation(ev: any) {
  //   if (ev?.value == 'true') {
  //     this.showVariation = true
  //   }
  //   else {
  //     this.showVariation = false
  //   }
  // }

  // // ********************** depending of type variation show the correct fields *************************** 
  // selecVariation(ev: any) {
  //   if (ev?.value == 'color') {
  //     this.selectVariationColor = true
  //     this.selectVariationSize = false
  //     if (this.formProduct.get('colors')?.value == null || this.formProduct.get('colors')?.value.length == 0) {
  //       SwallModal('error', 'Erreur', 'Veuillez sélectionner les couleurs svp')
  //     }
  //   }
  //   else if (ev?.value == 'size') {
  //     this.selectVariationColor = false
  //     this.selectVariationSize = true
  //     if (this.formProduct.get('sizes')?.value == null || this.formProduct.get('sizes')?.value.length == 0) {
  //       SwallModal('error', 'Erreur', 'Veuillez sélectionner les tailles svp')
  //     }
  //   }
  //   else {
  //     this.showVariation = false;
  //     this.selectVariationColor = false
  //     this.selectVariationSize = false
  //   }

  // }





}
