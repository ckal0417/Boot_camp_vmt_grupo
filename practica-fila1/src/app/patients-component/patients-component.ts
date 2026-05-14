import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, switchMap, Observable, of, catchError } from 'rxjs';
import { PatientsService } from '../services/patients';
import { Patients } from '../interfaces/patients.interface';

@Component({
  selector: 'app-patients-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patients-component.html',
  styleUrl: './patients-component.scss',
})
export class PatientsComponent {

  private refrescar$ = new BehaviorSubject<void>(undefined);

  patients$: Observable<Patients[]> = this.refrescar$.pipe(
    switchMap(() => this.service.getAll())
  );

  patientsBuscado$: Observable<Patients | null> = of(null);

  busqueda = '';
  modo: 'agregar' | 'editar' | 'editarFormulario' | null = null;
  idEditar = '';

  form: any = this.formVacio();

  constructor(
    private service: PatientsService,
    private cd: ChangeDetectorRef
  ) {}

  formVacio() {
    return {
      id: '',
      name: '',
      avatar: '',
      phone: '',
      age: '',
      registro: '',
      codigo: ''
    };
  }

  generarCodigo(name: string, registro: string): string {
    const partes = name.trim().split(' ');
    const inicialNombre = partes[0]?.charAt(0).toLowerCase() || '';
    const inicialApellido = partes[1]?.charAt(0).toLowerCase() || '';

    return `${inicialNombre}${inicialApellido}-${registro}`;
  }

  refrescarLista(): void {
    this.refrescar$.next();
  }

  buscar(): void {
    const id = this.busqueda.trim();

    if (id === '') {
      this.patientsBuscado$ = of(null);
      this.refrescarLista();
      return;
    }

    this.patientsBuscado$ = this.service.getById(id).pipe(
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
        alert('Paciente no encontrado');
        return;
      }

      this.form = {
        id: emp.id,
        name: emp.name || '',
        avatar: emp.avatar || '',
        phone: (emp as any).phone || '',
        age: (emp as any).age || '',
        registro: (emp as any).registro || '',
        codigo: (emp as any).codigo || ''
      };

      this.modo = 'editarFormulario';

      this.cd.detectChanges();
    });
  }

guardar(): void {
  if (this.modo === 'agregar') {

    this.service.getAll().subscribe(patients => {
      const siguienteNumero = patients.length + 1;
      const registroGenerado = `paciente${siguienteNumero}`;

      const patientsData: any = {
        name: this.form.name,
        avatar: this.form.avatar,
        phone: this.form.phone,
        age: this.form.age,
        registro: registroGenerado,
        codigo: this.generarCodigo(this.form.name, registroGenerado)
      };

      this.service.addPatients(patientsData).subscribe(() => {
        this.cancelar();
        this.refrescarLista();
      });
    });

    return;
  }

  if (this.modo === 'editarFormulario') {
    const patientsData: any = {
      name: this.form.name,
      avatar: this.form.avatar,
      phone: this.form.phone,
      age: this.form.age,
      registro: this.form.registro,
      codigo: this.form.codigo.includes('-editado')
        ? this.form.codigo
        : `${this.form.codigo}-editado`
    };

    this.service.updatePatients(this.form.id, patientsData).subscribe(() => {
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

    const confirmar = confirm('¿Seguro que quieres eliminar este paciente?');

    if (!confirmar) return;

    this.service.deletePatients(id).subscribe(() => {
      this.refrescarLista(); //  actualiza la lista
    });

  }
}