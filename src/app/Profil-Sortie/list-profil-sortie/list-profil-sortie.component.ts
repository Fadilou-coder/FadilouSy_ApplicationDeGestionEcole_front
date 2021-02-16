import { ProfilSortieService } from './../../services/profil-sortie.service';
import jwt_decode from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/token/service/token.service';
import { UserService } from 'src/app/users/service/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-profil-sortie',
  templateUrl: './list-profil-sortie.component.html',
  styleUrls: ['./list-profil-sortie.component.css']
})
export class ListProfilSortieComponent implements OnInit {

   constructor(
    private psService: ProfilSortieService,
    private tokenService: TokenService,
    ) { }

  page = 1;
  profilSortie: any;
  nbrPage: any = 1;
  token = this.tokenService.getLocalStorageToken();
  decoded:any = '';

  ngOnInit(): void {
    if (this.token){
      this.decoded = jwt_decode(this.token.token);
      this.decoded = this.decoded.roles[0];
      console.log(this.decoded);
    }
    console.log(this.page);
    this.psService.findAllProfilSortie(this.page).subscribe(
      (response: any) => {
        console.log(response);
        this.profilSortie = response['hydra:member'];
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
  archiverProfilSortie(id: any){
    Swal.fire({
      title: 'Etes vous sure?',
      text: 'Vous voulais vraiment supprimmer cet Utilisateur!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OUI!',
      cancelButtonText: 'Non, Annuler'
    }).then((result) => {
      if (result.value) {
        this.psService.archiverProfilSortie(id).subscribe(
          (response: any) => {
            console.log(response);
            Swal.fire(
              'Deleted!',
              'Your imaginary file has been deleted.',
              'success'
            )
            this.psService.findAllProfilSortie(this.page).subscribe(
              (response: any) => {
                console.log(response);
                this.profilSortie = response['hydra:member'];
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
    });

  }

  suivant(){
    this.page++;
    this.psService.findAllProfilSortie(this.page).subscribe(
          (response: any) => {
            console.log(response);
            this.profilSortie = response['hydra:member'];
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
    this.psService.findAllProfilSortie(this.page).subscribe(
          (response: any) => {
            console.log(response);
            this.profilSortie = response['hydra:member'];
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
