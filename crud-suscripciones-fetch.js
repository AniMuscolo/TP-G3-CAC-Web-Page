const BASEURL = 'http://127.0.0.1:5000';

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {
  const options = {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
  };
  try {
    const response = await fetch(url, options);  // Realiza la petición fetch
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();  // Devuelve la respuesta en formato JSON
  } catch (error) {
    console.error('Fetch error:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
}

/**
 * Función para comunicarse con el servidor para poder Crear o Actualizar
 * un registro de suscripciones
 * @returns 
 */
async function saveSuscripcion(){
  const idSuscripcion = document.querySelector('#id-suscripcion').value;
  const nombre= document.querySelector('#nombre').value;
  const edad = document.querySelector('#edad').value;
  const mail = document.querySelector('#mail').value;
  const telefono = document.querySelector('#telefono').value;

  //VALIDACION DE FORMULARIO
  if (!nombre || !edad || !mail || !telefono) {
    Swal.fire({
        title: 'Error!',
        text: 'Por favor completa todos los campos.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
    });
    return;
  }
  // Crea un objeto con los datos de la suscripcion
  const suscripcionData = {
      nombre: nombre,
      edad: edad,
      mail: mail,
      telefono: telefono,
  };

    
  let result = null;
  // Si hay un idSuscripcion, realiza una petición PUT para actualizar la suscripcion existente
  if(idSuscripcion!==""){
    result = await fetchData(`${BASEURL}/api/suscripciones/${idSuscripcion}`, 'PUT', suscripcionData);
  }else{
    // Si no hay idSuscripcion, realiza una petición POST para crear una nueva suscripcion
    result = await fetchData(`${BASEURL}/api/suscripciones/`, 'POST', suscripcionData);
  }
  
  const formSuscripcion = document.querySelector('#form-suscripcion');
  formSuscripcion.reset();
  Swal.fire({
    title: 'Exito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  })
  showSuscripciones();
}


/**
 * Funcion que permite crear un elemento <tr> para la tabla de peliculas
 * por medio del uso de template string de JS.
 */
async function showSuscripciones(){
  let suscripciones =  await fetchData(BASEURL+'/api/suscripciones/', 'GET');
  const tableSuscripciones = document.querySelector('#list-table-suscripciones tbody');
  tableSuscripciones.innerHTML='';
  suscripciones.forEach((suscripcion,index) => {
    let tr = `<tr>
                  <td>${suscripcion.nombre}</td>
                  <td>${suscripcion.edad}</td>
                  <td>${suscripcion.mail}</td>
                  <td>${suscripcion.telefono}</td>
                  <td>
                      <button class="btn-susc" onclick='updateSuscripcion(${suscripcion.id_suscripcion})'><i class="fa fa-pencil"></button></i>
                      <button class="btn-susc" onclick='deleteSuscripcion(${suscripcion.id_suscripcion})'><i class="fa fa-trash"></button></i>
                  </td>
                </tr>`;
    tableSuscripciones.insertAdjacentHTML("beforeend",tr);
  });
}
  
/**
 * Function que permite eliminar una suscripcion del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} id posición del array que se va a eliminar
 */
function deleteSuscripcion(id){
  Swal.fire({
      title: "Esta seguro de eliminar la suscripción?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
  }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await fetchData(`${BASEURL}/api/suscripciones/${id}`, 'DELETE');
        showSuscripciones();
        Swal.fire(response.message, "", "success");
      }
  });
  
}


/**
 * Function que permite cargar el formulario con los datos de la suscripcion
 * para su edición
 * @param {number} id Id de la suscripcion que se quiere editar
 */
async function updateSuscripcion(id){
  //Buscamos en el servidor la suscripcion de acuerdo al id
  let response = await fetchData(`${BASEURL}/api/suscripciones/${id}`, 'GET');
  const idSuscripcion = document.querySelector('#id-suscripcion');
  const nombre = document.querySelector('#nombre');
  const edad = document.querySelector('#edad');
  const mail = document.querySelector('#mail');
  const telefono = document.querySelector('#telefono');
  
  idSuscripcion.value = response.id_suscripcion;
  nombre.value = response.nombre;
  edad.value = response.edad;
  mail.value = response.mail;
  telefono.value = response.telefono;
}
  
// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded',function(){
  const btnSaveSuscripcion = document.querySelector('#btn-save-suscripcion');
  //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
  btnSaveSuscripcion.addEventListener('click',saveSuscripcion);
  showSuscripciones();
});