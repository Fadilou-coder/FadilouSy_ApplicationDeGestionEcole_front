import { jsPDF } from 'jspdf';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/users/service/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-item-profil',
  templateUrl: './item-profil.component.html',
  styleUrls: ['./item-profil.component.css']
})
export class ItemProfilComponent implements OnInit {

  constructor(
    private userservice: UserService,
    private router: Router,
    private url: ActivatedRoute,
    private sanitizer: DomSanitizer
    ) { }

  page = 1;
  users: any;
  nbrPage: any = 1;
  profil;
  id;

  ngOnInit(): void {
    this.id = this.url.snapshot.params['id'];
    this.userservice.getOneProfil(this.id).subscribe(
      p => {
        this.profil = p['hydra:member'][0]['libelle'];
    })
    this.userservice.getUserByProfil(this.id, this.page).subscribe(
      (response: any) => {
        console.log(response);
        this.users = response['hydra:member'];
        if(response['hydra:view']){
          this.nbrPage = response['hydra:view']['hydra:last'];
          this.nbrPage = this.nbrPage.split('=')[1];
        }
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
  archiverUser(id: any){
      this.userservice.archiverUser(id).subscribe(
        (response: any) => {
          console.log(response);
          this.userservice.findAllUser(this.page).subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            (response: any) => {
              console.log(response);
              this.users = response['hydra:member'];
              if(response['hydra:view']){
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

  suivant(){
    this.page++;
    this.userservice.getUserByProfil(this.id, this.page).subscribe(
          (response: any) => {
            console.log(response);
            this.users = response['hydra:member'];
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

  precedent(){
    this.page--;
    this.userservice.getUserByProfil(this.id, this.page).subscribe(
          (response: any) => {
            console.log(response);
            this.users = response['hydra:member'];
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

  uploadPdf() {
    const doc = new jsPDF();
    autoTable(doc, { html: '#my-table' });
    doc.save('table.pdf');
  }

}
