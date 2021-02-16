import  jwt_decode  from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TokenService } from 'src/app/token/service/token.service';
import { UserService } from '../service/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import autoTable from 'jspdf-autotable'
import Swal from 'sweetalert2'
import {jsPDF} from 'jspdf';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  constructor(
    private userservice: UserService,
    private router: Router,
    private tokenService: TokenService,
    private sanitizer: DomSanitizer
    ) { }

  page = 1;
  users: any;
  nbrPage: any = 1;
  token = this.tokenService.getLocalStorageToken();
  decoded: any = '';
  role = '';
  search: string = '';

  ngOnInit(): void {
    if (this.token){
      this.decoded = jwt_decode(this.token.token);
      this.role = this.decoded.roles[0];
      //console.log(this.decoded.id);
      if (this.role === 'ROLE_APPRENANT') {
          this.router.navigate(['/acceuil/users/detailsUser/'+this.decoded.id]);
      }
    }
    if (this.role === 'ROLE_ADMIN') {
      this.userservice.findAllUser(this.page).subscribe(
        (response: any) => {
          this.users = response['hydra:member'];
          if(response['hydra:view']){
            this.nbrPage = response['hydra:view']['hydra:last'];
            this.nbrPage = this.nbrPage.split('=')[1];
          }
        },
        (error: any) => {console.log(error)}
      );
    }
    if(this.role === 'ROLE_FORMATEUR'){
      this.userservice.findAllApprenant(this.page).subscribe(
        (response: any) => {
          this.users = response['hydra:member'];
          if(response['hydra:view']){
            this.nbrPage = response['hydra:view']['hydra:last'];
            this.nbrPage = this.nbrPage.split('=')[1];
          }
        },
        (error: any) => {console.log(error)}
      );
    }
    if (this.role === 'ROLE_CM') {
      this.userservice.findAllForAndApp(this.page).subscribe(
        (response: any) => {
          this.users = response['hydra:member'];
          if(response['hydra:view']){
            this.nbrPage = response['hydra:view']['hydra:last'];
            this.nbrPage = this.nbrPage.split('=')[1];
          }
        },
        (error: any) => {console.log(error)}
      );
    }
  }
  searchThis(){
    console.log(this.search);
  }
  image(img: any){
    if (img) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + img);
    }else{
      return '../../../assets/image/inconu.jpeg'
    }
  }
  archiverUser(id: any){
    Swal.fire({
      title: 'Etes vous sure?',
      text: 'Vous voulais vraiment supprimmer cet Utilisateur!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OUI!',
      cancelButtonText: 'Non, Annuler'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
        this.userservice.archiverUser(id).subscribe(
          (response: any) => {
            console.log(response);
            this.userservice.findAllUser(this.page).subscribe(
              // tslint:disable-next-line:no-shadowed-variable
              (response: any) => {
                this.users = response['hydra:member'];
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
    })

  }

  suivant(){
    this.page++;
    if (this.role === 'ROLE_ADMIN') {
      this.userservice.findAllUser(this.page).subscribe(
        (response: any) => {
          this.users = response['hydra:member'];
          if(response['hydra:view']){
            this.nbrPage = response['hydra:view']['hydra:last'];
            this.nbrPage = this.nbrPage.split('=')[1];
          }
        },
        (error: any) => {console.log(error)}
      );
    }
    if(this.role === 'ROLE_FORMATEUR'){
      this.userservice.findAllApprenant(this.page).subscribe(
        (response: any) => {
          this.users = response['hydra:member'];
          if(response['hydra:view']){
            this.nbrPage = response['hydra:view']['hydra:last'];
            this.nbrPage = this.nbrPage.split('=')[1];
          }
        },
        (error: any) => {console.log(error)}
      );
    }
    if (this.role === 'ROLE_CM') {
      this.userservice.findAllForAndApp(this.page).subscribe(
        (response: any) => {
          this.users = response['hydra:member'];
          if(response['hydra:view']){
            this.nbrPage = response['hydra:view']['hydra:last'];
            this.nbrPage = this.nbrPage.split('=')[1];
          }
        },
        (error: any) => {console.log(error)}
      );
    }
   }

  precedent(){
    this.page--;
    if (this.role === 'ROLE_ADMIN') {
      this.userservice.findAllUser(this.page).subscribe(
        (response: any) => {
          this.users = response['hydra:member'];
          if(response['hydra:view']){
            this.nbrPage = response['hydra:view']['hydra:last'];
            this.nbrPage = this.nbrPage.split('=')[1];
          }
        },
        (error: any) => {console.log(error)}
      );
    }
    if(this.role === 'ROLE_FORMATEUR'){
      this.userservice.findAllApprenant(this.page).subscribe(
        (response: any) => {
          this.users = response['hydra:member'];
          if(response['hydra:view']){
            this.nbrPage = response['hydra:view']['hydra:last'];
            this.nbrPage = this.nbrPage.split('=')[1];
          }
        },
        (error: any) => {console.log(error)}
      );
    }
    if (this.role === 'ROLE_CM') {
      this.userservice.findAllForAndApp(this.page).subscribe(
        (response: any) => {
          this.users = response['hydra:member'];
          if(response['hydra:view']){
            this.nbrPage = response['hydra:view']['hydra:last'];
            this.nbrPage = this.nbrPage.split('=')[1];
          }
        },
        (error: any) => {console.log(error)}
      );
    }
  }


  selectedPage(page){
    this.page = page;
    if (this.role === 'ROLE_ADMIN') {
      this.userservice.findAllUser(page).subscribe(
        (response: any) => {
          this.users = response['hydra:member'];
          if(response['hydra:view']){
            this.nbrPage = response['hydra:view']['hydra:last'];
            this.nbrPage = this.nbrPage.split('=')[1];
          }
        },
        (error: any) => {console.log(error)}
      );
    }
    if(this.role === 'ROLE_FORMATEUR'){
      this.userservice.findAllApprenant(page).subscribe(
        (response: any) => {
          this.users = response['hydra:member'];
          if(response['hydra:view']){
            this.nbrPage = response['hydra:view']['hydra:last'];
            this.nbrPage = this.nbrPage.split('=')[1];
          }
        },
        (error: any) => {console.log(error)}
      );
    }
    if (this.role === 'ROLE_CM') {
      this.userservice.findAllForAndApp(page).subscribe(
        (response: any) => {
          this.users = response['hydra:member'];
          if(response['hydra:view']){
            this.nbrPage = response['hydra:view']['hydra:last'];
            this.nbrPage = this.nbrPage.split('=')[1];
          }
        },
        (error: any) => {console.log(error)}
      );
    }
  }
  arrayOne(n): any[] {
    return Array(Number(n));
  }
  uploadPdf() {
    var columns = ["N°", "Prenom", "Nom", "Email", "Profil"];
    var rows = [];
    let i = 1;
    this.users.forEach(element => {
      rows.push([i++, element.prenom, element.nom, element.email, element.profil.libelle])
    });
    const doc = new jsPDF();
    //doc.autoTable(columns, rows);
    doc.save('table.pdf');
    // autoTable(doc, { html: '#my-table' });
    // doc.save('table.pdf');
  }




}
