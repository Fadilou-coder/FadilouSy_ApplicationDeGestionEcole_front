import  jwt_decode  from 'jwt-decode';
import { TokenService } from './../../token/service/token.service';
import { Profil } from './../../profils/Model/profil';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../Model/user';
import { UserService } from '../service/user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  formadd!: FormGroup;
  email;
  password;
  prenom;
  nom;
  profils;
  image;
  confirm;
  profil;
  user: any = new User(0, '', '', '', '', new Profil(0, ''), '');
  id: any;
  imageSelect;




  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userservice: UserService,
    private url: ActivatedRoute,
    private sanitizer:DomSanitizer,
    private tokenService: TokenService
  ) { }

  token = this.tokenService.getLocalStorageToken();
  decoded: any;
  connected: boolean = true;

  ngOnInit(): void {
    this.id = this.url.snapshot.params['id'];
    if (this.token){
      this.decoded = jwt_decode(this.token.token);
    }

    if (this.decoded.id == this.id) {
      this.connected = false;
    }

      this.userservice.getOneUser(this.id).subscribe(
        (response: any) => {
          this.user = response['hydra:member'][0];
          if (this.user) {
            this.email = this.user.email;
            this.password = this.user.password;
            this.prenom = this.user.prenom;
            this.nom = this.user.nom;
            this.image = this.user.image;
            this.profil = this.user.profil.libelle;
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
      this.userservice.findAllProfil(1).subscribe(
        (data: any) => {
          this.profils = data['hydra:member'];
        }
      );
      this.formadd = this.formBuilder?.group({
        email: ['', [ Validators.required, Validators.email]],
        password: ['', [ Validators.required, Validators.minLength(6)]],
        prenom: ['', [ Validators.required]],
        nom: ['', [Validators.required]],
        profil: ['', [ Validators.required]],
        confirm: ['', [ Validators.required, ]],
        image: ['', []]
      });

  }

  // tslint:disable-next-line: typedef
  get f(){
    return this.formadd?.controls;
  }

  onFilSelected(event: any) {
    if (event) {
      this.imageSelect = event.target.files[0];
    }
  }

  updateUser(){
    var formData = new FormData();
    formData.append('prenom', this.formadd.value.prenom);
    formData.append('nom', this.formadd.value.nom);
    formData.append('email', this.formadd.value.email);
    formData.append('password', this.formadd.value.password);
    if (this.imageSelect) {
      formData.append('image', this.imageSelect);
    }
    formData.append('profil', this.formadd.value.profil);
    this.userservice.putUser(this.id, formData).subscribe(
      (response: any) => {
        console.log(response);
        this.router?.navigate(['/acceuil/users']);
      },
      (error: any) => {
        console.log(error);
      }
    );

  }


}
