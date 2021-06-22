import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Login } from 'src/app/dominio/login';
import { PessoaService } from '../../shared/services/pessoa.service';
import { SimNaoEnum } from './../../shared/enum/sim-nao.enum';

@Component({
  selector: 'app-recuperacao',
  templateUrl: './recuperacao.component.html',
  styleUrls: ['./recuperacao.component.scss']
})
export class RecuperacaoComponent implements OnInit {

  login: Login = new Login();
  alteracaoSenha: SimNaoEnum;

  constructor(
    private route: ActivatedRoute,
    private pessoaService: PessoaService,
    private router: Router
  ) { }
  
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if(params){
        this.alteracaoSenha = SimNaoEnum.SIM;
      }
    });
  }

  recuperarSenha() {
    this.pessoaService.recuperar(this.login.email).subscribe();
  }

}
