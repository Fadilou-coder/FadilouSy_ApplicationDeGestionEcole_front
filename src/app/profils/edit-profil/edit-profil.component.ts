import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/users/service/user.service';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css']
})
export class EditProfilComponent implements OnInit {

  formadd: FormGroup;
  libelle;
  profil;
  id = this.url.snapshot.params['id'];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userservice: UserService,
    private url: ActivatedRoute
  ) { }
  ngOnInit(): void {
      this.userservice.getOneProfil(this.id).subscribe(profil => {
        this.profil = profil['hydra:member'][0];
        this.libelle = this.profil.libelle;
      });
      this.formadd = this.formBuilder?.group({
        libelle: ['', [ Validators.required]],
      });

  }

  // tslint:disable-next-line: typedef
  get f(){
    return this.formadd?.controls;
  }

  updateProfil(){
    this.userservice.putProfil(this.id, this.formadd.value).subscribe(
        (response: any) => {
          console.log(response);
          this.router.navigate(['/acceuil/profils']);
        },
        error => {
          console.log(error);
          alert(error.error.detail);
        }
    );
  }


}
