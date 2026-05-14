import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, switchMap, Observable, of, catchError } from 'rxjs';
import { DepartmentsService } from '../services/departments';
import { Department } from '../interfaces/departments.interface';

@Component({
  selector: 'app-departments-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './departments-component.html',
  styleUrls: ['./departments-component.scss']
})
export class DepartmentsComponent {

  private refrescar$ = new BehaviorSubject<void>(undefined);

  departments$: Observable<Department[]> = this.refrescar$.pipe(
    switchMap(() => this.service.getAll())
  );

  departmentBuscado$: Observable<Department | null> = of(null);

  busqueda = '';
  modo: 'agregar' | 'editar' | 'editarFormulario' | null = null;
  idEditar = '';

  form: any = this.formVacio();

  constructor(
    private service: DepartmentsService,
    private cd: ChangeDetectorRef
  ) {}

  formVacio() {
    return {
      id: '',
      name: '',
      description: '',
      manager: ''
    };
  }

  refrescarLista(): void {
    this.refrescar$.next();
  }

  buscar(): void {
    const id = this.busqueda.trim();

    if (id === '') {
      this.departmentBuscado$ = of(null);
      this.refrescarLista();
      return;
    }

    this.departmentBuscado$ = this.service.getById(id).pipe(
      catchError(() => of(null))
    );
  }

  activarAgregar(): void {
    this.modo = 'agregar';
    this.idEditar = '';
    this.form = this.formVacio();
  }

  activarEditar(): void {
    this.modo = 'editar';
    this.idEditar = '';
    this.form = this.formVacio();
  }

  cargarPorId(idRecibido?: string): void {
    const id = String(idRecibido ?? this.idEditar).trim();

    if (id === '') {
      alert('Ingrese un ID');
      return;
    }

    this.service.getById(id).pipe(
      catchError(() => of(null))
    ).subscribe(dep => {
      if (!dep) {
        alert('Departamento no encontrado');
        return;
      }

      this.form = {
        id: dep.id,
        name: dep.name || '',
        description: dep.description || '',
        manager: dep.manager || ''
      };

      this.modo = 'editarFormulario';

      this.cd.detectChanges();
    });
  }

  guardar(): void {
    const departmentData = {
      name: this.form.name,
      description: this.form.description,
      manager: this.form.manager
    };

    if (this.modo === 'agregar') {
      this.service.addDepartment(departmentData).subscribe(() => {
        this.cancelar();
        this.refrescarLista();
      });
      return;
    }

    if (this.modo === 'editarFormulario') {
      this.service.updateDepartment(this.form.id, departmentData).subscribe(() => {
        this.cancelar();
        this.refrescarLista();
      });
      return;
    }
  }

  cancelar(): void {
    this.modo = null;
    this.idEditar = '';
    this.form = this.formVacio();
  }

  eliminar(id: string): void {

    const confirmar = confirm('¿Seguro que quieres eliminar este departamento?');

    if (!confirmar) return;

    this.service.deleteDepartment(id).subscribe(() => {
      this.refrescarLista();
    });

  }

}