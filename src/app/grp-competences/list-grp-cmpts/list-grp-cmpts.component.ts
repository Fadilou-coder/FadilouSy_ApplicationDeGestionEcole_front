import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenService} from '../../token/service/token.service';
import {DomSanitizer} from '@angular/platform-browser';
import jwt_decode from 'jwt-decode';
import {GrpCmptService} from '../Services/grp-cmpt.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-grp-cmpts',
  templateUrl: './list-grp-cmpts.component.html',
  styleUrls: ['./list-grp-cmpts.component.css']
})
export class ListGrpCmptsComponent implements OnInit {

  constructor(
    private grpCmptservice: GrpCmptService,
    private tokenService: TokenService
  ) { }

  page = 1;
  grpCpmt: any;
  nbrPage: any = 1;
  token = this.tokenService.getLocalStorageToken();
  decoded: any = '';
  role = '';

  ngOnInit(): void {
    if (this.token){
      this.decoded = jwt_decode(this.token.token);
      this.role = this.decoded.roles[0];
      console.log(this.role);
    }
    console.log(this.page);
    this.grpCmptservice.findAllGrpCompetences().subscribe(
      (response: any) => {
        console.log(response);
        this.grpCpmt = response['hydra:member'];
        if (response['hydra:view']){
          this.nbrPage = response['hydra:view']['hydra:last'];
          this.nbrPage = this.nbrPage.split('=')[1];
        }
        console.log(this.nbrPage);
      }
      ,
      (error: any) => { console.log(error); }
    );
  }
  archiverGrpCpmt(id: any): any{
    Swal.fire({
      title: 'Etes vous sure?',
      text: 'Vous voulais vraiment supprimmer cet Utilisateur!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OUI!',
      cancelButtonText: 'Non, Annuler'
    }).then((result) => {
      if (result.value) {
          this.grpCmptservice.archiverGrpCompetences(id).subscribe(
            (response: any) => {
              console.log(response);
              Swal.fire(
                'Deleted!',
                'Your imaginary file has been deleted.',
                'success'
              )
              this.grpCmptservice.findAllGrpCompetences().subscribe(
                // tslint:disable-next-line:no-shadowed-variable
                (response: any) => {
                  console.log(response);
                  this.grpCpmt = response['hydra:member'];
                  if (response['hydra:view']){
                    this.nbrPage = response['hydra:view']['hydra:last'];
                    this.nbrPage = this.nbrPage.split('=')[1];
                  }
                  console.log(this.nbrPage);
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
    })
  }

  suivant(): any{
    this.page++;
    this.grpCmptservice.findAllGrpCompetences().subscribe(
      (response: any) => {
        console.log(response);
        this.grpCpmt = response['hydra:member'];
        if (response['hydra:view']){
          this.nbrPage = response['hydra:view']['hydra:last'];
          this.nbrPage = this.nbrPage.split('=')[1];
        }
        console.log(this.nbrPage);
      }
      ,
      (error: any) => {console.log(error)}
    );
  }
  precedent(): any{
    this.page--;
    this.grpCmptservice.findAllGrpCompetences().subscribe(
      (response: any) => {
        console.log(response);
        this.grpCpmt = response['hydra:member'];
        if (response['hydra:view']){
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
