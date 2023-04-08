import { Component, OnInit } from '@angular/core';
import { Ipublic } from 'src/app/interfaces/ipublic';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  role!: string;
  user!: Ipublic;
  imagSrcProfil: string = 'assets/img/profile.jpg';
  url: string = environment.API;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.role = this.authService.getRole()
    this.authService.user().subscribe(res => {
      this.user = res
      this.imagSrcProfil = this.url + res?.image
    })
  }

  // to close sidebar when I select an item
  closeCanvas() {
    document.getElementById('idToCloseOffcanva')?.click()
  }

}
