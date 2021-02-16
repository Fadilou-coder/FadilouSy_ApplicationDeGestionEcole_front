import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/token/service/token.service';
import { UserService } from 'src/app/users/service/user.service';
import  jwt_decode  from 'jwt-decode';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-profils',
  templateUrl: './list-profils.component.html',
  styleUrls: ['./list-profils.component.css']
})
export class ListProfilsComponent implements OnInit {

   constructor(
    private userservice: UserService,
    private url: ActivatedRoute,
    private tokenService: TokenService,
    private sanitizer:DomSanitizer
    ) { }

  page = 1;
  profils: any;
  nbrPage: any = 1;
  token = this.tokenService.getLocalStorageToken();
  decoded: any = '';
  role = '';
  users;

  ngOnInit(): void {
    if (this.token){
      this.decoded = jwt_decode(this.token.token);
      this.role = this.decoded.roles[0];
      console.log(this.role);
    }
    console.log(this.page);
    this.userservice.findAllProfil(this.page).subscribe(
      (response: any) => {
        console.log(response);
        this.profils = response['hydra:member'];
        if(response['hydra:view']){
          this.nbrPage = response['hydra:view']['hydra:last'];
          this.nbrPage = this.nbrPage.split('=')[1];
        }
        console.log(this.nbrPage);
        }
      ,
      (error: any) => {console.log(error)}
    );
  }
  image(img: any){
    if (img) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + img);
    }else{
      return '../../../assets/image/inconu.jpeg'
    }
  }
  archiverProfil(id: any){
    Swal.fire({
      title: 'Etes vous sure?',
      text: 'Vous voulais vraiment supprimmer cet Utilisateur!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OUI!',
      cancelButtonText: 'Non, Annuler'
    }).then((result) => {
      if (result.value) {
        this.userservice.getUserByProfil(id,1).subscribe(
          (response: any) => {
            if (response['hydra:member'] && response['hydra:member'].length) {
              Swal.fire(
                'Suppression Impossible!!!',
                'Il existe des utilisateurs de ce Profil :)',
                'error'
              )
            }else{
              this.userservice.archiverProfil(id).subscribe(
                (response: any) => {
                  console.log(response);
                  Swal.fire(
                    'Deleted!',
                    'Your imaginary file has been deleted.',
                    'success'
                  )
                  this.userservice.findAllProfil(this.page).subscribe(
                    (response: any) => {
                      console.log(response);
                      this.profils = response['hydra:member'];
                      if(response['hydra:view']){
                        this.nbrPage = response['hydra:view']['hydra:last'];
                        this.nbrPage = this.nbrPage.split('=')[1];
                      }
                    }
                    ,
                    (error: any) => {console.log(error)}
                  );
                },
                error => {
                  console.log(error);
                  alert(error.error.detail);
                }
              );
            }
          }
        );
      }
    })

  }

  suivant(){
    this.page++;
    this.userservice.findAllProfil(this.page).subscribe(
          (response: any) => {
            console.log(response);
            this.profils = response['hydra:member'];
            if(response['hydra:view']){
              this.nbrPage = response['hydra:view']['hydra:last'];
              this.nbrPage = this.nbrPage.split('=')[1];
            }
          }
          ,
          (error: any) => {console.log(error)}
        );
   }

  precedent(){
    this.page--;
    this.userservice.findAllProfil(this.page).subscribe(
          (response: any) => {
            console.log(response);
            this.profils = response['hydra:member'];
            if(response['hydra:view']){
              this.nbrPage = response['hydra:view']['hydra:last'];
              this.nbrPage = this.nbrPage.split('=')[1];
            }
            console.log(this.nbrPage);
            }
          ,
          (error: any) => {console.log(error)}
    );
  }


}
