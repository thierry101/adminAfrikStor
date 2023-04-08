import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ipublic } from 'src/app/interfaces/ipublic';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { roles, showError, toastShow } from 'src/app/shared/shared';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-site',
  templateUrl: './admin-site.component.html',
  styleUrls: ['./admin-site.component.css']
})
export class AdminSiteComponent implements OnInit {

  title!: string;
  formRegister!: FormGroup;
  roles !: string[];
  errors !: string[];
  allUsers!: Ipublic[];
  editInfo: boolean = false;
  itemToEdit!: Ipublic;
  itemToEditPassword!: any;
  editPassword: boolean = false;
  registerUser: boolean = false;
  adminFiltering!: string;
  currentPage: number = 1;
  p: number = 1;
  clicked: boolean = false;

  constructor(private authenticationService: AuthenticationService, private fb: FormBuilder) { }

  ngOnInit(): void {
    // setTimeout(() => { this.ngOnInit() }, 1000 * 10)
    this.roles = roles;
    this.formRegister = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', Validators.required],
      type: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirm: ['', [Validators.required, Validators.minLength(8)]],
      statut: [true],
    });

    // **********  get all USERS *************************
    this.authenticationService.getUsers().subscribe({
      next: (res: any) => this.allUsers = res,
    });
  }

  registerAdmin() {
    this.authenticationService.register(this.formRegister.getRawValue()).subscribe(res => {
      if (res) {
        toastShow('success', "Utilisateur créé avec succès")
        this.clicked = false;
        this.allUsers?.unshift(res)
        this.errors = []
        this.formRegister.reset()
        document.getElementById("closeModalRegister")?.click()
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


  // show modal to add admin
  addAdmin() {
    this.registerUser = true;
    this.editInfo = false;
    this.editPassword = false;
    this.title = "Ajouter un administrateur";
    this.errors = [];
    this.formRegister.reset();
  }

  // ******************************************* FILL INFORMATION TO EDIT INFO USER *************************
  fillInfoToEdit(user: Ipublic) {
    this.itemToEdit = user;
    this.errors = [];
    this.title = "Modifier les informations de : " + user?.first_name + ' ' + user?.last_name
    this.registerUser = false;
    this.editInfo = true;
    this.editPassword = false;
    this.formRegister.patchValue({
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      type: user?.role,
      statut: user?.statut
    })
  }

  // ************************************ FILL MODAL TO EDIT PASSWORD ******************************
  fillEditPassword(user: Ipublic) {
    this.itemToEditPassword = user
    this.title = "Modifier le mot de passe de l'utilisateur " + user?.first_name + ' ' + user?.last_name
    this.registerUser = false;
    this.editInfo = false;
    this.editPassword = true;
    this.errors = [];
    this.formRegister.reset();
  }

  // ******************************** EDIT INFORMATION OF USER ***********************************
  editAdminUser() {
    const data = {
      'information': true,
      data: this.formRegister.getRawValue()
    }
    this.authenticationService.editUser(this.itemToEdit?.id, data).subscribe((res: Ipublic) => {
      if (res) {
        toastShow('success', "Informations mises à jour avec succès")
        this.clicked = false;
        this.allUsers = this.allUsers.filter((obj: any) => obj !== this.itemToEdit)
        this.allUsers?.unshift(res)
        this.errors = []
        this.formRegister.reset()
        document.getElementById("closeModalRegister")?.click()
      }
    },
      (error => {
        this.clicked = false;
        this.errors = []
        this.errors = error.error
        showError(error, error.status, this.errors, error.error)
      }))
  }

  // ***************************** CHANGE PASSWORD OF USER *******************************************
  editAdminPassword() {
    this.formRegister.patchValue({
      email: this.itemToEditPassword?.email
    })
    const data = {
      'password': true,
      data: this.formRegister.getRawValue()
    }
    this.authenticationService.editUser(this.itemToEditPassword?.id, data).subscribe(res => {
      if (res) {
        toastShow('success', "Mot de passe changé avec succès")
        this.clicked = false;
        this.errors = []
        this.formRegister.reset()
        document.getElementById("closeModalRegister")?.click()
      }
    },
      (error => {
        this.clicked = false;
        this.errors = []
        this.errors = error.error
        showError(error, error.status, this.errors, error.error)
      }))
  }

  // *************************** CHANGE STATE OF USER **********************************************
  changeStatutUser(item: Ipublic, event: any) {
    const data = {
      'statut': true,
      'data': event.target.checked
    }
    this.authenticationService.editUser(item?.id, data).subscribe(
      res => {
        if (res) {
          toastShow('success', "Statut changé avec succès")
          this.errors = []
        }
      },
      (error => {
        this.errors = []
        this.errors = error.error
        showError(error, error.status, this.errors, error.error)
      })
    )
  }

  // *************************** DELETE USER **************************************************
  deleteUser(item: Ipublic) {
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
          this.authenticationService.delUser(item['id']).subscribe(res => {
            this.allUsers = this.allUsers.filter((obj: any) => obj !== item)
            Swal.fire(
              'Supprimer!',
              item['first_name'] + " supprimé(e) avec succès",
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
