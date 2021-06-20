import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../shared/services/token-storage.service';
import { Login } from './../../dominio/login';
import { Pessoa } from './../../dominio/pessoa';
import { AutenticacaoService } from './../../shared/services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  pessoa: Pessoa = new Pessoa();
  login: Login = new Login();
  confirmacaoSenha: string;
  form: FormGroup;
  formLogin: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private tokenStorage: TokenStorageService,
    private AutenticacaoService: AutenticacaoService
  ) { }

  ngOnInit(): void {
    this.iniciarForms();
  }

  onSubmit() {
    this.AutenticacaoService.login(this.login).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);      
                 
        this.listar();
      },
      err => {
        console.log('erro',err);    
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }


  private iniciarForms() {
    this.formLogin = this.fb.group({
      emailDocumento: ['', Validators.required],
      senha: ['', Validators.required]
    });
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      documento: ['', Validators.required],
      numTelefone: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  doLogin() {
    this.onSubmit();
  }

  ehRegistro() {
    return this.router.url.includes('registrar-se');
  }

  voltarHome() {
    this.router.navigate(['/dashboard']);
  }

  registrar() {
    if (this.form.valid)
      this.AutenticacaoService.register(this.pessoa).subscribe();
  }

  listar(){
    this.AutenticacaoService.testeAutenticacao().subscribe();
  }

}
