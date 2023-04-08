import { Component, OnInit } from '@angular/core';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-ruler-seller',
  templateUrl: './ruler-seller.component.html',
  styleUrls: ['./ruler-seller.component.css']
})
export class RulerSellerComponent implements OnInit {

  sellerRule!: string;

  constructor(private publicService: PublicService) { }


  ngOnInit(): void {
    this.publicService.getRuleSeller().subscribe(res => {
      console.log("the ruler seller is", res?.rulerSeller)
      this.sellerRule = res?.rulerSeller;
    })
  }

}
