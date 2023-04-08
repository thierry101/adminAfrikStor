import { Component, OnInit } from '@angular/core';
import { Iproduct } from 'src/app/interfaces/ipublic';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-rejects',
  templateUrl: './rejects.component.html',
  styleUrls: ['./rejects.component.css']
})
export class RejectsComponent implements OnInit {

  rejectsProducts: Iproduct[] = [];

  constructor(private prodService: ProductsService) { }

  ngOnInit(): void {
    this.prodService.getProducts().subscribe((res: any) => {
      console.log("the raison is", res?.rejectsProd)
      this.rejectsProducts = res?.rejectsProd
    })
  }

}
