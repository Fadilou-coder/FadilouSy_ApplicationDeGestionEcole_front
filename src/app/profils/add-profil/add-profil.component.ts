import { ListProfilsComponent } from './../list-profils/list-profils.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/users/service/user.service';

@Component({
  selector: 'app-add-profil',
  templateUrl: './add-profil.component.html',
  styleUrls: ['./add-profil.component.css']
})
export class AddProfilComponent implements OnInit {

  formadd: FormGroup;
  libelle;
  profils;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userservice: UserService,
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

  addProfil(){
    this.userservice.addprofil(this.formadd.value).subscribe(
        (response: any) => {
          console.log(response);
          this.router.navigate(['/acceuil/profils']);

        },
        error => {
          console.log(error);
          alert('Ce Profil existe');
        }
    );
  }


}
