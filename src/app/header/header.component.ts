import { UserService } from './../users/service/user.service';
import { TokenService } from './../token/service/token.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import  jwt_decode  from 'jwt-decode';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit {

  token = this.tokenService.getLocalStorageToken();
  decoded: any;
  user;
  role;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private userservice: UserService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    if (this.token){
      this.decoded = jwt_decode(this.token.token);
      //console.log(this.decoded.id);
      this.role = this.decoded.roles[0];
      this.userservice.getOneUser(this.decoded.id).subscribe(
        (response: any) => {
          this.user = response['hydra:member'][0];
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }

  logout(): void{
    this.tokenService.removeLocalStorage();
    this.router.navigate(['/login']);
  }

  image(img: any){
    if (img) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + img);
    }else{
      return '../../../assets/image/inconu.jpeg'
    }
  }

}
