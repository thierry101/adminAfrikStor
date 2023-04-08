import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommandsService } from 'src/app/services/commands.service';
import { showError, toastShow } from 'src/app/shared/shared';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {
  users!: any[];
  coupons!: any[];
  errors!: string[];
  formCoupon !: FormGroup;
  clicked: boolean = false;

  constructor(private commandService: CommandsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    // setTimeout(() => { this.ngOnInit() }, 1000 * 10)
    this.formCoupon = this.fb.group({
      userid: ['', Validators.required],
      code: ['', Validators.required],
      dateBegin: ['', Validators.required],
      dateEnd: ['', Validators.required],
      reduction: ['', Validators.required],
      statut: [true, Validators.required],
    })

    this.commandService.getClientUsers().subscribe({
      next: (res: any) => {
        this.users = res
      }
    })

    this.commandService.getCoupons().subscribe({
      next: (res: any) => {
        this.coupons = res
      }
    })

    // // **********  get all Brands *************************
    // this.commandService.getOrders().subscribe({
    //   next: (res: any) => this.orders = res,
    // });
  }

  // ************************** to create code for reduction *********************************
  CreateReductionCode() {
    var text = "AfStor";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    }
    this.formCoupon.patchValue({
      code: text
    })

  }

  createCoupon() {
    this.commandService.creatCoupon(this.formCoupon.getRawValue()).subscribe(res => {
      if (res) {
        toastShow('success', "Coupon créé avec succès")
        this.clicked = false;
        this.formCoupon.reset()
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

}
