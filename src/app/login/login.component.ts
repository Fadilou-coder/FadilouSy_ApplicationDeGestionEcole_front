import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenClass } from '../token/Model/token-class';
import { TokenService } from '../token/service/token.service';
import { ConnexionService } from './service/connexion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 email = '';
  password = '';
  submitted = false;
  formLogin!: FormGroup;
  hide = true;
  message = '';
  public token: TokenClass | undefined;
  // tslint:disable-next-line: max-line-length
  constructor(
    private connexion: ConnexionService,
    public tokenService: TokenService,
    private formBuilder: FormBuilder,
    private router: Router,
    ) { }
  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email]],
      password: ['', [ Validators.required]]
    });
  }

  // tslint:disable-next-line: typedef
  get f(){
    return this.formLogin?.controls;
  }

  DoLogin(): void{
    this.submitted = true;
    if (this.formLogin?.invalid) {
      return;
    }
    // traitement
    this.connexion.authenticate(this.email, this.password).subscribe((data: any) => {
      this.token = (data as TokenClass);
      this.tokenService.setLocalStorageToken(this.token);
      const token = this.tokenService.getLocalStorageToken();
      console.log(token)
      this.router.navigate(['/acceuil']);
   }, (err: any) => {
    console.log(err.error.message);
    if (err.error.message) {
      this.message = "Login or password incorrect";
    }
   });


  }
}
