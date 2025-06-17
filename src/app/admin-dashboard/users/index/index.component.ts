import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TableAction } from 'src/app/interfaces/tableAction.interface';
import { TableColumn } from 'src/app/interfaces/tableColumn.interface';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { TableGenericComponent } from 'src/app/shared/components/table-generic/table-generic.component';
import { SearchByTextComponent } from "../../../shared/components/search-by-text/search-by-text.component";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [TableGenericComponent, RouterLink, FormsModule, SearchByTextComponent],
  templateUrl: './index.component.html',
})
export class IndexComponent {
  listTitle: string = 'Usuarios';
  listSubTitle: string = 'Listado';
  users: User[] = [];
  searchText: string = '';

  columns: TableColumn[] = [
    { label: 'Nombre', field: 'name' },
    { label: 'Correo', field: 'email' },
    { label: 'Active', field: 'active', type: 'decorado' },
  ];
  actions: TableAction[] = [
    {
      icon: 'fa-solid fa-pen-to-square',
      tooltip: 'Editar usuario',
      routerLink: (row: any) => ['/admin/user/edit/', row.id]
    },
    {
      icon: 'fa-solid fa-bolt',
      tooltip: 'Desactivar usuario',
      callback: this.changeActive.bind(this)
    }
  ];

  private userService = inject(UserService);

  changeActive(id: string): void {
    if (confirm('¿Estás seguro que quieres cambiar el estado?')) {
      this.userService.delete(id).subscribe({
        next: (resp) => {
          alert(resp.message || 'Usuario actualizado con éxito');
          this.load();
        },
        error: (err) => {
          alert(err.error?.message || 'Ups, ocurrio un problema');
        }
      })
    }

  }

  onSearch() {
    this.load(this.searchText.trim());
  }


  load(filter: string = ''){
    this.userService.listUser(filter)
      .subscribe(data => {
        this.users = data.users;
      });
  }

  ngOnInit(): void {
    this.load();
  }








}
