import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin';
  constructor(private cdRef: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.cdRef.detectChanges()
  }

}
