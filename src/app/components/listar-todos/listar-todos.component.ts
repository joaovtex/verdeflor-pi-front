import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../entities/funcionario';
import { FuncionarioService } from '../../services/funcionario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-todos',
  templateUrl: './listar-todos.component.html',
  styleUrl: './listar-todos.component.scss'
})

export class ListarTodosComponent implements OnInit {
  list: Funcionario[] = []
  ordenacao: string = 'nome'; 

  constructor(private service: FuncionarioService, private router: Router) { }

  ngOnInit(): void {
    this.findAll()
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.list = resposta;
      this.ordenarLista(); 
    });
  }

  delete(id: any): void {
    this.service.delete(id).subscribe((resposta) => {
      if (resposta === null) {
        this.service.message(`Registro ${id} excluído com sucesso!`)
        this.list = this.list.filter(funcionario => funcionario.id != id)
      } else {
        this.service.message('Não foi possível excluir o registro.')
      }
    })
  }

  ordenarLista(): void {
    switch (this.ordenacao) {
      case 'nome':
        this.list.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case 'salarioAsc':
        this.list.sort((a, b) => a.salario - b.salario);
        break;
      case 'salarioDesc':
        this.list.sort((a, b) => b.salario - a.salario);
        break;
      case 'dtAdmissaoAsc':
        this.list.sort((a, b) => new Date(a.dtAdmissao).getTime() - new Date(b.dtAdmissao).getTime());
        break;
      case 'dtAdmissaoDesc':
        this.list.sort((a, b) => new Date(b.dtAdmissao).getTime() - new Date(a.dtAdmissao).getTime());
        break;
    }
  }

  cadastrar() {
    this.router.navigate(['cadastro'])
  }

  editar(id: any) {
    this.router.navigate([`atualizar/${id}`])
  }
}