import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Login } from 'src/app/dominio/login';
import { PessoaService } from '../../shared/services/pessoa.service';
import { SimNaoEnum } from './../../shared/enum/sim-nao.enum';
import { AutenticacaoService } from './../../shared/services/autenticacao.service';

@Component({
  selector: 'app-recuperacao',
  templateUrl: './recuperacao.component.html',
  styleUrls: ['./recuperacao.component.scss']
})
export class RecuperacaoComponent implements OnInit {

  login: Login = new Login();
  alteracaoSenha = SimNaoEnum.NAO;
  novasCredencias: Login = new Login();
  formLogin: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private pessoaService: PessoaService,
    private router: Router,
    private fb: FormBuilder,
    private autenticacaoService: AutenticacaoService
  ) { }
  
  ngOnInit() {
    this.verificarParametrosRota();
    this.formLogin = this.fb.group({
      senha: ['', Validators.required],
      novaSenha: ['', Validators.required],
      confirmacaoSenha: ['', Validators.required]
    });
  }

  private verificarParametrosRota() {
    this.route.params.subscribe((params: Params) => {
      const email = params.email;
      if (email) {
        this.alteracaoSenha = SimNaoEnum.SIM;
        console.log(this.alteracaoSenha);
        this.login.email = email;
        this.novasCredencias.email = email;
      }
    });
  }

  recuperarSenha() {
    this.pessoaService.recuperar(this.login.email).subscribe();
  }

  alterarSenha() {
    this.autenticacaoService.login(this.login).subscribe(() => {
      this.pessoaService.alterarSenha(this.novasCredencias).subscribe();
    }, err => {
      //TODO implementar toast
    }
    )
  }

  ehAlteracao(){
    return this.alteracaoSenha === SimNaoEnum.SIM;
    //TODO implementar objectsUtil
  }

}
