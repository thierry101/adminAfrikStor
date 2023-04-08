import { Component, OnInit } from '@angular/core';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dayVisistors !: number;
  monthVisistors !: number;
  yearVisistors !: number;
  allVisistors !: number;

  constructor(private publicService: PublicService) { }

  ngOnInit(): void {
    // setTimeout(() => { this.ngOnInit() }, 1000 * 10)
    this.publicService.getAllVIsitors().subscribe(res => {
      this.dayVisistors = res?.day_visitor;
      this.monthVisistors = res?.month_visitors;
      this.yearVisistors = res?.year_visitors;
      this.allVisistors = res?.all_visitors;
    })
  }

}
