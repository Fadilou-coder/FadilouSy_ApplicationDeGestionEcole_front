import { ProfilSortieService } from './../../services/profil-sortie.service';
import  jwt_decode from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CpmtServicesService } from 'src/app/competences/Services/cpmt-services.service';
import { TokenService } from 'src/app/token/service/token.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-details-profil-sortie',
  templateUrl: './details-profil-sortie.component.html',
  styleUrls: ['./details-profil-sortie.component.css']
})
export class DetailsProfilSortieComponent implements OnInit {

  constructor(
    private Cmptservice: CpmtServicesService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private psService: ProfilSortieService
  ) { }

  page = 1;
  PrSortie: any;
  nbrPage: any = 1;
  token = this.tokenService.getLocalStorageToken();
  decoded: any = '';
  role = '';
  form: FormGroup;
  idPs;
  users;
  private scrollContainer: any;
  private isNearBottom = true;


  ngOnInit(): void {
    if (this.token){
      this.decoded = jwt_decode(this.token.token);
      this.role = this.decoded.roles[0];
      console.log(this.role);
    }
    console.log(this.page);
    this.form = this.formBuilder.group({
      idPs: ''
    });
    this.psService.findAllProfilSortie(1).subscribe(
      (response: any) => {
        this.PrSortie = response['hydra:member'];
        this.idPs = this.PrSortie[0].id;
        this.psService.findAllAppOfProfilSortie(this.page, this.idPs).subscribe(
          (response: any) => {
            console.log(response);
            this.users = response['hydra:member'];
            if (response['hydra:view']){
              this.nbrPage = response['hydra:view']['hydra:last'];
              this.nbrPage = this.nbrPage.split('=')[1];
            }
          }
        );
      }
      ,
      (error: any) => { console.log(error); }
    );
  }

  user(){
    this.page = 1;
    this.nbrPage = 1;
    this.psService.findAllAppOfProfilSortie(this.page, this.idPs).subscribe(
      (response: any) => {
        this.users = response['hydra:member'];
        if (response['hydra:view']){
          this.nbrPage = response['hydra:view']['hydra:last'];
          this.nbrPage = this.nbrPage.split('=')[1];
        }
      }
    );

  }

  image(img: any){
    if (img) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + img);
    }else{
      return '../../../assets/image/inconu.jpeg'
    }
  }


  suivant(){
    this.page++;
    this.psService.findAllAppOfProfilSortie(this.page, this.idPs).subscribe(
      (response: any) => {
        this.users = response['hydra:member'];
        if (response['hydra:view']){
          this.nbrPage = response['hydra:view']['hydra:last'];
          this.nbrPage = this.nbrPage.split('=')[1];
        }
      }
    );
   }

  precedent(){
    this.page--;
    this.psService.findAllAppOfProfilSortie(this.page, this.idPs).subscribe(
      (response: any) => {
        this.users = response['hydra:member'];
        if (response['hydra:view']){
          this.nbrPage = response['hydra:view']['hydra:last'];
          this.nbrPage = this.nbrPage.split('=')[1];
        }
      }
    );
  }

}
