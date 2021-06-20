import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PessoaService } from './../../shared/services/pessoa.service';

@Component({
  template: '',
})
export class ConfirmacaoComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private pessoaService: PessoaService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const token = params.token;
      this.pessoaService.confirmar(token).subscribe(() => this.router.navigateByUrl('dashboard'));
  });
  }

}
