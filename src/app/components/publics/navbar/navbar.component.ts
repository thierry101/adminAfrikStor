import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { PublicService } from 'src/app/services/public.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  name!: string;
  authenticated: boolean = false
  url: string = environment.API;
  imagSrcProfil: string = 'assets/img/profile.jpg';

  constructor(private authService: AuthenticationService,
    private router: Router, public publicService: PublicService) { }

  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (res: any) => {
        this.name = res?.first_name + ' ' + res?.last_name;
      },
      error: err => {
        this.name = "Anonymoususer"
      }
    })
  }

  logoutUser() {
    this.authService.logout({ "token": window.localStorage.getItem('refresh_token') }).subscribe(res => {
      localStorage.removeItem("refresh_token")
      localStorage.clear()
      this.router.navigate(['/login'])
    })
  }
}
