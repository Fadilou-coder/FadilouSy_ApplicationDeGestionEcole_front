import { ProfilSortieService } from './../../services/profil-sortie.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-profil-sortie',
  templateUrl: './edit-profil-sortie.component.html',
  styleUrls: ['./edit-profil-sortie.component.css']
})
export class EditProfilSortieComponent implements OnInit {

  formadd: FormGroup;
  libelle;
  profilSortie;
  id = this.url.snapshot.params['id'];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private psservice: ProfilSortieService,
    private url: ActivatedRoute
  ) { }
  ngOnInit(): void {
      this.psservice.getOneProfilSortie(this.id).subscribe(ps => {
        this.profilSortie = ps['hydra:member'][0];
        this.libelle = this.profilSortie.libelle;
      });
      this.formadd = this.formBuilder?.group({
        libelle: ['', [ Validators.required]],
      });

  }

  // tslint:disable-next-line: typedef
  get f(){
    return this.formadd?.controls;
  }

  updateProfilSortie(){
    this.psservice.updateProfilSortie(this.id, this.formadd.value).subscribe(
        (response: any) => {
          console.log(response);
          this.router.navigate(['/acceuil/profil-sortie']);
        },
        error => {
          console.log(error);
          alert(error.error.detail);
        }
    );
  }


}
