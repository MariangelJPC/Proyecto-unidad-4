import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"
import { auth, actualizarObtenerTareas, eliminarTarea, obtenerTarea} from "./app/firebase.js";

import './app/crearCuenta.js'
import './app/iniciarSesion.js'
import './app/cerrarSesion.js'
import { verificarSesion } from './app/verificarSesion.js'


import {getFirestore, collection} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { guardarTarea, obtenerTareas} from "./app/firebase.js";

auth.onAuthStateChanged(async function (user) {
    if (user) {
        verificarSesion(user);
        const correo = user.email;
        console.log("sesion iniciada")
        try {
          
          
            //mostrarContenido(); 
            const formTareasMatematicas = $("#form-tareas-matematicas");
            formTareasMatematicas.submit(function (e) {
                e.preventDefault();
                var titulo = formTareasMatematicas.find("#titulo-tarea-matematica").val();
                var descripcion = formTareasMatematicas.find("#descripcion-tarea-matematica").val();
                //console.log(title, description);
                guardarTarea(titulo, descripcion, user.email, "Matematica");
                
                formTareasMatematicas.trigger('reset');

                
            });

            const formTareasFisica = $("#form-tareas-fisica");
            formTareasFisica.submit(function (e) {
                e.preventDefault();
                var titulo = formTareasFisica.find("#titulo-tarea-fisica").val();
                var descripcion = formTareasFisica.find("#descripcion-tarea-fisica").val();
                //console.log(title, description);
                guardarTarea(titulo, descripcion, user.email, "Fisica");
                
                formTareasFisica.trigger('reset');
            });

            const formTareasQuimica = $("#form-tareas-quimica");
            formTareasQuimica.submit(function (e) {
                e.preventDefault();
                var titulo = formTareasQuimica.find("#titulo-tarea-quimica").val();
                var descripcion = formTareasQuimica.find("#descripcion-tarea-quimica").val();
                //console.log(title, description);
                guardarTarea(titulo, descripcion, user.email, "Quimica");
                
                formTareasQuimica.trigger('reset');
            });

        } catch (error) {
            console.log(error)
        }


        const querySnapshot = await obtenerTareas();
        const contenedorTareasMath = $("#contenedor-tareas-mias-math");
        const contenedorTareasFis = $("#contenedor-tareas-mias-fisica");
        const contenedorTareasQuim = $('#contenedor-tareas-mias-quimica');
        const contenedorTareasGeo =$('#contenedor-tareas-mias-geografia');
        const contenedorTareasHist = $('#contenedor-tareas-mias-historia');
        const contenedorTareasLit = $('#contenedor-tareas-mias-literatura');
        const contenedorTareasPsico = $('#contenedor-tareas-mias-psicologia');
        const contenedorTareasArt = $('#contenedor-tareas-mias-arte');


        actualizarObtenerTareas(function (querySnapshot) {
            let htmlMath = '';
            let htmlFis = '';
            let htmlQuim = '';
            let htmlGeo = '';
            let htmlHist = '';
            let htmlLit = '';
            let htmlPsico = '';
            let htmlArt = '';


            querySnapshot.forEach(function (doc) {
                const task = doc.data();
                if (task.materia == "Matematica") {
                    htmlMath += `
          <li class="list-group-item list-group-item-action mt-2">
            <h5>${task.titulo}</h5>
            <p>${task.descripcion}</p>
            <div>
              <button class="btn btn-danger btn-eliminar bi bi-trash3" data-id="${doc.id}">
                Eliminar
              </button>
              <button class="btn btn-secondary btn-editar bi bi-pencil" data-id="">
                Editar
              </button>
            </div>
          </li>
        `;
                    console.log(task);
                }

                if (task.materia == "Fisica") {
                  htmlFis += `
        <li class="list-group-item list-group-item-action mt-2">
          <h5>${task.titulo}</h5>
          <p>${task.descripcion}</p>
          <div>
            <button class="btn btn-danger btn-eliminar bi bi-trash3" data-id="${doc.id}">
              Eliminar
            </button>
            <button class="btn btn-secondary btn-editar bi bi-pencil" data-id="">
              Editar
            </button>
          </div>
        </li>
      `;
                  console.log(task);
              }

              if (task.materia == "Quimica") {
                htmlQuim += `
      <li class="list-group-item list-group-item-action mt-2">
        <h5>${task.titulo}</h5>
        <p>${task.descripcion}</p>
        <div>
          <button class="btn btn-danger btn-eliminar bi bi-trash3" data-id="${doc.id}">
            Eliminar
          </button>
          <button class="btn btn-secondary btn-editar bi bi-pencil" data-id="">
            Editar
          </button>
        </div>
      </li>
    `;
                console.log(task);
            }

            if (task.materia == "Geografia") {
              htmlGeo += `
    <li class="list-group-item list-group-item-action mt-2">
      <h5>${task.titulo}</h5>
      <p>${task.descripcion}</p>
      <div>
        <button class="btn btn-danger btn-eliminar bi bi-trash3" data-id="${doc.id}">
          Eliminar
        </button>
        <button class="btn btn-secondary btn-editar bi bi-pencil" data-id="">
          Editar
        </button>
      </div>
    </li>
  `;
              console.log(task);
          }

          if (task.materia == "Historia") {
            htmlHist += `
  <li class="list-group-item list-group-item-action mt-2">
    <h5>${task.titulo}</h5>
    <p>${task.descripcion}</p>
    <div>
      <button class="btn btn-danger btn-eliminar bi bi-trash3" data-id="${doc.id}">
        Eliminar
      </button>
      <button class="btn btn-secondary btn-editar bi bi-pencil" data-id="">
        Editar
      </button>
    </div>
  </li>
`;
            console.log(task);
        }

        if (task.materia == "Literatura") {
          htmlLit += `
<li class="list-group-item list-group-item-action mt-2">
  <h5>${task.titulo}</h5>
  <p>${task.descripcion}</p>
  <div>
    <button class="btn btn-danger btn-eliminar bi bi-trash3" data-id="${doc.id}">
      Eliminar
    </button>
    <button class="btn btn-secondary btn-editar bi bi-pencil" data-id="">
      Editar
    </button>
  </div>
</li>
`;
          console.log(task);
      }

      if (task.materia == "Psicologia") {
        htmlPsico += `
<li class="list-group-item list-group-item-action mt-2">
<h5>${task.titulo}</h5>
<p>${task.descripcion}</p>
<div>
  <button class="btn btn-danger btn-eliminar bi bi-trash3" data-id="${doc.id}">
    Eliminar
  </button>
  <button class="btn btn-secondary btn-editar bi bi-pencil" data-id="">
    Editar
  </button>
</div>
</li>
`;
        console.log(task);
    }

    if (task.materia == "Arte") {
      htmlArt += `
<li class="list-group-item list-group-item-action mt-2">
<h5>${task.titulo}</h5>
<p>${task.descripcion}</p>
<div>
<button class="btn btn-danger btn-eliminar bi bi-trash3" data-id="${doc.id}">
  Eliminar
</button>
<button class="btn btn-secondary btn-editar bi bi-pencil" data-id="">
  Editar
</button>
</div>
</li>
`;
      console.log(task);
  }
            });
            contenedorTareasMath.html(htmlMath);
            contenedorTareasFis.html(htmlFis);
            contenedorTareasQuim.html(htmlQuim);
            contenedorTareasGeo.html(htmlGeo);
            contenedorTareasHist.html(htmlHist);
            contenedorTareasLit.html(htmlLit);
            contenedorTareasPsico.html(htmlPsico);
            contenedorTareasArt.html(htmlArt);

            

            //ACCION ELIMINAR

      const $btnsEliminar = $('.btn-eliminar');

      $btnsEliminar.each(function () {
        $(this).on('click', function (event) {
          eliminarTarea($(this).data('id'));
        });
      });

      //ACCION EDITAR

      const btnsEditar = $(".btn-editar"); // En la constante btnsEditar se guarda 
      btnsEditar.each(function () { //con cada uno de los botones editar quiero que hagas lo siguiente
        $(this).on('click', async function (event) {
          event.preventDefault
          const doc = await obtenerTarea($(this).data("id"));
          const tarea = doc.data(); //me va a obtener toda la info de la tarea (titulo, descripcion) y lo va a guardar en la constante "tarea"
          const taskForm2 = $("#form-tareas-matematicas"); //Dentro de taskForm2 se guardará el forms de las tareas 
          taskForm2.find('#titulo-tarea-matematica').val(tarea.titulo); //Se coloca el titulo de la tarea en el input del forms
          taskForm2.find('#descripcion-tarea-matematica').val(tarea.descripcion); ////Se coloca la descrip de la tarea en el input del forms
          estadoEditar = true; //se esta editando
          id = doc.id;
          taskForm2.find('#btn-task-form').text('Modificar');
        });
      });










      
    });
  



    } else {
        console.log("sin sesion")

       
        const contenedorTareas = $("#contenedor-tareas");
        contenedorTareas.html('<h3 class="text-dark">Inicia sesión para ver tus publicaciones</h3>');
          


        //mostrarContenidoVacio();
        verificarSesion(user);
    }
});



