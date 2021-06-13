import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from './../../dominio/login';
import { Pessoa } from './../../dominio/pessoa';
import { PessoaService } from './../../shared/services/autenticacao.service';

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
    private service: PessoaService, 
    private router: Router,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.iniciarForms();
  }

  private iniciarForms() {
    this.formLogin = this.fb.group({
      emailCpfCnpj: ['', Validators.required],
      senha: ['', Validators.required]
    });
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      cpfCnpj: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  doLogin(){
    this.service.login(this.login.emailCpfCnpj,this.login.senha).subscribe(data =>{
      console.log('dados',data);     
    });
    this.service.listar().subscribe(data => {
      console.log('dados listar',data);
    });
  }

  ehRegistro(){    
    return this.router.url.includes('registrar-se');
  }

  voltarHome(){
    this.router.navigate(['/dashboard']);
  }

  registrar(){
    if(this.form.valid)
    this.service.cadastrar(this.pessoa).subscribe();
  }

}
