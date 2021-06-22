import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../shared/services/token-storage.service';
import { ToastService } from '../toast/toast.service';
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
  form: FormGroup;
  formLogin: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private tokenStorage: TokenStorageService,
    private autenticacaoService: AutenticacaoService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.iniciarForms();
  }

  onSubmit() {
    this.autenticacaoService.login(this.login).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.voltarHome();
      },
      err => {        
        this.toastService.show(err.error.message, { classname: 'bg-danger text-light', delay: 0 });
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
      email: ['', [Validators.email, Validators.required]],
      senha: ['', Validators.required],
      confirmacao: ['', Validators.required]
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
    if (this.form.valid && this.confirmacaoSenha()) {
      this.autenticacaoService.register(this.pessoa).subscribe(null, err => {
        this.toastService.show(err.error.errors, { classname: 'bg-danger text-light', delay: 0 });        
      });
    }
  }

  confirmacaoSenha(): Boolean {
    const confirmacao = this.form.get('confirmacao');
    if (confirmacao?.dirty || confirmacao?.touched){
      return Object.is(confirmacao.value, this.pessoa.senha);
    }    
    return true;
  }

  recuperarSenha() {
    this.router.navigate(['/recuperar']);
  }

}
