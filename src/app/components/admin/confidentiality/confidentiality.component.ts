import { Component, OnInit } from '@angular/core';
import { IconfigRule } from 'src/app/interfaces/ipublic';
import { PublicService } from 'src/app/services/public.service';
import { showError, toastShow } from 'src/app/shared/shared';

@Component({
  selector: 'app-confidentiality',
  templateUrl: './confidentiality.component.html',
  styleUrls: ['./confidentiality.component.css']
})
export class ConfidentialityComponent implements OnInit {

  confidentiality!: string;
  sellerRule!: string;
  buyerule!: string;
  errors!: string[];
  clicked: boolean = false;

  constructor(private publicService: PublicService) { }

  ngOnInit(): void {
    // setTimeout(() => { this.ngOnInit() }, 1000 * 10)
    this.publicService.getConfigRule().subscribe(res => {
      this.confidentiality = res?.confidentiality;
      this.sellerRule = res?.rulerSeller;
      this.buyerule = res?.rulerBuyer;
    })
  }

  // ****************************** to edit information confidentiality ***********************************
  editConfidentiality() {
    const data = {
      'confidentiality': true,
      data: this.confidentiality
    }
    this.publicService.configRule(data).subscribe(res => {
      this.clicked = false;
      toastShow('success', "Politique de confidentialité mises à jour avec succès")
      this.errors = []
    }, (error => {
      this.clicked = false;
      this.errors = []
      this.errors = error.error
      showError(error, error.status, this.errors, error.error)
    }))
  }


  // ****************************** to edit rule of seller ***********************************
  editRuleSeller() {
    const data = {
      'ruleSeller': true,
      data: this.sellerRule
    }
    this.publicService.configRule(data).subscribe(res => {
      this.clicked = false;
      toastShow('success', "Politique de vendeur mises à jour avec succès")
      this.errors = []
    }, (error => {
      this.clicked = false;
      this.errors = []
      this.errors = error.error
      showError(error, error.status, this.errors, error.error)
    }))
  }


  // ****************************** to edit rule of buyer ***********************************
  editRuleBuyer() {
    const data = {
      'ruleBuyer': true,
      data: this.buyerule
    }
    this.publicService.configRule(data).subscribe(res => {
      toastShow('success', "Politique acheteur mises à jour avec succès")
      this.clicked = false;
      this.errors = []
    }, (error => {
      this.clicked = false;
      this.errors = []
      this.errors = error.error
      showError(error, error.status, this.errors, error.error)
    }))
  }

}
