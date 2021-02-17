import { ProfilSortieService } from './../../services/profil-sortie.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-profil-sortie',
  templateUrl: './add-profil-sortie.component.html',
  styleUrls: ['./add-profil-sortie.component.css']
})
export class AddProfilSortieComponent implements OnInit {

  formadd: FormGroup;
  libelle;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private psservice: ProfilSortieService,
    private _location: Location
  ) { }
  ngOnInit(): void {
      this.formadd = this.formBuilder?.group({
        libelle: ['', [ Validators.required]],
      });

  }

  // tslint:disable-next-line: typedef
  get f(){
    return this.formadd?.controls;
  }

  addProfilSortie(){
    this.psservice.addprofilSortie(this.formadd.value).subscribe(
        (response: any) => {
          this.router.navigate(['/acceuil/profil-sortie']);
        },
        error => {
          console.log(error);
          alert(error.error.detail);
        }
    );
  }

  PagePrecedente(){
    this._location.back();
  }


}
