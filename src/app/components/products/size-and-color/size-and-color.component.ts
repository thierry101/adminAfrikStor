import { Component, OnInit } from '@angular/core';
import { Isize } from 'src/app/interfaces/ipublic';
import { ProductsService } from 'src/app/services/products.service';
import { PublicService } from 'src/app/services/public.service';
import { showError, toastShow } from 'src/app/shared/shared';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-size-and-color',
  templateUrl: './size-and-color.component.html',
  styleUrls: ['./size-and-color.component.css']
})
export class SizeAndColorComponent implements OnInit {

  title!: string;
  sizes!: Isize[];
  errors!: string[];
  editSize: boolean = false;
  itemToEdit!: Isize;
  colorFiltering!: string;
  sizeFiltering!: string;
  allColors!: any;
  currentPage: number = 1;
  p: number = 1;
  page: number = 1;

  constructor(private publicService: PublicService, private prodService: ProductsService) { }


  ngOnInit(): void {
    // **********  get all sizes *************************
    // setTimeout(() => { this.ngOnInit() }, 1000 * 10)
    this.prodService.getSize().subscribe({
      next: allSizes => this.sizes = allSizes,
    });

    // get all colors 
    this.prodService.getColors().subscribe((res: any) => {
      this.allColors = res?.colors

    })

  }

  // ///////////////////////////////////////////////////////////////// ABOUT SIZE ///////////////////////////////////////////
  openModalSize() {
    this.editSize = false;
    this.title = "Ajouter une taille";
  }

  //****************************** add a new created size to the table of all sizes ********************* */
  addSize(size: Isize) {
    this.sizes?.unshift(size)
  }

  // ****************************** to edit size *******************************************
  editerSize(item: Isize) {
    this.sizes = this.sizes.filter((obj: any) => obj !== item)
    this.title = "Editer une taille"
    this.editSize = true
    this.itemToEdit = item;
  }

  // ******************************* change state of size from the table of sizes *********************
  activeSize(id: number, event: any) {
    const data = {
      'changeState': true,
      'newState': event.target.checked
    }
    this.prodService.editStateSize(id, data).subscribe(res => {
      if (res) {
        toastShow('success', "Statut mise à jour avec succès")
      }
    },
      (error => {

      })
    )
  }

  deleteSize(item: Isize) {
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
          this.prodService.delSize(item['id']).subscribe(res => {
            this.sizes = this.sizes.filter((obj: any) => obj !== item)
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
  // ///////////////////////////////////////////////////////////////// END SIZE ///////////////////////////////////////////////


  // ///////////////////////////////////////////////////////////////// BEGIN COLOR ///////////////////////////////////////////////
  key = 'name';
  reverse: boolean = false;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }


}
