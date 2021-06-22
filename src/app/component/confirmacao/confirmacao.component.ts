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
    this.confirmarEmail();
  }


  private confirmarEmail() {
    this.route.params.subscribe((params: Params) => {
      const email = params.email;
      this.pessoaService.confirmar(email).subscribe(() => this.router.navigateByUrl('dashboard'));
    });
  }

}
