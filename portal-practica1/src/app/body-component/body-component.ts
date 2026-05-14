import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type EstadoMateria = 'aprobada' | 'cursando' | 'reprobada' | null;

interface Materia {
  nombre: string;
  creditos: number;
  registrada: boolean;
  visible: boolean;
  estado: EstadoMateria;
}

@Component({
  selector: 'app-body-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './body-component.html',
  styleUrl: './body-component.scss',
})
export class BodyComponent {
  busqueda: string = '';
  creditos: number = 0;

  materias: Materia[] = [
    { nombre: 'Cálculo', creditos: 4, registrada: false, visible: false, estado: null },
    { nombre: 'Física', creditos: 4, registrada: false, visible: false, estado: null },
    { nombre: 'Programación', creditos: 3, registrada: false, visible: false, estado: null },
    { nombre: 'Base de Datos', creditos: 3, registrada: false, visible: false, estado: null },
    { nombre: 'Inglés', creditos: 2, registrada: false, visible: false, estado: null },
  ];

  // 🔍 NORMALIZAR TEXTO (quita acentos)
  private normalizar(texto: string): string {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  // 🔍 BUSCADOR
  get materiasBuscadas(): Materia[] {
    const texto = this.normalizar(this.busqueda.trim());

    if (texto === '') return [];

    if (texto === 'all') return this.materias;

    return this.materias.filter(m =>
      this.normalizar(m.nombre).includes(texto)
    );
  }

  // 📚 REGISTRADAS (visibles)
  get materiasRegistradas(): Materia[] {
    return this.materias.filter(m =>
      m.registrada && m.visible
    );
  }

  // ➕ REGISTRAR
registrarMateria(materia: Materia) {
  materia.registrada = true;
  materia.visible = true;
  materia.estado = 'cursando';
}

  puedeRegistrarse(materia: Materia): boolean {
  return !materia.registrada || materia.estado === 'reprobada';
}

  // 🔄 CAMBIAR ESTADO
  cambiarEstado(materia: Materia) {
    if (materia.estado === 'aprobada' || materia.estado === 'reprobada') {
      setTimeout(() => {
        materia.visible = false;
      }, 5000);
    } else {
      materia.visible = true;
    }
  }

  // 📊 CONTADORES
  get materiasAprobadas(): number {
    return this.materias.filter(m => m.estado === 'aprobada').length;
  }

  get materiasReprobadas(): number {
    return this.materias.filter(m => m.estado === 'reprobada').length;
  }

  // 🔘 BOTONES
  sumar() {
    this.creditos = Math.min(this.creditos + 10, 120);
  }

  restar() {
    this.creditos = Math.max(this.creditos - 10, 0);
  }

  // 📈 PORCENTAJE
  get porcentajeCreditos(): number {
    return Math.round((this.creditos / 120) * 100);
  }
}