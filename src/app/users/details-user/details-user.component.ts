import { jsPDF } from 'jspdf'
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/users/service/user.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Profil } from 'src/app/profils/Model/profil';
import { User } from '../Model/user';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {

  user: any = new User(0, '', '', '', '', new Profil(0, ''), '');
  id: any;
  dataToString;
  @ViewChild('content', {static: false}) content: ElementRef;


  constructor(
    private router: Router,
    private userservice: UserService,
    private url: ActivatedRoute,
    private sanitizer:DomSanitizer
  ) { }
  ngOnInit(): void {
    this.id = this.url.snapshot.params['id'];
    console.log(this.id);
      this.userservice.getOneUser(this.id).subscribe(
        (response: any) => {
          this.user = response['hydra:member'][0];
          this.dataToString = 'Les informations de l\'utilisateur'+": "+'\n   Nom Complet'+": "+this.user.prenom+' '+this.user.nom+'\n   Email'+": "+this.user.email+'\n   Profil'+": "+this.user.profil.libelle;
          // const data = [{
          //   'name': this.user.prenom+' '+this.user.nom,
          //   'profile': this.user.profil.libelle,
          //   'email': this.user.email,
          // }];

          // this.dataToString = JSON.stringify(data);
          if (this.user) {
            if (this.user.image) {
                this.user.image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.user.image);
            }else{
              this.user.image = '../../../assets/image/inconu.jpeg'
            }
          }else{
            this.router.navigate(['/'])
          }

        },
        (error: any) => {
          console.log(error);
        }
      );
  }
  imprimmer(){
    // const doc = new jsPDF();

    // const specialElementHandlers = {
    //   '#editor': function (element, renderer) {
    //     return true;
    //   }
    // };

    // const content = this.content.nativeElement;

    // doc.fromHTML(content.innerHTML, 15, 15, {
    //   width: 190,
    //   'elementHandlers': specialElementHandlers
    // });

    // doc.save('test.pdf');
  }


}
