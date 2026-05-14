import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, switchMap, Observable, of, catchError } from 'rxjs';
import { DoctorsService } from '../services/doctors';
import { Doctors } from '../interfaces/doctors.interface';

@Component({
  selector: 'app-doctors-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctors-component.html',
  styleUrls: ['./doctors-component.scss']
})
export class DoctorsComponent {

  private refrescar$ = new BehaviorSubject<void>(undefined);

  doctors$: Observable<Doctors[]> = this.refrescar$.pipe(
    switchMap(() => this.service.getAll())
  );

  doctorsBuscado$: Observable<Doctors | null> = of(null);

  busqueda = '';
  modo: 'agregar' | 'editar' | 'editarFormulario' | null = null;
  idEditar = '';

  form: any = this.formVacio();

  constructor(
    private service: DoctorsService,
    private cd: ChangeDetectorRef
  ) {}

  formVacio() {
    return {
      id: '',
      name: '',
      lastName: '',
      gender: '',
      address: ''
    };
  }

  refrescarLista(): void {
    this.refrescar$.next();
  }

  buscar(): void {
    const id = this.busqueda.trim();

    if (id === '') {
      this.doctorsBuscado$ = of(null);
      this.refrescarLista();
      return;
    }

    this.doctorsBuscado$ = this.service.getById(id).pipe(
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
        alert('Doctor no encontrado');
        return;
      }

      this.form = {
        id: emp.id,
        name: emp.name || '',
        lastName: emp.lastName || '',
        gender: (emp as any).gender || '',
        address: (emp as any).address || ''
      };

      this.modo = 'editarFormulario';

      this.cd.detectChanges();
    });
  }

  guardar(): void {
    const doctorsData = {
      name: this.form.name,
      lastName: this.form.lastName,
      gender: this.form.gender,
      address: this.form.address
    };

    if (this.modo === 'agregar') {
      this.service.addDoctors(doctorsData).subscribe(() => {
        this.cancelar();
        this.refrescarLista();
      });
      return;
    }

    if (this.modo === 'editarFormulario') {
      this.service.updateDoctors(this.form.id, doctorsData).subscribe(() => {
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

    const confirmar = confirm('¿Seguro que quieres eliminar este doctor?');

    if (!confirmar) return;

    this.service.deleteDoctors(id).subscribe(() => {
      this.refrescarLista(); //  actualiza la lista
    });

  }



}