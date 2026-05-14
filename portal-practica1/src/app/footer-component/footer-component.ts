import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer-component',
  imports: [CommonModule],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.scss',
})
export class FooterComponent implements AfterViewInit {

  fecha = new Date();
  cboton = "Copyright";
  crmensaje: string | null = "© Cristopher Vera";

  ngAfterViewInit() {
  const contenedorBotones = document.getElementById('contenedor-botones');
  const toast = document.getElementById('1');
  const btnCerrar = document.querySelector('.btn-cerrar');

  if (contenedorBotones && toast) {
    contenedorBotones.addEventListener('click', (e: any) => {

      const boton = e.target.closest('[data-tipo]');
      if (!boton) return;

      const tipo = boton.dataset.tipo;

      //  VALIDACIÓN AQUÍ
      if (tipo === "cboton" && this.crmensaje) {

        console.log(" MOSTRAR TOAST");

        toast.classList.remove('cerrando');
        toast.classList.add('activo');

        setTimeout(() => {
          toast.classList.add('cerrando');

          setTimeout(() => {
            toast.classList.remove('activo');
            toast.classList.remove('cerrando');
          }, 500);
        }, 5000);

      } else {
        console.log(" NO HAY MENSAJE");
      }
    });
  }

  if (btnCerrar && toast) {
    btnCerrar.addEventListener('click', () => {
      toast.classList.add('cerrando');

      setTimeout(() => {
        toast.classList.remove('activo');
        toast.classList.remove('cerrando');
      }, 500);
    });
  }
}
}