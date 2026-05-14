import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, switchMap, Observable, of, catchError } from 'rxjs';
import { EmployeesService } from '../services/employees';
import { Employee } from '../interfaces/employee.interface';

@Component({
  selector: 'app-employees-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employees-component.html',
  styleUrls: ['./employees-component.scss']
})
export class EmployeesComponent {

  private refrescar$ = new BehaviorSubject<void>(undefined);

  employees$: Observable<Employee[]> = this.refrescar$.pipe(
    switchMap(() => this.service.getAll())
  );

  employeeBuscado$: Observable<Employee | null> = of(null);

  busqueda = '';
  modo: 'agregar' | 'editar' | 'editarFormulario' | null = null;
  idEditar = '';

  form: any = this.formVacio();

  constructor(
    private service: EmployeesService,
    private cd: ChangeDetectorRef
  ) {}

  formVacio() {
    return {
      id: '',
      name: '',
      avatar: '',
      department: '',
      email: '',
      phone: '',
      position: '',
      salary: ''
    };
  }

  refrescarLista(): void {
    this.refrescar$.next();
  }

  buscar(): void {
    const id = this.busqueda.trim();

    if (id === '') {
      this.employeeBuscado$ = of(null);
      this.refrescarLista();
      return;
    }

    this.employeeBuscado$ = this.service.getById(id).pipe(
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
    ).subscribe(emp => {
      if (!emp) {
        alert('Empleado no encontrado');
        return;
      }

      this.form = {
        id: emp.id,
        name: emp.name || '',
        avatar: emp.avatar || '',
        department: (emp as any).department || '',
        email: (emp as any).email || '',
        phone: (emp as any).phone || '',
        position: (emp as any).position || '',
        salary: (emp as any).salary || ''
      };

      this.modo = 'editarFormulario';

      this.cd.detectChanges();
    });
  }

  guardar(): void {
    const employeeData = {
      name: this.form.name,
      avatar: this.form.avatar,
      department: this.form.department,
      email: this.form.email,
      phone: this.form.phone,
      position: this.form.position,
      salary: this.form.salary
    };

    if (this.modo === 'agregar') {
      this.service.addEmployee(employeeData).subscribe(() => {
        this.cancelar();
        this.refrescarLista();
      });
      return;
    }

    if (this.modo === 'editarFormulario') {
      this.service.updateEmployee(this.form.id, employeeData).subscribe(() => {
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

    const confirmar = confirm('¿Seguro que quieres eliminar este empleado?');

    if (!confirmar) return;

    this.service.deleteEmployee(id).subscribe(() => {
      this.refrescarLista(); //  actualiza la lista
    });

  }



}